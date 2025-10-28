import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getCourses } from './api'

// Components
import Header from './components/Header'
import Courses from './components/Courses'
import CourseDetail from './components/CourseDetail'

const App = () => {
  useEffect(() => {
    getCourses()
      .then((data) => console.log('Courses:', data))
      .catch((err) => console.error('Error fetching courses:', err))
  }, [])

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
      </Routes>
    </div>
  )
}

export default App
