import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getCourseById, updateCourse } from '../api'
import { UserContext } from '../context/UserContext'

const UpdateCourse = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { authUser } = useContext(UserContext)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [estimatedTime, setEstimatedTime] = useState('')
  const [materialsNeeded, setMaterialsNeeded] = useState('')
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id)
        if (!mounted) return

        // If a user is not the course owner, redirect
        if (authUser && data.userId !== authUser.id) {
          navigate(`/forbidden`)
          return
        }

        // Prefill fields
        setTitle(data.title || '')
        setDescription(data.description || '')
        setEstimatedTime(data.estimatedTime || '')
        setMaterialsNeeded(data.materialsNeeded || '')
      } catch (err) {
        console.error('Error fetching course:', err)
        setErrors(['Unable to load course details.'])
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchCourse()

    return () => {
      mounted = false
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])

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
        // On success redirect to course detail
        navigate(`/courses/${id}`)
      } else if (result.errors) {
        setErrors(result.errors)
      } else if (result.forbidden) {
        setErrors(['You are not authorized to update this course.'])
      } else {
        setErrors(['An unexpected error occurred.'])
      }
    } catch (error) {
      console.error('Error updating course:', error)
      setErrors(['An unexpected error occurred.'])
    }
  }

  if (loading) return <p>Loading course...</p>

  return (
    <div className="form--centered">
      <h2>Update Course</h2>

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
        <label htmlFor="title">Course Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">Course Description</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

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

        <button type="submit" className="button">
          Update Course
        </button>
        <Link className="button button-secondary" to={`/courses/${id}`}>
          Cancel
        </Link>
      </form>
    </div>
  )
}

export default UpdateCourse
