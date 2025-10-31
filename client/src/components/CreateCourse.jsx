// /client/src/components/CreateCourse.jsx

import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCourse } from '../api'
import { UserContext } from '../context/UserContext'

const CreateCourse = () => {
  const { authUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [materialsNeeded, setMaterialsNeeded] = useState('')
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!authUser) {
      setErrors(['You must be signed in to create a course.'])
      return
    }

    const courseData = {
      title,
      description,
      materialsNeeded,
      userId: authUser.id
    }

    try {
      const result = await createCourse(courseData, authUser)

      if (result === true) {
        console.log('✅ Course created successfully!')
        navigate('/')
      } else if (result.errors) {
        setErrors(result.errors)
      } else {
        setErrors(['An unexpected error occurred.'])
      }
    } catch (error) {
      console.error('Error creating course:', error)
      setErrors(['An unexpected error occurred.'])
    }
  }

  const handleCancel = () => navigate('/')

  return (
    <div className="form--centered">
      <h2>Create Course</h2>

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

        <label htmlFor="materialsNeeded">Materials Needed</label>
        <textarea
          id="materialsNeeded"
          name="materialsNeeded"
          value={materialsNeeded}
          onChange={(e) => setMaterialsNeeded(e.target.value)}
        />

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
  )
}

export default CreateCourse
