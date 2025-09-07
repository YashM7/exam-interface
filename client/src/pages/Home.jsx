import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export default function Home() {

  const navigate = useNavigate();

  const handleStartExam = async () => {
    try {
      const res = await axios.post("/exam/start", {}, {withCredentials: true});
      navigate(`/exam/${res.data.examId}`);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        console.log(400000)
        toast.error("User authorization failed, please login again");
        setTimeout(() => {
          window.location.href = "/login"
        }, 3000)
      }
      else {
        console.error("Unexpected error", error);
      }
    }
  }

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 rounded-2xl shadow bg-white max-w-xl w-full">
        <h1 className="flex justify-center items-center text-3xl font-bold mb-3">Home Page</h1>
        <p className="text-gray-600 mb-6">
          The assesment consists of 10 MCQ questions.
          The time alloted for this exam is 10 minutes.
        </p>
        <div className="flex justify-center items-center">
          {/* {status} */}
          <button
            onClick={handleStartExam}
            className="bg-blue-400 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300"
          >
            Start Exam
          </button>
        </div>
      </div>
    </div>
    </>
  )
}
