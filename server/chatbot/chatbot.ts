import 'dotenv/config' // loads the values from the .env into process.env
import { ChatGoogleGenerativeAI } from '@langchain/google-genai' // langchain wrapper for gemini (handles prompts, streaming an call backs)
import { Langfuse } from 'langfuse' // importing the LangFuse function
import { createClient } from '@supabase/supabase-js' // JavaScript client for supabase
import { pipeline } from '@xenova/transformers' // runs ML models locally in JS

/* -----------------------------
   Types
-------------------------------- */
interface Message {
  // defines the shape of the incoming chat message
  role: 'user' | 'assistant'
  content: string
}

/* -----------------------------
   Langfuse
-------------------------------- */
const langfuse = new Langfuse({
  // setup langfuse tracking (the .env vars connect our app to langfuse)
  publicKey: process.env.LANGFUSE_PUBLIC_KEY!,
  secretKey: process.env.LANGFUSE_SECRET_KEY!,
  baseUrl: process.env.LANGFUSE_BASE_URL,
})

/* -----------------------------
   Supabase
-------------------------------- */
const supabase = createClient(
  // supabase setup (using the service role key) | gives us full database access, should only run on the server side and is never exposed to the frontend
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)
// our supabase is used for storing our CV chunks and then running the vector search

/* -----------------------------
   Gemini model
-------------------------------- */
const model = new ChatGoogleGenerativeAI({
  // idetifying the specs for the LLM
  model: 'models/gemini-flash-latest',
  temperature: 0.7,
  streaming: true, // tokens arrive live
})

// const streamingModel = new ChatGoogleGenerativeAI({
//   model: 'models/gemini-flash-latest',
//   temperature: 0.7,
//   streaming: true,
// })

/* -----------------------------
   Embedding model (local)
-------------------------------- */
const embedPipeline = await pipeline(
  // this is a local embedding (converts the text into nummbers) and lets us compare semantic similarity
  'feature-extraction',
  'Xenova/all-MiniLM-L6-v2',
  { quantized: true }, // smaller and less accurate but less worth it
)

/* -----------------------------
   Helpers
-------------------------------- */
async function embedQuery(text: string): Promise<number[]> {
  // helper function for the embeddings | takes text as a parameter converts to a vector and then returns that as a number array
  const output = await embedPipeline(text, {
    pooling: 'mean',
    normalize: true,
  })

  return Array.from(output.data)
}

async function retrieveContext(query: string) {
  // helper retrieve function the R part of RAG-
  const embedding = await embedQuery(query) // embed the query

  const { data, error } = await supabase.rpc('match_documents', {
    // supabase Postgres function that compares all the vectors and returns the 5 most similar chunks
    query_embedding: embedding,
    match_count: 5,
  })

  if (error) {
    console.error('❌ Supabase vector search failed:', error)
    throw error
  }

  return data as {
    content: string
    metadata: Record<string, unknown>
    similarity: number
  }[]
}

/* -----------------------------
   Chatbot (RAG)
-------------------------------- */
export async function chatBot(
  messages: Message[], // full chat history
  onStream: (chunk: string) => void, // callback for live tokens
) {
  try {
    const userMessage = messages[messages.length - 1]?.content ?? '' // gettting the users last message

    const trace = langfuse.trace({
      // start the lang fuse trace on the messages
      name: 'chatBot',
      input: { messages },
    })

    /* -------- Retrieve CV context -------- */
    const contextChunks = await retrieveContext(userMessage) // call the retrieve function to get the 5 most similar chunks

    const contextText =
      contextChunks.length > 0
        ? contextChunks
            .map(
              (c, i) =>
                `Source ${i + 1} (similarity ${c.similarity.toFixed(2)}):\n${c.content}`, // formatted into readable text (LLMS do not read vectors)
            )
            .join('\n\n')
        : 'No relevant CV content found.'

    /* -------- System prompt -------- */
    const fullMessages = [
      // systeem prompt defines identity, the rules and injects the CV context
      {
        role: 'system',
        content: `
You are Frank, Don Foley's personal AI assistant. Use only normal language and basic punctuation (no slashes or asterixes of any kind)

RULES:
- You have all the information you need to answer questions about Don in a professional context below in the CV.
- If you don't know the answer to a question: say you don't have the answer for that sorry.
- Be factual and professional but if someone asks a question about Don use the information you have available to hype Don up and provide some grounded but real hype up information about him when someone asks about his experience e.t.c
- Make your response gramtically correct and include the relevant information to the question make the answer flow

CV CONTEXT:
${contextText} 
`,
      },
      ...messages,
    ]

    /* -------- Stream Gemini response -------- */
    let fullResponse = ''

    await model.invoke(fullMessages, {
      callbacks: [
        // streaming adds the tokens one by one as they come back from the llm to full response
        {
          handleLLMNewToken(token: string) {
            fullResponse += token
            onStream(token)
          },
        },
      ],
    })

    trace.update({
      output: fullResponse,
    }) // save the output to langfuse
  } catch (err) {
    console.error('❌ Error processing chatbot request:', err)
  }
}
