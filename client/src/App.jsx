import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import axios from 'axios'
import Exam from './pages/Exam.jsx'
import Result from './pages/Result.jsx'
import Welcome from './pages/Welcome.jsx'
import NotFound from './pages/NotFound.jsx'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_API_BASE_URL;
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/exam/:examId" element={<Exam />} />
      <Route path="/result/:examId" element={<Result />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
