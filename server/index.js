import express  from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config'
import { User } from "./models/userModel.js";
import { Question } from "./models/questionModel.js";
import { Exam } from "./models/examModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

// Middleware for parsing request body
app.use(express.json());


// Middleware for cookie
app.use(cookieParser());


// Middleware for CORS POLICY
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
  })
)


// Middleware for authentication
function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}


// Backend Server start
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));


// MongoDB connection
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('MongoDB database connected'))
.catch((err) => console.log('Connection error', err));


// API endpoint to test server status
app.get('/ping', (req, res) => {
  return res.status(200).send('Backend API working')
})



// API endpoint to test server status with cookie
app.get('/authping', authMiddleware, (req, res) => {
  return res.status(200).send('Backend Auth API working')
})



// API endpoint to register user
app.post('/signup', async(req, res) => {
  try {
    const emailInput = req.body.email;
    const passwordInput = req.body.password;

    const exist = await User.findOne({email: emailInput});
    if(exist) {
      return res.status(409).send({ conflict: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(passwordInput, 10);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword
    })

    await newUser.save();

    const token = jwt.sign(
      {id: newUser._id, email: newUser.email},
      process.env.JWT_SECRET,
      { expiresIn: "3600000" }
    )

    res.cookie("token", token , {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000 
    });

    return res.status(201).send({message: "User added successfully"});
  } catch (error) {
    console.log(error);
    return res.status(400).send({error: "Bad Request"})
  }
})


// API endpoint for user login
app.post('/login', async(req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({email: email});
    if(!user) {
      return res.status(400).send({error: "Invalid email or password"})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return res.status(400).send({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      {id: user._id, email: user.email},
      process.env.JWT_SECRET,
      { expiresIn: "3600000" }
    );

    res.cookie("token", token , {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000
    });

    return res.status(200).send({message: "Login successful"});

  } catch (error) {
    console.log(error);
    return res.status(500).send({error: "Internal Server error"})
  }
})


// API endpoint to get all questions with answers
// not needed for the app but created for testing purpose
app.get("/questions", async(req, res) => {
  try {
    const questions = await Question.find({});
    return res.status(200).send(questions);
  } catch (error) {
    return res.status(200).send({message: err.message});
  }
})


// API endpoint to get 10 random questions without answers
// not needed for the app but created for testing purpose
app.get("/randomQuestions", async (req, res) => {
  try {
    const questions = await Question.aggregate([
      {$sample: {size: 10}}
    ]);

    const randomQuestions = questions.map(q => ({
      _id: q._id,
      question: q.question,
      options: q.options
    }));

    return res.status(200).status(200).send(randomQuestions);

  } catch (error) {
    return res.send(500).send({ error });
  }
})


// API endpoint to start exam for the authenticated logged in user
app.post("/exam/start", authMiddleware, async(req,res) => {
  try {
    const examQuestions = await Question.aggregate([
      {$sample: {size: 10}}
    ]);

    const examExpiryTime = new Date(Date.now() + 1 * 60 * 1000);
    const newExam = new Exam({
      userId: req.user.id,
      questions: examQuestions,
      expiryTime: examExpiryTime
    })

    await newExam.save();
    return res.status(201).send({ examId: newExam._id })

  } catch (error) {
    console.log(error)
    return res.status(400).send({error: "Bad Request"});
  }
})



// API endpoint to get exam questions for authenticated logged in user
app.get("/exam/:examId", authMiddleware, async (req, res) => {
  const { examId } = req.params;
  const exam = await Exam.findById(examId);

  if(!exam) {
    return res.status(404).send({message: "Exam not found"});
  }
  const finalQuestions = exam.questions.map(q => ({
    _id: q._id,
      question: q.question,
      options: q.options
  }));

  return res.status(200).send({
      questions: finalQuestions,
      expiryTime: exam.expiryTime,
      submitted: exam.submitted
    })
})




// API endpoint to submit exam for the authenticated logged in user
app.post("/exam/:examId/submit", authMiddleware, async (req, res) => {
  try {
    const { examId } = req.params;
    const { answers } = req.body;

    const exam = await Exam.findById(examId);

    if(exam.submitted === true) {
      return res.status(200).send({message: "Exam already submitted", score: exam.score});
    }

    if(Date.now() <= exam.expiryTime.getTime() + 5000) {

      let score = 0;
      for(var i = 0; i < exam.questions.length ; i++) {
        if(answers[i] === -1) {
          continue;
        }
        if(answers[i] === exam.questions[i].answer) {
          score++;
        }
      }

      exam.submitted = true;
      exam.score = score;
      await exam.save();

      return res.status(200).send({message: "Exam submitted successfully", score: score});
    }
    // else block is mostly for testing
    // since the frontend auto-submits on time
    else {
      exam.submitted = true;
      await exam.save();
      return res.status(200).send({message: "Exam submission was late. Your score is 0."});
    }

  } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "Exam not found" });
  }
})



// API endpoint to get test results for authenticated logged in user
app.get("/exam/:examId/result", authMiddleware, async (req, res) => {
  const { examId } = req.params;
  const exam = await Exam.findById(examId);

  if(!exam) {
    return res.status(404).send({error: "Exam not found"});
  }

  if(exam.submitted === false) {
    if(new Date(Date.now()) > exam.expiryTime) {
      console.log("Exam expired");
      exam.submitted = true;
      await exam.save();
      return res.status(200).send({score: exam.score});
    }

    return res.status(404).send({message: "Exam in progress"});
  }
  return res.status(200).send({score: exam.score});
})