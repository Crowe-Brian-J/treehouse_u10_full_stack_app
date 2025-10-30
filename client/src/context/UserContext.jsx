import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    // Initialize from localStorage if available
    const storedUser = localStorage.getItem('authUser')
    return storedUser ? JSON.parse(storedUser) : null
  })

  // Persist to localStorage whenever authUser changes
  useEffect(() => {
    if (authUser) {
      localStorage.setItem('authUser', JSON.stringify(authUser))
    } else {
      localStorage.removeItem('authUser')
    }
  })

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
        setAuthUser({ ...user, password })
        console.log('✅ Sign-in successful:', user)
        return user
      } else if (response.status === 401) {
        console.log('❌ Sign-in failed: Unauthorized')
        return null
      } else {
        throw new Error(`Unexpected response: ${response.status}`)
      }
    } catch (error) {
      console.error('Error during signIn:', error)
      throw error
    }
  }

  // Sign out function
  const signOut = () => {
    setAuthUser(null)
  }

  const contextValue = {
    authUser,
    signIn,
    signOut
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}
