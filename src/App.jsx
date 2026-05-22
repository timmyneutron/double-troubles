import { useState } from 'react'
import logo from './assets/logo.svg'
import './App.css'

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus({ type: 'success', text: 'Thanks! We\'ll be in touch soon.' })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus({ type: 'error', text: 'Something went wrong. Please try again.' })
      }
    } catch {
      setStatus({ type: 'error', text: 'Something went wrong. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="app">
      <img src={logo} alt="Double Troubles logo" className="logo" />
      <h1>Welcome to the Double Troubles!</h1>
      <p className="description">
        The Double Troubles are an inclusive, beginner-friendly, ambidancetrous
        Lindy Hop performance team based in New York City, and we'd love for you
        to come dance with us!
      </p>

      <h2>Workshop Announcement</h2>
      <p className="description">
        We're having a workshop! Join us Wednesday, May 29th, 7:30 - 9:30 PM for an ambidancetrous Lindy Hop **performance** workshop.
        <br/>
        <a href="" target="_blank" rel="noopener noreferrer">Click here for details</a>
      </p>

      <h2>Summer Term Starts June 3rd!</h2>
      <p className="description">
        We're gearing up for our summer term, which starts Wednesday, June 3rd! If you're interested in joining us, please fill out the form below and we'll get back to you with more information about the upcoming term.
      </p>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Anything else you'd like to say?</label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us about yourself, your dance experience, questions, etc."
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? 'Sending...' : 'Submit'}
        </button>

        {status && (
          <div className={`status-message ${status.type}`}>
            {status.text}
          </div>
        )}
      </form>
    </div>
  )
}

export default App
