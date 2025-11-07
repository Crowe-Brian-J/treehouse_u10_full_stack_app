// /client/src/components/UserSignUp.jsx

import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const UserSignUp = () => {
  const { signIn } = useContext(UserContext)
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])

    // Client-side check
    if (password !== confirmPassword) {
      setErrors(['Passwords do not match'])
      return
    }

    const user = { firstName, lastName, emailAddress, password }

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(user)
      })

      if (response.status === 201) {
        console.log('✅ User successfully created!')
        await signIn(emailAddress, password)
        navigate('/')
      } else if (response.status === 400) {
        const data = await response.json()
        setErrors(data.errors || ['Validation failed'])
      } else if (response.status === 500) {
        navigate('/error')
      } else {
        navigate('/error')
      }
    } catch (err) {
      console.error('Error creating user:', err)
      navigate('/error')
    }
  }

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
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
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

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

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit">Sign Up</button>
        <Link className="button button-secondary" to="/">
          Cancel
        </Link>
      </form>

      <p>
        Already have a user account? Click here to{' '}
        <Link to="/signin">sign in</Link>!
      </p>
    </div>
  )
}

export default UserSignUp
