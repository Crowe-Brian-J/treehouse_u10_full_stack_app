import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getCourses } from './api'

// Components
import Header from './components/Header'

// Placeholder
const Courses = () => <h2>Courses Page (will list courses here)</h2>

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
      </Routes>
    </div>
  )
}

export default App
