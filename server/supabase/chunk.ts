// // lib/chunk.ts
// export function chunkText(
//   text: string,
//   chunkSize = 500,
//   overlap = 100,
// ): string[] {
//   const chunks: string[] = []
//   let start = 0

//   while (start < text.length) {
//     const end = start + chunkSize
//     chunks.push(text.slice(start, end))
//     start += chunkSize - overlap
//   }

//   return chunks
// }
// ingest/chunk.ts
export function chunkText(
  text: string,
  chunkSize = 800,
  overlap = 100,
): string[] {
  const words = text.split(' ')
  const chunks: string[] = []

  let i = 0
  while (i < words.length) {
    const chunk = words.slice(i, i + chunkSize).join(' ')
    chunks.push(chunk)
    i += chunkSize - overlap
  }

  return chunks
}
