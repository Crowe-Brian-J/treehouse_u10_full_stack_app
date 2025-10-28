import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const UserSignIn = () => {
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const { signIn } = useContext(UserContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])

    try {
      const user = await signIn(emailAddress, password)
      if (user) {
        // Redirect to homepage (or previous page if implementing extra credit)
        navigate('/')
      } else {
        setErrors(['Sign-in failed: Invalid email or password'])
      }
    } catch (error) {
      console.error(error)
      setErrors(['An unexpected error occurred'])
    }
  }

  return (
    <div className="form--centered">
      <h2>Sign In</h2>
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
