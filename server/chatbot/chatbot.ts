// import 'dotenv/config'
// import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
// import { Langfuse } from 'langfuse'
// import { createClient } from '@supabase/supabase-js'
// import { pipeline } from '@xenova/transformers'

// /* -----------------------------
//    Types
// -------------------------------- */
// interface Message {
//   role: 'user' | 'assistant'
//   content: string
// }

// /* -----------------------------
//    Langfuse
// -------------------------------- */
// const langfuse = new Langfuse({
//   publicKey: process.env.LANGFUSE_PUBLIC_KEY!,
//   secretKey: process.env.LANGFUSE_SECRET_KEY!,
//   baseUrl: process.env.LANGFUSE_BASE_URL,
// })

// /* -----------------------------
//    Supabase
// -------------------------------- */
// const supabase = createClient(
//   process.env.SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!,
// )

// /* -----------------------------
//    Gemini model
// -------------------------------- */
// const model = new ChatGoogleGenerativeAI({
//   model: 'models/gemini-flash-latest',
//   temperature: 0.7,
//   streaming: true,
// })

// const streamingModel = new ChatGoogleGenerativeAI({
//   model: 'models/gemini-flash-latest',
//   temperature: 0.7,
//   streaming: true,
// })

// /* -----------------------------
//    Embedding model (local)
// -------------------------------- */
// const embedPipeline = await pipeline(
//   'feature-extraction',
//   'Xenova/all-MiniLM-L6-v2',
//   { quantized: true },
// )

// /* -----------------------------
//    Helpers
// -------------------------------- */
// async function embedQuery(text: string): Promise<number[]> {
//   const output = await embedPipeline(text, {
//     pooling: 'mean',
//     normalize: true,
//   })

//   return Array.from(output.data)
// }

// async function retrieveContext(query: string) {
//   const embedding = await embedQuery(query)

//   const { data, error } = await supabase.rpc('match_documents', {
//     query_embedding: embedding,
//     match_count: 5,
//   })

//   if (error) {
//     console.error('❌ Supabase vector search failed:', error)
//     throw error
//   }

//   return data as {
//     content: string
//     metadata: Record<string, unknown>
//     similarity: number
//   }[]
// }

// /* -----------------------------
//    Chatbot (RAG)
// -------------------------------- */
// export async function chatBot(
//   messages: Message[],
//   onStream: (chunk: string) => void,
// ) {
//   try {
//     const userMessage = messages[messages.length - 1]?.content ?? ''

//     const trace = langfuse.trace({
//       name: 'chatBot',
//       input: { messages },
//     })

//     /* -------- Retrieve CV context -------- */
//     const contextChunks = await retrieveContext(userMessage)

//     const contextText =
//       contextChunks.length > 0
//         ? contextChunks
//             .map(
//               (c, i) =>
//                 `Source ${i + 1} (similarity ${c.similarity.toFixed(2)}):\n${c.content}`,
//             )
//             .join('\n\n')
//         : 'No relevant CV content found.'

//     /* -------- System prompt -------- */
//     const fullMessages = [
//       {
//         role: 'system',
//         content: `
// You are Frank, Don Foley's personal AI assistant. Use only normal language and basic punctuation (no slashes or asterixes of any kind)

// RULES:
// - You have all the information you need to answer questions about Don in a professional context below in the CV.
// - If you don't know the answer to a question: say you don't have the answer for that sorry.
// - Be factual and professional but if someone asks a question about Don use the information you have available to hype Don up and provide some grounded but real hype up information about him when someone asks about his experience e.t.c
// - Make your response gramtically correct and include the relevant information to the question make the answer flow

// CV CONTEXT:
// ${contextText}
// `,
//       },
//       ...messages,
//     ]

//     /* -------- Stream Gemini response -------- */
//     let fullResponse = ''

//     await model.invoke(fullMessages, {
//       callbacks: [
//         {
//           handleLLMNewToken(token: string) {
//             fullResponse += token
//             onStream(token)
//           },
//         },
//       ],
//     })

//     trace.update({
//       output: fullResponse,
//     })
//   } catch (err) {
//     console.error('❌ Error processing chatbot request:', err)
//   }
// }

import 'dotenv/config'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { Langfuse } from 'langfuse'
import { createClient } from '@supabase/supabase-js'
import { pipeline } from '@xenova/transformers'

/* -----------------------------
   Types
-------------------------------- */
interface Message {
  role: 'user' | 'assistant'
  content: string
}

/* -----------------------------
   Langfuse
-------------------------------- */
const langfuse = new Langfuse({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY!,
  secretKey: process.env.LANGFUSE_SECRET_KEY!,
  baseUrl: process.env.LANGFUSE_BASE_URL,
})

/* -----------------------------
   Supabase
-------------------------------- */
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

/* -----------------------------
   LLMs
-------------------------------- */

// Pass 1 — reasoning / drafting (NO streaming)
const reasoningModel = new ChatGoogleGenerativeAI({
  model: 'models/gemini-flash-latest',
  temperature: 0.2,
  streaming: false,
})

// Pass 2 — user-facing / streaming
const streamingModel = new ChatGoogleGenerativeAI({
  model: 'models/gemini-flash-latest',
  temperature: 0.7,
  streaming: true,
})

/* -----------------------------
   Embedding model (local)
-------------------------------- */
const embedPipeline = await pipeline(
  'feature-extraction',
  'Xenova/all-MiniLM-L6-v2',
  { quantized: true },
)

/* -----------------------------
   Helpers
-------------------------------- */
async function embedQuery(text: string): Promise<number[]> {
  const output = await embedPipeline(text, {
    pooling: 'mean',
    normalize: true,
  })

  return Array.from(output.data)
}

async function retrieveContext(query: string) {
  const embedding = await embedQuery(query)

  const { data, error } = await supabase.rpc('match_documents', {
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
   LLM Pass 1 — Reasoning
-------------------------------- */
async function runReasoningPass(
  userMessage: string,
  contextText: string,
): Promise<string> {
  const result = await reasoningModel.invoke([
    {
      role: 'system',
      content: `
You are a chabot

Rules:
- Use the CV context provided
- Answer the user's question factually and accurately
- Do NOT invent or infer information
- If the answer is not present, say clearly that it is not available in the CV
- Summarize the asnwer a little dont just straight up regurgitate infromation fine the balance

Return a clean, well-written draft answer.
`,
    },
    {
      role: 'user',
      content: `
QUESTION:
${userMessage}

CV CONTEXT:
${contextText}
`,
    },
  ])

  return result.content as string
}

/* -----------------------------
   LLM Pass 2 — Streaming polish
-------------------------------- */
async function runStreamingPass(
  draftAnswer: string,
  onStream: (chunk: string) => void,
): Promise<string> {
  let fullResponse = ''

  await streamingModel.invoke(
    [
      {
        role: 'system',
        content: `
You are Frank Don's personal AI assistant
`,
      },
      {
        role: 'user',
        content: `
DRAFT ANSWER:
${draftAnswer}

Check this entire response for grammatical errors and correct them. Remove all slashes and asterixes of any kind and make the response pop.
`,
      },
    ],
    {
      callbacks: [
        {
          handleLLMNewToken(token: string) {
            fullResponse += token
            onStream(token)
          },
        },
      ],
    },
  )

  return fullResponse
}

/* -----------------------------
   Chatbot (Two-Pass RAG)
-------------------------------- */
export async function chatBot(
  messages: Message[],
  onStream: (chunk: string) => void,
) {
  try {
    const userMessage = messages[messages.length - 1]?.content ?? ''

    const trace = langfuse.trace({
      name: 'chatBot',
      input: { messages },
    })

    /* -------- Retrieve CV context -------- */
    const contextChunks = await retrieveContext(userMessage)

    const contextText =
      contextChunks.length > 0
        ? contextChunks
            .map((c, i) => `Source ${i + 1}:\n${c.content}`)
            .join('\n\n')
        : 'No relevant CV content found.'

    /* -------- Pass 1: Reasoning -------- */
    const draftAnswer = await runReasoningPass(userMessage, contextText)

    /* -------- Pass 2: Streaming -------- */
    const finalAnswer = await runStreamingPass(draftAnswer, onStream)

    trace.update({
      output: finalAnswer,
    })
  } catch (err) {
    console.error('❌ Error processing chatbot request:', err)
  }
}
