// /client/src/components/Forbidden.jsx

import { Link, useLocation } from 'react-router-dom'

const Forbidden = () => {
  const location = useLocation()
  const { courseId, message } = location.state?.courseId

  return (
    <div className="wrap">
      <h2>Forbidden</h2>
      <p>{message || 'Sorry! You are not authorized to access this page.'}</p>
      {courseId && (
        <Link className="button button-secondary" to={`/courses/${courseId}`}>
          Back to Course
        </Link>
      )}
      <Link to="/" className="button">
        Return to List
      </Link>
    </div>
  )
}

export default Forbidden
