// /client/src/components/UserSignIn.jsx

import { useState, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import UserContext from '../context/UserContext'

const UserSignIn = () => {
  // Form state
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  // Access signIn function from UserContext
  const { signIn } = useContext(UserContext)

  // React Router hooks
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/' // Redirect back to previous page or home

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])

    try {
      const user = await signIn(emailAddress, password)

      if (user) {
        // Successful sign-in → redirect back to previous page or home
        console.log('✅ Redirecting back to:', from)
        navigate(from, { replace: true })
      } else {
        // Sign-in failed → display validation error
        setErrors(['Sign-in failed: Invalid email or password'])
      }
    } catch (error) {
      console.error('Sign-in error:', error)
      // Redirect to error page on unexpected server issues
      navigate('/error')
    }
  }

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>

        {/* Display validation errors */}
        {errors.length > 0 && (
          <div className="validation--errors">
            <ul>
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

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

          {/* Form buttons */}
          <button type="submit" className="button">
            Sign In
          </button>
          <Link className="button button-secondary" to="/">
            Cancel
          </Link>
        </form>

        {/* Link to sign-up page */}
        <p>
          Don’t have a user account? Click here to{' '}
          <Link to="/signup">sign up</Link>!
        </p>
      </div>
    </main>
  )
}

export default UserSignIn
