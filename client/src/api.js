// /client/src/api.js

const API_BASE_URL = 'http://localhost:5000/api'

// Helper: Handle all HTTP responses
const handleResponse = async (response) => {
  const status = response.status

  // Success
  if (status === 200 || status === 201 || status === 204) return true

  // Validation errors
  if (status === 400) {
    const data = await response.json().catch(() => ({}))
    return { errors: data.errors || ['Validation failed.'] }
  }

  // Forbidden
  if (status === 403) return { forbidden: true }

  // Not Found
  if (status === 404) return { notFound: true }

  // Anything else is considered server error
  throw new Error(`Unexpected server response: ${status}`)
}

// --- Courses API ---

/**
 * getCourses()
 * - Returns a list of all courses or { error } for server issues.
 */
export const getCourses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses`)
    if (!response.ok) return handleResponse(response)
    return await response.json()
  } catch {
    throw new Error('Network or server error')
  }
}

/**
 * getCourseById(id)
 * - Returns course data or structured error object.
 */
export const getCourseById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`)
    if (!response.ok) return handleResponse(response)
    return await response.json()
  } catch {
    throw new Error('Network or server error')
  }
}

/**
 * createCourse(courseData, authUser)
 * - Returns:
 *   - true → success (201)
 *   - { errors: [...] } → validation errors (400)
 *   - { forbidden: true } → 403
 *   - { error: ... } → 500 or other
 */
export const createCourse = async (courseData, authUser) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' + btoa(`${authUser.emailAddress}:${authUser.password}`)
      },
      body: JSON.stringify(courseData)
    })
    return handleResponse(response)
  } catch {
    throw new Error('Network or server error')
  }
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
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' + btoa(`${authUser.emailAddress}:${authUser.password}`)
      },
      body: JSON.stringify(courseData)
    })
    return handleResponse(response)
  } catch {
    throw new Error('Network or server error')
  }
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
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization:
          'Basic ' + btoa(`${authUser.emailAddress}:${authUser.password}`)
      }
    })
    return handleResponse(response)
  } catch {
    throw new Error('Network or server error')
  }
}
