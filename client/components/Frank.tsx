import aiAnimation from '../../src/animations/AI logo Foriday.json'
import Lottie from 'lottie-react'
import { useState } from 'react'

function Frank() {
  const [form, setForm] = useState({ prompt: '' })
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    setForm({
      ...form,
      [evt.target.name]: evt.target.value,
    })
  }

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   if (!form.prompt.trim()) return
  //   setResponse('')
  //   setLoading(true)

  //   const eventSource = new EventSource(`/api/v1/frank`, { method: 'POST' })

  //   await fetch('/api/v1/frank', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ prompt: form.prompt }),
  //   })

  //   eventSource.onmessage = (e) => {
  //     if (e.data === '[DONE]') {
  //       eventSource.close()
  //       setLoading(false)
  //     } else {
  //       setResponse((prev) => prev + e.data)
  //     }
  //   }
  // }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.prompt.trim()) return
    setResponse('')
    setLoading(true)

    const res = await fetch('/api/v1/frank', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: form.prompt }),
    })

    const reader = res.body?.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader!.read()
      if (done) break
      const chunk = decoder.decode(value)
      chunk.split('\n\n').forEach((line) => {
        if (line.startsWith('data: ')) {
          const data = line.replace('data: ', '')
          if (data === '[DONE]') {
            setLoading(false)
          } else {
            setResponse((prev) => prev + data)
          }
        }
      })
    }
  }

  return (
    <div>
      <h1>Hi I am Frank Dons personal AI assistant!</h1>
      <h2>
        Ask me anything about about Dons professional experience or some
        questions about Don as a person. Otherwise I wont be able to help you
        out
      </h2>
      <div>
        <Lottie animationData={aiAnimation} loop />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="prompt"
          placeholder="...ask me something"
          onChange={handleChange}
          value={form.prompt}
        />
        <button type="submit">Send</button>
      </form>
      <div style={{ marginTop: '1rem' }}>
        {loading && <p>Loading...</p>}
        <p>
          <strong>Frank:</strong> {response}
        </p>
      </div>
    </div>
  )
}

export default Frank
