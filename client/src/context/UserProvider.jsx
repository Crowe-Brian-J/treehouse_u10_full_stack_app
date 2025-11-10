// /client/src/context/UserProvider.jsx

import { useState, useEffect } from 'react'
import UserContext from './UserContext'

const UserProvider = ({ children }) => {
  // Local state for the authenticated user
  const [authUser, setAuthUser] = useState(() => {
    // Initialize from localStorage if available
    const storedUser = localStorage.getItem('authUser')
    return storedUser ? JSON.parse(storedUser) : null
  })

  // Persist authUser state to localStorage whenever it changes
  useEffect(() => {
    if (authUser) {
      localStorage.setItem('authUser', JSON.stringify(authUser))
    } else {
      localStorage.removeItem('authUser')
    }
  }, [authUser])

  /**
   * Sign in function: fetches user from API using Basic Auth
   * @param {string} emailAddress
   * @param {string} password
   * @returns user object if successful, null if unauthorized
   */
  const signIn = async (emailAddress, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'GET',
        headers: {
          Authorization: 'Basic ' + btoa(`${emailAddress}:${password}`)
        }
      })

      if (response.status === 200) {
        const user = await response.json()
        setAuthUser({ ...user, password }) // store user in state
        return user
      } else if (response.status === 401) {
        return null
      } else {
        throw new Error(`Unexpected response: ${response.status}`)
      }
    } catch (error) {
      console.error('Error during signIn:', error)
      throw error
    }
  }

  /**
   * Sign out function: clears the authenticated user
   */
  const signOut = () => {
    setAuthUser(null)
  }

  // Context value provided to all consuming components
  const contextValue = {
    authUser,
    signIn,
    signOut
  }

  // Provide the context to children components
  // ✅ Make sure `value` prop is always defined
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}

export default UserProvider
