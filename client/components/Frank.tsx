// import aiAnimation from '../../src/animations/AI logo Foriday.json'
// import Lottie from 'lottie-react'
// import { useState, useRef, useEffect } from 'react'
// import Nav from './Nav'

// interface Message {
//   role: 'user' | 'assistant'
//   content: string
// }

// function Frank() {
//   const [form, setForm] = useState({ prompt: '' })
//   const [messages, setMessages] = useState<Message[]>([])
//   const [streamingResponse, setStreamingResponse] = useState('')
//   const [loading, setLoading] = useState(false)

//   const lottieRef = useRef<any>(null)
//   const conversationRef = useRef<HTMLDivElement>(null)

//   // Control Lottie animation based on loading state
//   useEffect(() => {
//     if (lottieRef.current) {
//       if (loading) {
//         lottieRef.current.play()
//       } else {
//         lottieRef.current.stop()
//       }
//     }
//   }, [loading])

//   // Auto-scroll to bottom when new messages arrive
//   useEffect(() => {
//     if (conversationRef.current) {
//       conversationRef.current.scrollTop = conversationRef.current.scrollHeight
//     }
//   }, [messages, streamingResponse])

//   const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
//     evt.preventDefault()
//     setForm({
//       ...form,
//       [evt.target.name]: evt.target.value,
//     })
//   }

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     if (!form.prompt.trim()) return

//     const userMessage = { role: 'user', content: form.prompt }
//     const updatedHistory = [...messages, userMessage]

//     setMessages(updatedHistory)
//     setForm({ prompt: '' })
//     setStreamingResponse('')
//     setLoading(true)

//     try {
//       const res = await fetch('/api/v1/frank', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ messages: updatedHistory }),
//       })

//       const reader = res.body?.getReader()
//       const decoder = new TextDecoder()
//       let assistantMessage = ''

//       while (true) {
//         const { done, value } = await reader!.read()
//         if (done) break
//         const chunk = decoder.decode(value)
//         chunk.split('\n\n').forEach((line) => {
//           if (line.startsWith('data: ')) {
//             const data = line.replace('data: ', '')
//             if (data === '[DONE]') {
//               setLoading(false)
//               setMessages((prev) => [
//                 ...updatedHistory,
//                 { role: 'assistant', content: assistantMessage },
//               ])
//               setStreamingResponse('')
//             } else {
//               assistantMessage += data
//               setStreamingResponse(assistantMessage)
//             }
//           }
//         })
//       }
//     } catch (error) {
//       console.error('Error:', error)
//       setLoading(false)
//       setStreamingResponse('')
//     }
//   }

//   return (
//     <>
//       {/* <Nav /> */}

//       <div className="frank-container">
//         <div className="frank-header">
//           <h1>Hi, I am Frank — Don's Personal AI Assistant!</h1>
//           <h2>
//             Ask me anything about Don's professional experience or questions
//             about Don as a person. Otherwise, I won't be able to help you out.
//           </h2>
//           <div className="frank-lottie-container">
//             <div className="lottie-wrapper">
//               <Lottie
//                 lottieRef={lottieRef}
//                 animationData={aiAnimation}
//                 loop
//                 autoplay={false}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="frank-conversation" ref={conversationRef}>
//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`message ${
//                 msg.role === 'user' ? 'user-message' : 'ai-message'
//               }`}
//             >
//               <div className="message-bubble">
//                 <strong>{msg.role === 'user' ? 'You' : 'Frank'}</strong>
//                 <p>{msg.content}</p>
//               </div>
//             </div>
//           ))}

//           {streamingResponse && (
//             <div className="message ai-message">
//               <div className="message-bubble">
//                 <strong>Frank</strong>
//                 <p className="streaming-text">{streamingResponse}</p>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="frank-input-container">
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               name="prompt"
//               placeholder="Ask me something about Don..."
//               onChange={handleChange}
//               value={form.prompt}
//               disabled={loading}
//             />
//             <button type="submit" disabled={loading}>
//               {loading ? 'Sending...' : 'Send'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Frank

import aiAnimation from '../../src/animations/AI logo Foriday.json'
import Lottie from 'lottie-react'
import { useState, useRef, useEffect } from 'react'
import Nav from './Nav'
import Contact from './Contact.tsx'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function Frank() {
  const [form, setForm] = useState({ prompt: '' })
  const [messages, setMessages] = useState<Message[]>([])
  const [streamingResponse, setStreamingResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const lottieRef = useRef<any>(null)
  const conversationRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)

  // Initialize scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, observerOptions)

    // Observe scroll elements
    if (headerRef.current) observer.observe(headerRef.current)
    if (inputRef.current) observer.observe(inputRef.current)

    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current)
      if (inputRef.current) observer.unobserve(inputRef.current)
    }
  }, [])

  // Control Lottie animation based on loading state
  useEffect(() => {
    if (lottieRef.current) {
      if (loading) {
        lottieRef.current.play()
      } else {
        lottieRef.current.stop()
      }
    }
  }, [loading])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight
    }
  }, [messages, streamingResponse])

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    setForm({
      ...form,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.prompt.trim()) return

    const userMessage = { role: 'user', content: form.prompt }
    const updatedHistory = [...messages, userMessage]

    setMessages(updatedHistory)
    setForm({ prompt: '' })
    setStreamingResponse('')
    setLoading(true)

    try {
      const res = await fetch('/api/v1/frank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedHistory }),
      })

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ''

      while (true) {
        const { done, value } = await reader!.read()
        if (done) break
        const chunk = decoder.decode(value)
        chunk.split('\n\n').forEach((line) => {
          if (line.startsWith('data: ')) {
            const data = line.replace('data: ', '')
            if (data === '[DONE]') {
              setLoading(false)
              setMessages((prev) => [
                ...updatedHistory,
                { role: 'assistant', content: assistantMessage },
              ])
              setStreamingResponse('')
            } else {
              assistantMessage += data
              setStreamingResponse(assistantMessage)
            }
          }
        })
      }
    } catch (error) {
      console.error('Error:', error)
      setLoading(false)
      setStreamingResponse('')
    }
  }

  return (
    <>
      <Nav />

      <div className="frank-container">
        <div className="frank-header scroll-fade" ref={headerRef}>
          <h1>Meet Frank</h1>
          <h2>
            Don's Personal AI Assistant. Ask me anything about Don's
            professional experience, career achievements, or skills.
          </h2>
          <div className="frank-lottie-container">
            <div className="lottie-wrapper">
              <Lottie
                lottieRef={lottieRef}
                animationData={aiAnimation}
                loop
                autoplay={false}
                className="frank"
              />
            </div>
          </div>
        </div>

        <div className="frank-conversation" ref={conversationRef}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${
                msg.role === 'user' ? 'user-message' : 'ai-message'
              }`}
            >
              <div className="message-bubble">
                <strong>{msg.role === 'user' ? 'You' : 'Frank'}</strong>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}

          {streamingResponse && (
            <div className="message ai-message">
              <div className="message-bubble">
                <strong>Frank</strong>
                <p className="streaming-text">{streamingResponse}</p>
              </div>
            </div>
          )}
        </div>

        <div className="frank-input-container scroll-fade" ref={inputRef}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="prompt"
              placeholder="Ask me about Don's experience..."
              onChange={handleChange}
              value={form.prompt}
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Thinking...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
      <div>
        <Contact />
      </div>
    </>
  )
}

export default Frank
