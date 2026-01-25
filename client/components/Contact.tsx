// import { useForm, ValidationError } from '@formspree/react'

// function Contact() {
//   const [state, handleSubmit] = useForm('mbdgnyzg')

//   if (state.succeeded) {
//     return <p>Nice one </p>
//   }
//   return (
//     <>
//       <div>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="email">Type your email address</label>
//           <input
//             id="email"
//             type="email"
//             name="email"
//             placeholder="What is your email address?"
//           />
//           <ValidationError prefix="Email" field="email" errors={state.errors} />
//           <label htmlFor="message">Type your message</label>
//           <textarea
//             id="message"
//             name="message"
//             placeholder="What is your message?"
//           />
//           <ValidationError
//             prefix="Message"
//             field="message"
//             errors={state.errors}
//           />
//           <button type="submit" disabled={state.submitting}>
//             Submit
//           </button>
//         </form>
//       </div>
//       <div>
//         <h1>Different ways to contact Don</h1>
//         <img src="/images/unnamed.png" alt="linkedin" />
//         <p>
//           Email: <em>donoughfoley@gmail.com</em>
//         </p>
//         <p>
//           Ph: <em>+64 021 1071 302</em>
//         </p>
//         <img src="/images/don-arsenal.JPG" alt="Don" />
//       </div>
//     </>
//   )
// }

// export default Contact
import { useForm, ValidationError } from '@formspree/react'
import { useEffect } from 'react'

function Contact() {
  const [state, handleSubmit] = useForm('mbdgnyzg')

  // Trigger animations on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(
        '.contact-form-section, .contact-info-section',
      )
      elements.forEach((el) => el.classList.add('animate-in'))
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <footer className="contact-container">
      <div className="contact-content">
        {/* Left Side - Contact Form */}
        <div className="contact-form-section scroll-fade-left">
          <div className="section-header">
            <h2>Get In Touch</h2>
            <p>Let's discuss your next project</p>
          </div>

          {state.succeeded ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Message Sent!</h3>
              <p>Thanks for reaching out. I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  required
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or question..."
                  rows={5}
                  required
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="submit-button"
              >
                <span>{state.submitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Center Separator */}
        <div className="contact-separator">
          <div className="separator-line"></div>
          <div className="separator-dot"></div>
        </div>

        {/* Right Side - Contact Info */}
        <div className="contact-info-section scroll-fade-right">
          <div className="section-header">
            <h2>Connect With Don</h2>
            <p>Multiple ways to reach out</p>
          </div>

          <div className="profile-card">
            <div className="profile-image-wrapper">
              <a href="https://www.linkedin.com/in/donoughfoley/">
                {' '}
                <img
                  src="/images/don-arsenal.JPG"
                  alt="Don Foley"
                  className="profile-image"
                />
              </a>
            </div>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="contact-text">
                  <span className="contact-label">Email</span>
                  <a href="mailto:donoughfoley@gmail.com">
                    donoughfoley@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="contact-text">
                  <span className="contact-label">Phone</span>
                  <a href="tel:+64211071302">+64 021 1071 302</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <div className="contact-text">
                  <span className="contact-label">LinkedIn</span>
                  <a
                    href="https://www.linkedin.com/in/donoughfoley/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Don Foley. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Contact
