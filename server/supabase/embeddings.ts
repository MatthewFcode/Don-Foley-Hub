// lib/embeddings.ts
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai'

export const embeddings = new GoogleGenerativeAIEmbeddings({
  model: 'models/embedding-001',
})
