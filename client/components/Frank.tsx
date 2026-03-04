import aiAnimation from '../../src/animations/AI logo Foriday.json'
import Lottie from 'lottie-react'
import { useState, useRef, useEffect } from 'react'
import NavHome from './NavFrank.tsx'

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
      <NavHome />

      <div className="frank-page-container">
        <div className="frank-layout">
          {/* Left Panel: Branding & Animation */}
          <div className="frank-left-panel scroll-fade" ref={headerRef}>
            <div className="frank-branding">
              <h1 className="frank-title">Meet Franky</h1>
              <div className="frank-status-tag">
                <span className="status-dot"></span>
                Online & Ready
              </div>
              <p className="frank-subtitle">
                Don's Personal AI Assistant. Ask me anything about Don's
                professional experience, career achievements, or skills.
              </p>
            </div>
            
            <div className="frank-lottie-container">
              <div className="lottie-wrapper">
                <Lottie
                  lottieRef={lottieRef}
                  animationData={aiAnimation}
                  loop
                  autoplay={false}
                  className="frank-animation"
                />
                <div className="lottie-glow"></div>
              </div>
            </div>
          </div>

          {/* Right Panel: Chat Interface */}
          <div className="frank-right-panel">
            <div className="frank-conversation-container" ref={conversationRef}>
              {messages.length === 0 && !streamingResponse && (
                <div className="frank-welcome-message">
                  <p>How can I help you today?</p>
                </div>
              )}
              
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message ${
                    msg.role === 'user' ? 'user-message' : 'ai-message'
                  }`}
                >
                  <div className="message-bubble">
                    <span className="message-role">
                      {msg.role === 'user' ? 'You' : 'Frank'}
                    </span>
                    <p className="message-content">{msg.content}</p>
                  </div>
                </div>
              ))}

              {streamingResponse && (
                <div className="message ai-message">
                  <div className="message-bubble">
                    <span className="message-role">Frank</span>
                    <p className="message-content streaming-text">
                      {streamingResponse}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="frank-input-area scroll-fade" ref={inputRef}>
              <form onSubmit={handleSubmit} className="frank-input-form">
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="prompt"
                    placeholder="Type your message..."
                    onChange={handleChange}
                    value={form.prompt}
                    disabled={loading}
                    className="frank-input"
                  />
                  <button 
                    type="submit" 
                    disabled={loading || !form.prompt.trim()} 
                    className="frank-send-button"
                  >
                    {loading ? (
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    ) : (
                      'Send'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Frank
