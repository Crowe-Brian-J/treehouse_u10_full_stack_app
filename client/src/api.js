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
