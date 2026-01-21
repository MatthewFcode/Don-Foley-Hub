// import 'dotenv/config'
// import fs from 'fs'
// import path from 'path'
// import { createClient } from '@supabase/supabase-js'
// import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai'

// /* -----------------------------
//    Load environment variables
// -------------------------------- */
// const requiredEnvs = [
//   'SUPABASE_URL',
//   'SUPABASE_SERVICE_ROLE_KEY',
//   'GOOGLE_API_KEY',
// ]

// for (const env of requiredEnvs) {
//   if (!process.env[env]) {
//     console.error(`❌ Missing environment variable: ${env}`)
//     process.exit(1)
//   }
// }

// /* -----------------------------
//    Supabase client
// -------------------------------- */
// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_ROLE_KEY, // SERVER ONLY
// )

// /* -----------------------------
//    Embeddings (Gemini)
// -------------------------------- */
// const embeddings = new GoogleGenerativeAIEmbeddings({
//   model: 'textembedding-gecko-001', // working Gemini embedding model
//   apiKey: process.env.GOOGLE_API_KEY,
// })

// /* -----------------------------
//    Chunking helper
// -------------------------------- */

// const test = await embeddings.embedDocuments(['Hello world'])
// console.log(test)

// function chunkText(text, chunkSize = 800, overlap = 100) {
//   const words = text.split(' ')
//   const chunks = []

//   let i = 0
//   while (i < words.length) {
//     const chunk = words.slice(i, i + chunkSize).join(' ')
//     chunks.push(chunk)
//     i += chunkSize - overlap
//   }

//   return chunks
// }

// /* -----------------------------
//    Ingest function
// -------------------------------- */
// async function ingestText(text, baseMetadata = {}) {
//   const chunks = chunkText(text)
//   console.log(`🔹 Chunked into ${chunks.length} pieces`)

//   // Create embeddings
//   console.log('🔹 Creating embeddings…')
//   const vectors = await embeddings.embedDocuments(chunks)

//   // Sanity check embeddings
//   vectors.forEach((v, i) => {
//     if (!v || v.length === 0) {
//       console.error(`❌ Vector at index ${i} is empty!`)
//       process.exit(1)
//     }
//     if (v.length !== 768) {
//       console.warn(
//         `⚠️ Vector at index ${i} has length ${v.length} (expected 768)`,
//       )
//     }
//   })
//   console.log('✅ Embeddings created successfully')

//   // Prepare rows for Supabase
//   const rows = chunks.map((chunk, i) => ({
//     content: chunk,
//     embedding: vectors[i],
//     metadata: {
//       ...baseMetadata,
//       chunk_index: i,
//       chunk_count: chunks.length,
//       source: 'don_foley_cv',
//     },
//   }))

//   console.log('🔹 Inserting into Supabase…')
//   const { error } = await supabase.from('documents').insert(rows)

//   if (error) {
//     console.error('❌ Supabase insert error:', error)
//     process.exit(1)
//   }

//   console.log(`✅ Successfully ingested ${chunks.length} chunks`)
// }

// /* -----------------------------
//    Main
// -------------------------------- */
// async function main() {
//   const filePath = path.resolve('./data/dad-cv.txt')
//   if (!fs.existsSync(filePath)) {
//     console.error(`❌ File not found: ${filePath}`)
//     process.exit(1)
//   }

//   const cvText = fs.readFileSync(filePath, 'utf-8')
//   await ingestText(cvText, { type: 'cv', person: 'Don Foley' })

//   process.exit(0)
// }

// main().catch((err) => {
//   console.error('❌ Ingest failed:', err)
//   process.exit(1)
// })
