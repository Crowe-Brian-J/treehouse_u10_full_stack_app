# React Project
## Meets Expectations
---

[X] - Project set up using vite
[X] - There is a .gitignore file present in the root of the project repository and no node_modules are present
[X] - React project's folder is named 'client'
[X] - Running 'npm run dev' launches the app

---
# REST API
## Meets Expectations
---

[X] - REST API project's folder is named api
[X] - Rest API has been updated with support for CORS

---
# Course Components
## Meets Expectations
---

[X] - 'Courses' - The component retrieves a list of courses from the REST API, renders a list of courses, linkes each course to its respective 'Course Detail' screen, and renders a link to the 'Create Course' screen
[X] - 'CourseDetail' - The component retrieves the detail for a course from the REST API, renders the course details, an 'Update Course' link for navigating to the 'Update Course' screen and a 'Delete Course' button that when clicked sends a Delete Request to a delete a course
[X] - 'CreateCourse' - The component renders a form allowing a user to create a new course, a 'Create Course' button that when clicked sends a POST request to the REST API's /api/courses route, and a 'Cancel' button that returns the user to the default route
[X] - 'UpdateCourse' - The component renders a form allowing a user to update one of their existing courses, an 'Update Course' button that when clicked, sends a PUT request to the REST API's /api/courses/:id route, and a 'Cancel' button that returns the user to the 'Course Detail' screen

---
## Exceeds Expectations
---

[X] - The 'UpdateCourse' component redirects to the /notfound path if the requested course isn't returned from the REST API
[X] - The 'UpdateCourse' component redirects users to the /forbidden path if the requested course isn't owned by the authenticated user
[X] - Components redirect users to the /error path when requests to the REST API return a '500 Internal Server Error' HTTP status code

---
# Auth Components
## Meets Expectations
---

[X] - 'Header' - The component renders the top menu bar and buttons for signing in and signing up (if there's not an authenticated user) or the user's name and a button for signing out (if there's an authenticated user)
[X] - 'UserSignIn' - The component renders a form allowing the user to sign in using their existing account information, a "Sign In" button that when clicked signs in the user, and a "Cancel" button that returns the user to the default route (i.e. the list of courses)
[X] - 'UserSignUp' - The component renders a form allowing a user to sign up by creating a new account, a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user, and a "Cancel" button that returns the user to the default route (i.e. the list of courses)

---
## Exceeds Expectations
---

[X] - The component renders a form allowing a user to sign up by creating a new account, a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user, and a "Cancel" button that returns the user to the default route (i.e. the list of courses)
[X] - Components redirect users to the /error path when requests to the REST API return a "500 Internal Server Error" HTTP status code.

---
# Routes
## Meets Expectations
---

[X] - The react-router-dom npm package is installed and listed as a dependency in the package.json file
[X] - Clicking a link navigates the user to the correct route and displays the appropriate info.
[X] - The current route is always reflected in the URL
[X] - The following routes are configured (listed in the format path - component):
  - [X] - / - Courses
  - [X] - /courses/create - CreateCourse
  - [X] - /courses/:id/update - UpdateCourse
  - [X] - /courses/:id - CourseDetail
  - [X] - /signin - UserSignIn
  - [X] - /signup - UserSignUp

---
## Exceeds Expectations
---

[X] - The following routes and components are configured (listed in the format path - component):
  - [X] - /notfound - NotFound - Renders a message letting the user know that the requested page can't be found
  - [X] - /forbidden - Forbidden - Renders a message letting the user know that they can't access the requested page
  - [X] - /error - UnhandledError - Renders a message letting the user know that an unexpected error has occurred

[X] - React Router is configured so that if a route isn't matched the NotFound component is rendered

---
# User Authentication
## Meets Expectations
---
[X] - The app's global state is kept in the App component or managed using the React Context API
[X] - A signIn() method is globally available that:
  - [X] - Authenticates a user using their email address and password
  - [X] - Persists the authenticated user's information (including their password) in the global state

[X] - A signOut() method is globally available that removes the authenticated user's information (including their password) from the global state.

---
## Exceeds Expectations
---

[X] - The app persists user credentials using an HTTP cookie or local storage so that the user's authenticated state is maintained even if the application is reloaded or loaded into a new browser tab.

---
# Protected Routes
## Meets Expectations
---

[X] - The app contains a higher-order component (HOC) named PrivateRoute that is used to configure protected routes (i.e. routes that require authentication)
[X] - The following routes are configured using the PrivateRoute component:
  - [X] - /courses/create
  - [X] - /courses/:id/update

---
# User Authorization
## Meets Expectations
---

[X] - The CourseDetail component only renders the "Update Course" and "Delete Course" buttons if:
  - [X] - There's an authenticated user
  - [X] - The authenticated user's ID matches that of the user who owns the course

---
# User Experience and Design
## Meets Expectations
---

[X] - The "Sign Up", "Create Course", and "Update Course" screens display validation errors returned from the REST API
[X] - The "Course Detail" screen renders the course description and materialsNeeded properties as markdown formatted text
[X] - Provided HTML and CSS is used and the important aspects of the app generally resemble the mockups

---
# Best Practice
## Meets Expectations
---

[] - Code is free of syntax errors
[] - No warnings or errors about unused/missing assets when running the linter (to test, run 'npm run lint' in the terminal)
[] - Detailed code comments explaining how your functions work

---

[X] Check App.jsx
[X] Check UserProvider.jsx
[X] Check UserContext.jsx
