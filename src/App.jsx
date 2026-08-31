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

      <p className="description">
        We encourage dancers of all levels to join us, and beginners are especially welcome! This is a great opportunity to learn both roles, make friends, and perform in a supportive and friendly environment.
      </p>

      <h2>Performances coming up September 1st and 3rd!</h2>
      <br/>
      <h3>Midtown Swings</h3>
      <h3>Tuesday, September 1st</h3>
      <p className="description">
        Danznik Studios<br />
        240 West 37th St, 2nd floor<br />
        $25/$15 for students<br />
        Dance starts at 9 PM<br />
        Performance at 10:30 PM
      </p>
      <h3>Frim Fram Jam</h3>
      <h3>Thursday, September 3rd</h3>
      <p className="description">
        You Should Be Dancing<br />
        37 W 26th St, 2nd floor<br />
        $15/$10 for students<br />
        Dance starts at 9 PM<br />
        Performance at 10:30 PM
      </p>

      <h2>Join the Double Troubles!</h2>
      <p className="description">
        If you're interested in joining the Double Troubles, please fill out the form below and we'll get back to you with more information!
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
