import aiAnimation from '../../src/animations/AI logo Foriday.json'
import Lottie from 'lottie-react'
import { useState } from 'react'

function Frank() {
  const [form, setForm] = useState({ prompt: '' })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    setForm({
      ...form,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const promptObj = { prompt: form.prompt }
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
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default Frank
