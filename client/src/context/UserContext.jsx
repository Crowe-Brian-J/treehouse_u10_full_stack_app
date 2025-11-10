// /client/src/context/UserContext.js

import { createContext } from 'react'

// Create a context for the authenticated user
// This is just the context object; no components are exported here
const UserContext = createContext(null)

export default UserContext
