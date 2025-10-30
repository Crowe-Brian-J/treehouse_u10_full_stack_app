import { Link } from 'react-router-dom'

const UserSignUp = () => {
  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
      <p>This page will eventually handle user registration.</p>
      <Link className="button button-secondary" to="/">
        Cancel
      </Link>
    </div>
  )
}

export default UserSignUp
