// /client/src/components/Header.jsx

import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Header = () => {
  const { authUser, signOut } = useContext(UserContext)
  // Store this way to avoid messing with db
  const name = `${authUser.firstName} ${authUser.lastName}`

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses App</Link>
        </h1>

        <nav>
          {authUser ? (
            <>
              <span>Welcome, {name}!</span>
              <button className="button" onClick={signOut}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link className="button" to="/signup">
                Sign Up
              </Link>
              <Link className="button" to="/signin">
                Sign In
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
