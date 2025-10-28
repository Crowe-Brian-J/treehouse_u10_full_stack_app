import { useEffect } from 'react'
import { getCourses } from './api'

import Header from './components/Header'

const App = () => {
  useEffect(() => {
    getCourses()
      .then((data) => console.log('Courses:', data))
      .catch((err) => console.error('Error fetching courses:', err))
  }, [])

  return (
    <div>
      <Header />
      <h1>Course Directory</h1>
    </div>
  )
}

export default App
