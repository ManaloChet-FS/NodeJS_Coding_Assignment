# NodeJS_Coding_Assignment
An express server with an array that can be viewed and edited using different HTTP methods and routes.

## Methods
- GET (Gets information from the server)
  - localhost:3000/api
  - localhost:3000/api/:id
- PUT (Updates resource or creates resource if resource doesn't exist)
  - localhost:3000/api/:id
- POST (Sends information to the server to be processed)
  - localhost:3000/api/:id
- DELETE (Deletes information from a server)
  - localhost:3000/api/:id

## Dependencies
- Express (required)
- dotenv (required)
- nodemon (optional)

To automatically install required dependencies, use <code>npm install</code> in the terminal. To install dependencies manually, use <code>npm install (dependency name)</code>.


## Run the server
To run the server..
1. Install dependencies as seen above.
2. Create a .env file in the root folder and write <code>PORT=3000</code> in it.
3. Type <code>npm run start</code> or <code>npm run dev</code>, if you installed nodemon, in the terminal.