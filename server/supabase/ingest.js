import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'
import { pipeline } from '@xenova/transformers'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const embedPipeline = await pipeline(
  'feature-extraction',
  'Xenova/all-MiniLM-L6-v2',
  { quantized: true },
)

//chunking function that splits the text based on section
function chunkText(text) {
  // Split on markdown headers (## or ###)
  const sections = text.split(/\n(?=#{2,3}\s)/) // split on the # chars

  const chunks = []

  for (const section of sections) {
    const trimmed = section.trim()
    if (!trimmed) continue

    // If a section is very long, split it further
    const words = trimmed.split(' ')
    if (words.length > 400) {
      // Fall back to word chunking for long sections
      let i = 0
      while (i < words.length) {
        chunks.push(words.slice(i, i + 400).join(' '))
        i += 300 // 100 word overlap
      }
    } else {
      chunks.push(trimmed)
    }
  }

  return chunks
}

async function getEmbeddings(texts) {
  const vectors = []

  for (const t of texts) {
    const output = await embedPipeline(t, {
      pooling: 'mean',
      normalize: true,
    })

    // Xenova returns a Float32Array in `data`
    const vector = Array.from(output.data)

    if (vector.length !== 384) {
      console.warn(`⚠️ Invalid vector length: ${vector.length}`)
    }

    vectors.push(vector)
  }

  return vectors
}

console.log('🧹 Removing existing CV embeddings…')

const { error: deleteError } = await supabase
  .from('documents')
  .delete()
  .eq('metadata->>source', 'don_foley_cv')

if (deleteError) {
  console.error('❌ Failed to delete old CV embeddings:', deleteError)
  process.exit(1)
}

console.log('✅ Old CV embeddings removed')

async function ingestText(text, baseMetadata = {}) {
  const chunks = chunkText(text)
  console.log(`🔹 Chunked into ${chunks.length} pieces`)

  console.log('🔹 Creating embeddings…')
  const vectors = await getEmbeddings(chunks)

  // Sanity check
  vectors.forEach((v, i) => {
    if (!v || v.length !== 384) {
      console.warn(`⚠️ Vector at index ${i} has invalid length: ${v?.length}`)
    }
  })

  console.log('✅ Embeddings created successfully')

  // Prepare rows for Supabase
  const rows = chunks.map((chunk, i) => ({
    content: chunk,
    embedding: vectors[i],
    metadata: {
      ...baseMetadata,
      chunk_index: i,
      chunk_count: chunks.length,
      source: 'don_foley_cv',
    },
  }))

  console.log('🔹 Inserting into Supabase…')
  const { error } = await supabase.from('documents').insert(rows)

  if (error) {
    console.error('❌ Supabase insert error:', error)
    process.exit(1)
  }

  console.log(`✅ Successfully ingested ${chunks.length} chunks`)
}

async function main() {
  const filePath = path.resolve('./data/dad-cv.txt')
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`)
    process.exit(1)
  }

  const cvText = fs.readFileSync(filePath, 'utf-8')
  await ingestText(cvText, { type: 'cv', person: 'Don Foley' })

  process.exit(0)
}

main().catch((err) => {
  console.error('❌ Ingest failed:', err)
  process.exit(1)
})
