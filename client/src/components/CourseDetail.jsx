import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCourseById } from '../api' // we'll add this API function next

const CourseDetail = () => {
  const { id } = useParams()
  const [course, setCourse] = useState(null)

  useEffect(() => {
    getCourseById(id)
      .then((data) => setCourse(data))
      .catch((err) => console.error('Error fetching course:', err))
  }, [id])

  if (!course) return <p>Loading course details...</p>

  return (
    <div className="wrap">
      <h2 className="course--title">{course.title}</h2>
      <div className="course--description">{course.description}</div>
      <div className="course--materials">{course.materialsNeeded}</div>
      <div className="course--actions">
        <Link className="button" to={`/courses/${id}/update`}>
          Update Course
        </Link>
        <button className="button">Delete Course</button>
      </div>
    </div>
  )
}

export default CourseDetail
