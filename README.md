# Full Stack Courses App

## Project Overview
This Full Stack Courses App is a modern web application built with React on the front end and a REST API on the back end. Users can browse courses, view detailed information, create new courses, and manage their own content. The app implements secure user authentication and proper route protection, ensuring only authorized users can create or update their own courses.

## Features
- **User Authentication**: Sign up, sign in, and sign out with secure session handling.
- **Course Management**:
  - Browse all available courses.
  - View course details with markdown-formatted descriptions and materials.
  - Create new courses (authenticated users only).
  - Update or delete courses owned by the user.
- **Protected Routes**: Certain pages are accessible only to authenticated users.
- **Error Handling**:  
  - 404 for missing resources  
  - 403 for forbidden actions  
  - 500 for server errors
- **Responsive Design**: Clean layout optimized for desktop and mobile.

## Technology Stack
- **Frontend**: React, React Router, React Context API  
- **Backend**: REST API (Node.js, Express, Sequelize, PostgreSQL)  
- **Styling**: CSS with modular, reusable classes  
- **Utilities**: `react-markdown` for markdown rendering, `fetch` for API calls

## API Endpoints
- `GET /api/courses` — List all courses  
- `GET /api/courses/:id` — Get details of a specific course  
- `POST /api/courses` — Create a new course (authenticated)  
- `PUT /api/courses/:id` — Update an existing course (authenticated & authorized)  
- `DELETE /api/courses/:id` — Delete a course (authenticated & authorized)  
- `GET /api/users` — Authenticate user credentials

## Notes
- Markdown is used for course descriptions and materials, allowing rich formatting.  
- Authenticated users can only modify or delete courses they own.  
- Errors are handled gracefully, redirecting to appropriate pages for forbidden actions, missing resources, or server issues.

## License
This project is licensed under the MIT License.
