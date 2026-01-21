// import 'dotenv/config'
// import fs from 'fs'
// import path from 'path'
// import { createClient } from '@supabase/supabase-js'
// import { pipeline } from '@xenova/transformers'

// /* -----------------------------
//    Load environment variables
// -------------------------------- */
// const requiredEnvs = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY']
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
//   process.env.SUPABASE_SERVICE_ROLE_KEY,
// )

// /* -----------------------------
//    Load Xenova embeddings model
// -------------------------------- */
// console.log('🔹 Loading local embedding model… (this may take a minute)')
// const embedPipeline = await pipeline(
//   'feature-extraction',
//   'Xenova/all-MiniLM-L6-v2',
//   { quantized: true },
// )
// console.log('✅ Embedding model ready')

// /* -----------------------------
//    Chunking helper
// -------------------------------- */
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
//    Embeddings helper
// -------------------------------- */
// // async function getEmbeddings(texts) {
// //   const vectors = []

// //   for (const t of texts) {
// //     const res = await embedPipeline(t)
// //     // Xenova sometimes returns nested arrays, flatten to 384-dim
// //     const vector = Array.isArray(res[0]) ? res[0] : res
// //     vectors.push(vector)
// //   }

// //   return vectors
// // }
// async function getEmbeddings(texts) {
//   const vectors = []

//   for (const t of texts) {
//     const res = await embedPipeline(t)

//     // Xenova returns an object for ONNX models, we need the data array
//     let vector
//     if (res?.data) {
//       // Convert typed array object to normal array
//       vector = Object.values(res.data)
//     } else if (Array.isArray(res[0])) {
//       vector = res[0]
//     } else {
//       vector = res
//     }

//     if (!vector || vector.length !== 384) {
//       console.warn(
//         `⚠️ Vector at index ${vectors.length} has invalid length: ${vector?.length}`,
//       )
//     }

//     vectors.push(vector)
//   }

//   return vectors
// }

// /* -----------------------------
//    Ingest function
// -------------------------------- */
// async function ingestText(text, baseMetadata = {}) {
//   const chunks = chunkText(text)
//   console.log(`🔹 Chunked into ${chunks.length} pieces`)

//   console.log('🔹 Creating embeddings…')
//   const vectors = await getEmbeddings(chunks)

//   // Sanity check
//   vectors.forEach((v, i) => {
//     if (!v || v.length !== 384) {
//       console.warn(`⚠️ Vector at index ${i} has invalid length: ${v?.length}`)
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
