export default function Welcome() {

  const handleStartExam = async () => {
    window.location.href = "/signup"
  }

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 rounded-2xl shadow bg-white max-w-xl w-full">
        <h1 className="flex justify-center items-center text-3xl font-bold mb-3">Welcome Page</h1>
        <p className="text-gray-600 mb-6">
          Welcome to LeadMasters online assesment. To start the test signup with your account.
        </p>
        <div className="flex justify-center items-center">
          {/* {status} */}
          <button
            onClick={handleStartExam}
            className="bg-blue-400 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
    </>
  )
}
