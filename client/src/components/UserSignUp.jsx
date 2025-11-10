// /client/src/components/UserSignUp.jsx

import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'

const UserSignUp = () => {
  // Access signIn from context for automatic sign-in after registration
  const { signIn } = useContext(UserContext)
  const navigate = useNavigate()

  // Form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState([])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])

    // Client-side validation: passwords must match
    if (password !== confirmPassword) {
      setErrors(['Passwords do not match'])
      return
    }

    const user = { firstName, lastName, emailAddress, password }

    try {
      // Send POST request to create new user
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(user)
      })

      if (response.status === 201) {
        // Successful creation → sign in automatically
        await signIn(emailAddress, password)
        navigate('/') // Redirect to homepage
      } else if (response.status === 400) {
        // Validation errors from API
        const data = await response.json()
        setErrors(data.errors || ['Validation failed'])
      } else {
        // Unexpected server errors
        navigate('/error')
      }
    } catch (err) {
      console.error('Error creating user:', err)
      navigate('/error')
    }
  }

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>

        {/* Display validation errors */}
        {errors.length > 0 && (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          {/* Last Name */}
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          {/* Email Address */}
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />

          {/* Password */}
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Confirm Password */}
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Form buttons */}
          <button type="submit" className="button">
            Sign Up
          </button>
          <Link className="button button-secondary" to="/">
            Cancel
          </Link>
        </form>

        {/* Link to sign-in page */}
        <p>
          Already have a user account? Click here to{' '}
          <Link to="/signin">sign in</Link>!
        </p>
      </div>
    </main>
  )
}

export default UserSignUp
