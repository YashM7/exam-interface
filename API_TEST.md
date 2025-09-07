# API Testing Guide (cURL)

This document explains how to test the APIs of this project using `curl`.

> ⚠️ Make sure your backend server is running at `http://localhost:3000` with .env file configured and questions added to the backend server.

---


## 1. Test Backend
**Endpoint:** `GET /ping`  
**Description:** Backend status check  

curl http://localhost:3000/ping

Terminal Output

```bash
Backend API working
```


## 2. User Signup
**Endpoint:** `POST /signup`  
**Description:** Register a new user.  

curl -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "mypassword123"
  }'



## 3. User Login
**Endpoint:** `POST /login`  
**Description:** User login.  

curl -c cookies.txt -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@example.com",
    "password":"mypassword123"
  }'


## 4. Check user authorization
**Endpoint:** `GET /authping`  
**Description:** Verifies that authentication works using the cookie.

curl -b cookies.txt http://localhost:3000/authping


## 5. Get all questions
**Endpoint:** `GET /questions`  
**Description:** Get all questions with answers from server

curl http://localhost:3000/questions



## 6. Get 10 random questions
**Endpoint:** `GET /randomQuestions`  
**Description:** Get 10 random questions from server withuot answers

curl http://localhost:3000/randomQuestions


## 7. Start Exam
**Endpoint:** `POST /exam/start`  
**Description:** Starts an exam for the logged-in user.

curl -b cookies.txt -X POST http://localhost:3000/exam/start



## 8. Get Exam Questions
**Endpoint:** `GET /exam/:examId`  
**Description:** Retrieves questions for the given exam.

curl -b cookies.txt http://localhost:3000/exam/64f2e2f1a5c9d5e123456789



## 9. Submit Exam
**Endpoint:** `POST /exam/:examId/submit`  
**Description:** Retrieves questions for the given exam.

curl -b cookies.txt -X POST http://localhost:3000/exam/64f2e2f1a5c9d5e123456789/submit \
  -H "Content-Type: application/json" \
  -d '{"answers":[0,2,1,3,2,1,0,3,1,2]}'



## 10. Get Exam Result
**Endpoint:** `GET /exam/:examId/result`  
**Description:** Retrieves questions for the given exam.

curl -b cookies.txt http://localhost:3000/exam/64f2e2f1a5c9d5e123456789/result


