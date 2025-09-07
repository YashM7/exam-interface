# MERN Exam App


Technology Stack

Option 1:
- Frontend: React.js + Vite + Tailwind CSS
- Backend: Node.js with Express.js
- Database: MongoDB

## 📋 Requirements

Before running the app, make sure you have installed:

- [Node.js](https://nodejs.org/) (v16 or later recommended)  
- [npm](https://www.npmjs.com/) 
- [MongoDB](https://www.mongodb.com/) (cloud MongoDB Atlas)  
- Git (to clone the repository)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YashM7/exam-interface.git
cd exam-interface

### 2. Backend setup (server)

cd server       -> Go to the server directory
npm install     -> Install all required dependencies

Create a .env file inside server/       -> create .env file and add these 3 values
MONGODB_URL=mongodb+srv://<db_username>:<db_password>@cluster0.loyvej0.mongodb.net/?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your jwt secret phrase

replace db_usename and db_password with your mongoDB atlas username and password
no need to change FRONTEND_URL if you are running locally
assign JWT_SECRET with a 64 characters long hexadecimal like 4d781bf758a399e9d532c987f29c1bfff4123ac2e6907b7293e604e74220f182

node seedQuestions.js       -> This will populate server with questions
nodemon index.js            -> This will start the server


### 3. Frontend setup (client)

keep the backend server running and open a new terminal
cd exam-interface/client           -> Go to the client directory
npm install                        -> Install all required dependencies

Create a .env file inside client/       -> create .env file and add the following value
VITE_BACKEND_API_BASE_URL="http://localhost:3000"
npm run dev                             -> This will start the client
open your browser and head to http://localhost:5173/
```

## 📌 API Testing

For detailed API testing instructions, see [API_TEST.md](./API_TEST.md)