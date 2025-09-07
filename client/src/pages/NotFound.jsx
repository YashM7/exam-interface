export default function NotFound() {

  const handleClick = () => {
    window.location.href = "/home";
  }

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 rounded-2xl shadow bg-white max-w-xl w-full">
        <h1 className="flex justify-center items-center text-3xl font-bold mb-3">404 Not Found</h1>
        <p className="text-gray-600 mb-6">
          We can't seem to find the page you are looking for.
        </p>
        <div className="flex justify-center items-center">
          <button
            onClick={handleClick}
            className="bg-blue-400 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300"
          >
            Return to home page
          </button>
        </div>
      </div>
    </div>
    </>
  )
}