// /client/src/App.jsx

import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getCourses } from './api'

// Components
import Header from './components/Header'
import Courses from './components/Courses'
import CourseDetail from './components/CourseDetail'
import UserSignIn from './components/UserSignIn'
import UserSignUp from './components/UserSignUp'
import PrivateRoute from './components/PrivateRoute'
import CreateCourse from './components/CreateCourse'
import UpdateCourse from './components/UpdateCourse'
import NotFound from './components/NotFound'
import Forbidden from './components/Forbidden'
import UnhandledError from './components/UnhandledError'

// Context
import UserProvider from './context/UserProvider'

const App = () => {
  useEffect(() => {
    getCourses()
      .then((data) => console.log('Courses:', data))
      .catch((err) => console.error('Error fetching courses:', err))
  }, [])

  return (
    <UserProvider>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />

          {/* Protected Routes */}
          <Route
            path="/courses/create"
            element={
              <PrivateRoute>
                <CreateCourse />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses/:id/update"
            element={
              <PrivateRoute>
                <UpdateCourse />
              </PrivateRoute>
            }
          />

          {/* Public Routes */}
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/error" element={<UnhandledError />} />

          {/* Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </UserProvider>
  )
}

export default App
