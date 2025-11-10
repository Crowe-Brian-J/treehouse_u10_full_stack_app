// /client/src/components/CourseDetail.jsx

import { useState, useEffect, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getCourseById, deleteCourse } from '../api'
import { UserContext } from '../context/UserContext'

const CourseDetail = () => {
  // Retrieve course ID from the URL
  const { id } = useParams()

  // Local state for course data
  const [course, setCourse] = useState(null)

  // Get authenticated user from context
  const { authUser } = useContext(UserContext)

  // Navigation hook
  const navigate = useNavigate()

  // Fetch course details when component mounts or ID changes
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const result = await getCourseById(id)

        // Redirect based on structured response from handleResponse()
        if (result?.notFound) {
          navigate('/notfound')
          return
        } else if (result?.forbidden) {
          navigate('/forbidden')
          return
        } else if (result?.error) {
          navigate('/error')
          return
        }

        // Populate course state
        setCourse(result)
      } catch (error) {
        console.error('Error fetching course:', error)
        navigate('/error')
      }
    }

    fetchCourse()
  }, [id, navigate])

  // Handle deletion of a course
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this course?'
    )
    if (!confirmDelete) return

    try {
      const result = await deleteCourse(course.id, authUser)

      // Redirect based on API result
      if (result === true) {
        navigate('/')
      } else if (result?.forbidden) {
        navigate('/forbidden')
      } else if (result?.notFound) {
        navigate('/notfound')
      } else {
        navigate('/error')
      }
    } catch (error) {
      console.error('Delete failed:', error)
      navigate('/error')
    }
  }

  // Display loading text until course data is fetched
  if (!course) return <p>Loading course details...</p>

  // Only allow edit/delete if the signed-in user owns the course
  const canEdit = authUser && authUser.id === course.userId

  return (
    <>
      {/* Action buttons bar */}
      <div className="actions--bar">
        <div className="wrap">
          {/* Show Update/Delete buttons only for course owner */}
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

          {/* Always show Return to List button */}
          <Link className="button button-secondary" to="/">
            Return to List
          </Link>
        </div>
      </div>

      {/* Main course content */}
      <div className="wrap">
        <h2>Course Detail</h2>
        <div className="main--flex">
          {/* Left column: course title, author, description */}
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

          {/* Right column: estimated time and materials needed */}
          <div>
            {/* Only render Estimated Time if provided */}
            {course.estimatedTime && (
              <>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{course.estimatedTime}</p>
              </>
            )}

            {/* Only render Materials Needed if provided */}
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
