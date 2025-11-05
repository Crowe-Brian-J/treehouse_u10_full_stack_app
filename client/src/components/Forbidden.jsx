// /client/src/components/Forbidden.jsx

import { Link } from 'react-router-dom'

const Forbidden = () => (
  <div className="wrap">
    <h2>Forbidden</h2>
    <p>Sorry! You are not authorized to access this page.</p>

    <div className="button--group">
      <Link to="/" className="button">
        Return to List
      </Link>
    </div>
  </div>
)

export default Forbidden
