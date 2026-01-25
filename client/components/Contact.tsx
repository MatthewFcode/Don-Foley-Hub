import { useForm, ValidationError } from '@formspree/react'

function Contact() {
  const [state, handleSubmit] = useForm('mbdgnyzg')

  if (state.succeeded) {
    return <p>Nice one </p>
  }
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Type your email address</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="What is your email address?"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <label htmlFor="message">Type your message</label>
          <textarea
            id="message"
            name="message"
            placeholder="What is your message?"
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
          <button type="submit" disabled={state.submitting}>
            Submit
          </button>
        </form>
      </div>
      <div>
        <h1>Different ways to contact Don</h1>
        <img src="/images/unnamed.png" alt="linkedin" />
        <p>
          Email: <em>donoughfoley@gmail.com</em>
        </p>
        <p>
          Ph: <em>+64 021 1071 302</em>
        </p>
        <img src="/images/don-arsenal.JPG" alt="Don" />
      </div>
    </>
  )
}

export default Contact
