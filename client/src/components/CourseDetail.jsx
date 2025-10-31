import { useState, useEffect, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getCourseById } from '../api'
import { UserContext } from '../context/UserContext'

const CourseDetail = () => {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [errors, setErrors] = useState([])
  const { authUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    getCourseById(id)
      .then((data) => setCourse(data))
      .catch((err) => {
        console.error('Error fetching course:', err)
        setErrors(['Unable to load course details.'])
      })
  }, [id])

  if (errors.length > 0) {
    return (
      <div className="wrap">
        <h2>Course Detail</h2>
        <div className="validation--errors">
          <h3>Error</h3>
          <ul>
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  if (!course) return <p>Loading course details...</p>

  const handleDelete = async () => {
    // We'll wire this up later
    console.log('Delete course clicked!')
  }

  const canEdit = authUser && authUser.id === course.userId

  return (
    <>
      <div className="actions--bar">
        <div className="wrap">
          {canEdit && (
            <>
              <Link className="button" to={`/courses/${id}/update`}>
                Update Course
              </Link>
              <button className="button" onClick={handleDelete}>
                Delete Course
              </button>
            </>
          )}
          <Link className="button button-secondary" to="/">
            Return to List
          </Link>
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>
                By{' '}
                {course.User
                  ? `${course.User.firstName} ${course.User.lastName}`
                  : 'Unknown Instructor'}
              </p>

              <p className="course--description">{course.description}</p>
            </div>

            <div>
              {course.estimatedTime && (
                <>
                  <h3 className="course--detail--title">Estimated Time</h3>
                  <p>{course.estimatedTime}</p>
                </>
              )}

              {course.materialsNeeded && (
                <>
                  <h3 className="course--detail--title">Materials Needed</h3>
                  <ul className="course--detail--list">
                    {course.materialsNeeded
                      .split('\n')
                      .filter((item) => item.trim() !== '')
                      .map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default CourseDetail
