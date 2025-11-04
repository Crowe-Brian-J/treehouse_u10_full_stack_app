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

/**
 * updateCourse(id, courseData, authUser)
 * - Returns:
 *   - true -> success (204 or 200)
 *   - { errors: [...] } -> validation errors (400)
 *   - { forbidden: true } -> 403
 *   - throw Error -> other unexpected statuses
 */
export const updateCourse = async (id, courseData, authUser) => {
  const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Basic ' + btoa(`${authUser.emailAddress}:${authUser.password}`)
    },
    body: JSON.stringify(courseData)
  })

  if (response.status === 204 || response.status === 200) {
    return true
  }

  if (response.status === 400) {
    const data = await response.json()
    return { errors: data.errors || ['Validation failed'] }
  }

  if (response.status === 403) {
    return { forbidden: true }
  }

  throw new Error(`Unexpected error: ${response.status}`)
}

/**
 * deleteCourse(id, authUser)
 * - Sends DELETE request using Basic Auth from authUser credentials.
 * - Returns:
 *   - true -> success (204 or 200)
 *   - { errors: [...] } -> validation errors (400)
 *   - { forbidden: true } -> 403 (user not authorized to delete)
 *   - throws Error -> unexpected response or network issue
 */

export const deleteCourse = async (id, authUser) => {
  const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization:
        'Basic ' + btoa(`${authUser.emailAddress}:${authUser.password}`)
    }
  })

  if (response.status === 204) {
    return true
  } else if (response.status === 403) {
    throw new Error('Forbidden: You are not allowed to delete this course.')
  } else if (response.status === 404) {
    throw new Error('Course not found.')
  } else {
    throw new Error('An unexpected error occurred.')
  }
}
