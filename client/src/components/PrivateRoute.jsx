// /client/src/components/PrivateRoute.jsx
import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import UserContext from '../context/UserContext'

/**
 * PrivateRoute
 * - Restricts access to authenticated users only.
 * - If user is not signed in, redirect to /signin.
 * - Otherwise, render the child component normally.
 */
const PrivateRoute = ({ children }) => {
  const { authUser } = useContext(UserContext)
  const location = useLocation()

  if (!authUser) {
    // Redirect to sign-in and remember where they tried to go
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />
  }

  // If signed in, show the page
  return children
}

export default PrivateRoute
