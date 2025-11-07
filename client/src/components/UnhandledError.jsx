// /client/src/components/UnhandledError.jsx

import { Link } from 'react-router-dom'

const UnhandledError = () => (
  <div className="wrap">
    <h2>Error</h2>
    <p>Sorry! We encountered an unexpected error.</p>

    <div className="button--group">
      <Link to="/" className="button">
        Return to List
      </Link>
    </div>
  </div>
)

export default UnhandledError
