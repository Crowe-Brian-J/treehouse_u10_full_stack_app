// /client/src/components/CreateCourse.jsx

import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCourse } from '../api'
import { UserContext } from '../context/UserContext'

const CreateCourse = () => {
  // Get the authenticated user from context
  const { authUser } = useContext(UserContext)
  const navigate = useNavigate()

  // Local state for form fields
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [estimatedTime, setEstimatedTime] = useState('')
  const [materialsNeeded, setMaterialsNeeded] = useState('')
  const [errors, setErrors] = useState([])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Must be signed in to create a course
    if (!authUser) {
      setErrors(['You must be signed in to create a course.'])
      return
    }

    // Construct course data
    const courseData = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: authUser.id
    }

    try {
      const result = await createCourse(courseData, authUser)

      // Handle response
      if (result === true) {
        // Success → redirect to homepage
        navigate('/')
      } else if (result.errors) {
        // Validation errors → show in form
        setErrors(result.errors)
      } else {
        // Unexpected errors → redirect to error page
        navigate('/error')
      }
    } catch (error) {
      console.error('Error creating course:', error)
      // Network or other unhandled errors → redirect to error page
      navigate('/error')
    }
  }

  // Handle cancel button → redirect to homepage
  const handleCancel = () => navigate('/')

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>

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
            Create Course
          </button>
          <button
            type="button"
            className="button button-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </main>
  )
}

export default CreateCourse
