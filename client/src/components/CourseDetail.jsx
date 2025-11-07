import { useState, useEffect, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getCourseById, deleteCourse } from '../api'
import { UserContext } from '../context/UserContext'

const CourseDetail = () => {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const { authUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const result = await getCourseById(id)

        // ✅ Check for structured responses
        if (result?.error === 404) {
          navigate('/notfound')
        } else if (result?.error === 403) {
          navigate('/forbidden')
        } else if (result?.error === 500) {
          navigate('/error')
        } else {
          setCourse(result)
        }
      } catch (error) {
        console.error('Error fetching course:', error)
        navigate('/error')
      }
    }

    fetchCourse()
  }, [id, navigate])

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this course?'
    )
    if (!confirmDelete) return

    try {
      const result = await deleteCourse(course.id, authUser)

      if (result === true) {
        navigate('/')
      } else if (result?.forbidden) {
        navigate('/forbidden')
      } else if (result?.error === 404) {
        navigate('/notfound')
      } else {
        navigate('/error')
      }
    } catch (error) {
      console.error('Delete failed:', error)
      navigate('/error')
    }
  }

  if (!course) return <p>Loading course details...</p>

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
      </div>
    </>
  )
}

export default CourseDetail
