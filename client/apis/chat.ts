import request from 'superagent'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function postPrompt(prompt: string): Promise<string | undefined> {
  try {
    const result = await request.post(`${rootURL}/frank`).send(prompt)
    return result.body
  } catch (err) {
    console.log(
      err,
      'error posting the prompt to the server from the API client functions',
    )
  }
}
