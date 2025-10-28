// /client/src/components/Header.jsx

import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">Courses</h1>
        <nav>
          <ul className="header--signedout">
            <li>
              <Link href="/signup">Sign Up</Link>
            </li>
            <li>
              <Link href="/signin">Sign In</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
