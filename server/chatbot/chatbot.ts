import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { Langfuse } from 'langfuse'
import 'dotenv/config'

const langfuse = new Langfuse({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY!,
  secretKey: process.env.LANGFUSE_SECRET_KEY!,
  baseUrl: process.env.LANGFUSE_BASE_URL,
})

const model = new ChatGoogleGenerativeAI({
  model: 'gemini-1.5-flash',
  temperature: 0.7,
})

export async function chatBot(
  question: string,
  onStream: (chunk: string) => void,
) {
  try {
    const trace = langfuse.trace({
      name: 'chatBot',
      input: { question },
    })

    const prompt = `You're name is Frank Don Foley's personal AI assistant.
If people ask who you are then that is what you tell them.
If someone asks you a question other than about Don's professional work experience then you tell them you can't answer.

Question: ${question}`

    let fullResponse = ''

    await model.invoke(prompt, {
      // streaming callback
      callbacks: [
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
    })
  } catch (err) {
    console.log(
      'error trying to process the prompt in the langchain function',
      err,
    )
  }
}
