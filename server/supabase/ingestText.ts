// ingest/ingestText.ts
// import { supabase } from './supabase.ts'
// import { embeddings } from './embeddings.ts'
// import { chunkText } from './chunk.ts'

// export async function ingestText(
//   text: string,
//   metadata: Record<string, unknown>,
// ) {
//   const chunks = chunkText(text)

//   for (const chunk of chunks) {
//     // const embedding = await embeddings.embedQuery(chunk)
//     const embedding = await embeddings.embedDocuments(chunk)

//     const { error } = await supabase.from('documents').insert({
//       content: chunk,
//       metadata,
//       embedding,
//     })

//     if (error) {
//       console.error('Supabase insert error:', error)
//       throw error
//     }
//   }

//   console.log(`✅ Ingested ${chunks.length} chunks`)
// }

// ingest/ingestText.ts
import { supabase } from './supabase.ts'
import { embeddings } from './embeddings.ts'
import { chunkText } from './chunk.ts'

export async function ingestText(
  text: string,
  baseMetadata: Record<string, unknown>,
) {
  const chunks = chunkText(text)

  // Embed all chunks at once (better + cheaper)
  const vectors = await embeddings.embedDocuments(chunks)

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

  const { error } = await supabase.from('documents').insert(rows)

  if (error) {
    console.error('❌ Supabase insert error:', error)
    throw error
  }

  console.log(`✅ Ingested ${chunks.length} chunks`)
}
