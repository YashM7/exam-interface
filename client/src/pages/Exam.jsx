import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Exam() {
  const { examId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [expiryTime, setExpiryTime] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await axios.get(`/exam/${examId}`);

        if(res.data.submitted === true) {
          window.location.href = `/result/${examId}`;
        }

        setQuestions(res.data.questions);
        setExpiryTime(res.data.expiryTime);

        setAnswers(Array(res.data.questions.length).fill(-1));
        setTimeLeft(
          Math.floor((new Date(res.data.expiryTime).getTime() - Date.now()) / 1000)
        );
      } catch (error) {
        console.error("Error fetching questions:", error);
        if (error.response?.status === 404 || error.response?.status === 500) {
          window.location.href = "/NotFound"
        }
      }
    };
    getQuestions();
  }, [examId]);

  // Countdown timer
  useEffect(() => {
    if (!expiryTime || timeLeft <= 0) {
      if (expiryTime && timeLeft <= 0) {
        handleSubmit();
      }
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, expiryTime]);

  const handleOptionSelect = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = index;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`/exam/${examId}/submit`, { answers }, { withCredentials: true });
      window.location.href = `/result/${examId}`;
    } catch (error) {
      console.log(error);
    }
  };

  if (questions.length === 0 || expiryTime === null) {
    return <p>Loading exam...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold">Exam</h2>
        <p>
          Time remaining: {Math.floor(timeLeft / 60)}:
          {String(timeLeft % 60).padStart(2, "0")}
        </p>
      </div>

      <p className="mb-2 font-medium">
        Question {currentIndex + 1} of {questions.length}
      </p>

      <p className="mb-4">{currentQuestion.question}</p>

      <div className="space-y-2">
        {currentQuestion.options.map((option, index) => (
          <label
            key={index}
            className="block border p-2 rounded cursor-pointer hover:bg-gray-100"
          >
            <input
              type="radio"
              name={currentQuestion.question}
              value={index}
              checked={answers[currentIndex] === index}
              onChange={() => handleOptionSelect(index)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentIndex((i) => i - 1)}
          disabled={currentIndex === 0}
        >
          Previous
        </button>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={() => setCurrentIndex((i) => i + 1)}
          disabled={currentIndex === questions.length - 1}
        >
          Next
        </button>
      </div>
      <div className="flex justify-center">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
