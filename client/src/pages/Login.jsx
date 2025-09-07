import { useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Login() {
      
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', data);
      if(response.status === 200) {
        window.location.href = '/home'
      }
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Invalid email or password");
      setData({...data, password: ''})
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form className="space-y-4" onSubmit={loginUser}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter your email"
              value={data.email}
              onChange={(e) => setData({...data, email: e.target.value})}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) => setData({...data, password: e.target.value})}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <br />
        <p className="block text-sm font-medium text-gray-700">
          Don't have an account? {""}
          <Link 
            to="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
