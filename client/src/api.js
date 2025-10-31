// /client/src/api.js

const API_BASE_URL = 'http://localhost:5000/api'

export const getCourses = async () => {
  const response = await fetch(`${API_BASE_URL}/courses`)
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
  return await response.json()
}

export const getCourseById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/courses/${id}`)
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
  return await response.json()
}

/**
 * createCourse(courseData, authUser)
 * - courseData: { title, description, materialsNeeded, userId }
 * - authUser: the signed-in user object (must contain emailAddress and password)
 *
 * Returns:
 * - true                -> if course created (201)
 * - { errors: [...] }   -> if validation errors (400)
 * - throws Error        -> for other unexpected statuses
 */
export const createCourse = async (courseData, authUser) => {
  const response = await fetch(`${API_BASE_URL}/courses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Basic ' + btoa(`${authUser.emailAddress}:${authUser.password}`)
    },
    body: JSON.stringify(courseData)
  })

  if (response.status === 201) {
    return true
  }

  if (response.status === 400) {
    const data = await response.json()
    return { errors: data.errors || ['Validation failed'] }
  }

  throw new Error(`Unexpected error: ${response.status}`)
}
