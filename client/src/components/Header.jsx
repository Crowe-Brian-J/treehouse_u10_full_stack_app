// /client/src/components/Header.jsx

import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../context/UserContext'

const Header = () => {
  const { authUser, signOut } = useContext(UserContext)

  // Navigate after signOut is called
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut()
    navigate('/')
  }

  // Build user's full name if signed in
  const name = authUser ? `${authUser.firstName} ${authUser.lastName}` : null

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>

        <nav>
          <ul className={authUser ? 'header--signedin' : 'header--signedout'}>
            {authUser ? (
              <>
                <li>Welcome, {name}!</li>
                <li>
                  <button onClick={handleSignOut} className="signout-link">
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/signin">Sign In</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
