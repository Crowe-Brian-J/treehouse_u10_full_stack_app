// /client/src/components/UpdateCourse.jsx

import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getCourseById, updateCourse } from '../api'
import { UserContext } from '../context/UserContext'

const UpdateCourse = () => {
  // Get the course ID from the URL params
  const { id } = useParams()
  const navigate = useNavigate()

  // Get authenticated user from context
  const { authUser } = useContext(UserContext)

  // Local state for form fields
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [estimatedTime, setEstimatedTime] = useState('')
  const [materialsNeeded, setMaterialsNeeded] = useState('')
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch course data when component mounts
  useEffect(() => {
    let mounted = true

    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id)
        if (!mounted) return

        // If API says course not found → redirect to /notfound
        if (data?.notFound) {
          navigate('/notfound')
          return
        }

        // If user is signed in but not course owner → redirect to /forbidden
        if (authUser && data.userId !== authUser.id) {
          navigate('/forbidden')
          return
        }

        // Populate form with fetched course data
        setTitle(data.title || '')
        setDescription(data.description || '')
        setEstimatedTime(data.estimatedTime || '')
        setMaterialsNeeded(data.materialsNeeded || '')
      } catch (err) {
        console.error('Error fetching course:', err)
        navigate('/error') // 500 or network errors
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchCourse()
    return () => {
      mounted = false
    }
  }, [id, authUser, navigate])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])

    // Must be signed in to update a course
    if (!authUser) {
      setErrors(['You must be signed in to update a course.'])
      return
    }

    const courseData = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: authUser.id
    }

    try {
      const result = await updateCourse(id, courseData, authUser)

      if (result === true) {
        // Success → navigate to course detail page
        navigate(`/courses/${id}`)
      } else if (result.errors) {
        // Validation errors → display in form
        setErrors(result.errors)
      } else if (result.forbidden) {
        // Unauthorized → redirect to Forbidden page
        navigate('/forbidden')
      } else {
        // Unexpected errors → redirect to error page
        navigate('/error')
      }
    } catch (error) {
      console.error('Error updating course:', error)
      navigate('/error')
    }
  }

  if (loading) return <p>Loading course...</p>

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>

        {/* Display validation errors if present */}
        {errors.length > 0 && (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            {/* Left column: Course title, author, description */}
            <div>
              <label htmlFor="title">Course Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <p>
                By{' '}
                {authUser
                  ? `${authUser.firstName} ${authUser.lastName}`
                  : 'Unknown'}
              </p>

              <label htmlFor="description">Course Description</label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Right column: Estimated time and materials needed */}
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                value={materialsNeeded}
                onChange={(e) => setMaterialsNeeded(e.target.value)}
              />
            </div>
          </div>

          {/* Form buttons */}
          <button type="submit" className="button">
            Update Course
          </button>
          <Link className="button button-secondary" to={`/courses/${id}`}>
            Cancel
          </Link>
        </form>
      </div>
    </main>
  )
}

export default UpdateCourse
