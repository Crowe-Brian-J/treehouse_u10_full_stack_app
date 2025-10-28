import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCourses } from '../api'

const Courses = () => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    getCourses()
      .then((data) => setCourses(data))
      .catch((err) => console.error('Error fetching courses:', err))
  }, [])

  return (
    <div className="wrap main--grid">
      {courses.map((course) => (
        <Link
          className="course--module course--link"
          to={`/courses/${course.id}`}
          key={course.id}
        >
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{course.title}</h3>
        </Link>
      ))}
      <Link className="course--module course--add--module" to="/courses/create">
        <h2 className="course--add--title">+ New Course</h2>
      </Link>
    </div>
  )
}

export default Courses
