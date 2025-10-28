import { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignIn = () => {
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Sign in attempted with:', { emailAddress, password })
  }

  return (
    <div className="form--centered">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign In</button>
        <Link className="button button-secondary" to="/">
          Cancel
        </Link>
      </form>

      <p>
        Don’t have a user account? Click here to{' '}
        <Link to="/signup">sign up</Link>!
      </p>
    </div>
  )
}

export default UserSignIn
