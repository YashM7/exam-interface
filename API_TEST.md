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

Terminal Output (Success)
```bash
{"message":"User added successfully"}
```

Terminal Output (Email already exists)
```bash
{"conflict":"Email already exists"}
```

Terminal Output (Failure)
```bash
{"error":"Bad Request"}
```



## 3. User Login
**Endpoint:** `POST /login`  
**Description:** User login.  

curl -c cookies.txt -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@example.com",
    "password":"mypassword123"
  }'

Terminal Output (Success)
```bash
{"message":"Login successful"}
```

Terminal Output (Failure)
```bash
{"error":"Invalid email or password"}
```

## 4. Check user authorization
**Endpoint:** `GET /authping`  
**Description:** Verifies that authentication works using the cookie.

curl -b cookies.txt http://localhost:3000/authping

Terminal Output (Success)
```bash
Backend Auth API working
```

Terminal Output (Failure no token)
```bash
{"error":"No token"}
```

Terminal Output (Failure invalid token)
```bash
{"error":"Invalid token"}
```


## 5. Get all questions
**Endpoint:** `GET /questions`  
**Description:** Get all questions with answers from server

curl http://localhost:3000/questions

Terminal Output (Success)
```bash
[
    {
        "_id": "68bd62e6cb815410af2c238d",
        "question": "Which country has the largest population in the world?",
        "options": [
            "India",
            "USA",
            "China",
            "Russia"
        ],
        "answer": 0,
        "__v": 0
    },
    {
        "_id": "68bd62e6cb815410af2c238e",
        "question": "Mount Everest lies on the border of which two countries?",
        "options": [
            "India and Nepal",
            "China and Nepal",
            "India and China",
            "Nepal and Bhutan"
        ],
        "answer": 1,
        "__v": 0
    },
    ...
]
```


## 6. Get 10 random questions
**Endpoint:** `GET /randomQuestions`  
**Description:** Get 10 random questions from server withuot answers

curl http://localhost:3000/randomQuestions

Terminal Output (Success) ⚠️ Output will differ because of randomness.
```bash
[
    {
        "_id": "68bd62e6cb815410af2c23a2",
        "question": "Who painted 'The Starry Night'?",
        "options": [
            "Van Gogh",
            "Picasso",
            "Da Vinci",
            "Michelangelo"
        ]
    },
    {
        "_id": "68bd62e6cb815410af2c23b5",
        "question": "Which metal is liquid at room temperature?",
        "options": [
            "Mercury",
            "Iron",
            "Sodium",
            "Aluminium"
        ]
    },
    ...
]
```


## 7. Start Exam
**Endpoint:** `POST /exam/start`  
**Description:** Starts an exam for the logged-in user.

curl -b cookies.txt -X POST http://localhost:3000/exam/start

Terminal Output (Success will generate unique examId)
```bash
{"examId":"68bdcb3a51d4a71e674b61d0"}
```

Terminal Output (Failure - JWT expired or missing)
```bash
{"error":"Bad Request"}
```



## 8. Get Exam Questions
**Endpoint:** `GET /exam/:examId`  
**Description:** Retrieves questions for the given exam. Replace :examId with the ID from Step 7.

curl -b cookies.txt http://localhost:3000/exam/64f2e2f1a5c9d5e123456789

Terminal Output (Success)
```bash
{
  "questions": [...],
  "expiryTime": "2025-09-07T15:04:05.000Z",
  "submitted": false
}
```

Terminal Output (Failure)
```bash
{"error":"Exam not found"}
```



## 9. Submit Exam
**Endpoint:** `POST /exam/:examId/submit`  
**Description:** Retrieves questions for the given exam.

curl -b cookies.txt -X POST http://localhost:3000/exam/64f2e2f1a5c9d5e123456789/submit \
  -H "Content-Type: application/json" \
  -d '{"answers":[0,2,1,3,2,1,0,3,1,2]}'

Terminal Output (Success, submitted within deadline)
```bash
{message: "Exam submitted successfully", score: obtained score}
```

Terminal Output (Success, late submission, this is only for testing)
```bash
{message: "Exam submission was late. Your score is 0."}
```

Terminal Output (Success, already submitted)
```bash
{message: "Exam already submitted", score: obtained score}
```

Terminal Output (Failure)
```bash
{"error":"Exam not found"}
```



## 10. Get Exam Result
**Endpoint:** `GET /exam/:examId/result`  
**Description:** Retrieves questions for the given exam.

curl -b cookies.txt http://localhost:3000/exam/64f2e2f1a5c9d5e123456789/result


Terminal Output (Success)
```bash
{score: obtained score}
```

Terminal Output (Failure, exam not found)
```bash
{error: "Exam not found}
```

Terminal Output (Failure, exam in progresss)
```bash
{message: "Exam in progress}
```