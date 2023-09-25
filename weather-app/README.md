# 🌤️ Weather App 🌦️
🌦️ Weather App is a web application that provides weather information for cities around the world. 
- Users can sign up with their email address or log in with their Google account. Upon their first login, 
- the application shows the weather information for their location. 
- Users can search for and add cities to their favorites list. 
- The list is displayed in the sidebar along with the weather information for each city. 
- If the screen size is small, users can access the sidebar through the hamburger menu. 
- The weather data is obtained from the openweatherapp.org API. 
- The application changes its theme/background image according to the weather. This is achieved using useContext.


# 🔧 Technologies Used
🔧 `React JS` library was used for building the front-end of the application. Functional components were used with React Hooks such as useEffect, useCallback, useState, and useContext.

🔧  `Node JS` and `Express JS` were used for the back-end of the application.

🔧 `Bootstrap` for the responsive layout and styling of the application

🔧 `React Icons` for adding custom icons

🔧 `Passport.js and passport-google-oauth20` for authentication with Google accounts

🔧 `Bcrypt` for password encryption

🔧 `JWT - JSON Web Tokens` for authorization and authentication

🔧 `Axios` for making HTTP requests for login.`

🔧 `SendGrid`  for email delivery when user chooses to reset his/her password.`

# 🚀 Features
- User authentication and authorization using email and Google sign-in.
- User can  reset password through email using SendGrid's email delivery platform with accessToken delivered by email .
- Weather data fetched from OpenWeather API.
- Automatic location detection on first login.
- Ability to search for cities and add them to favorites.
- Sidebar displays current weather for favorite cities.
- Background images change based on current weather.
- Responsive design with hamburger menu for smaller screens.

# 🚀 Getting Started
To run the app, you will need to have Node.js and npm installed on your machine.

- Clone the repository.
- Install dependencies with npm install.
- Create a .env file with the following variables:

```
REACT_APP_URL=http://localhost:3005
```

- Run the app with npm start.
- Visit http://localhost:3005 in your browser.
- Dont forget to change scripts start  in package.json file  into "react-scripts start"  when using locally.
