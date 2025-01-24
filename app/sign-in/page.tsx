"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

// Define the response structure
interface LoginResponse {
  token: string;
}

const Signin = () => {
  const [isMounted, setIsMounted] = useState(false); // State to track client-side mounting
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [role, setRole] = useState<string>("RESIDENT"); // State for user role (Resident, Manager, Staff)
  const [errorMessage, setErrorMessage] = useState(""); // For showing error messages
  const router = useRouter(); // Initialize the router

  // Ensure that the component is mounted in the client-side environment
  useEffect(() => {
    setIsMounted(true); // Set mounted to true when the component is mounted
  }, []);

  // Handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // Send login request to the backend API and type the response
      const response = await axios.post<LoginResponse>("/api/login", { email, password,role });
  
      // Log the response to the console for debugging
      console.log(response);
  
      // If login is successful, store the token and redirect
      if (response.status === 200) {
        // Store JWT in localStorage
        localStorage.setItem("authToken", response.data.token);
  
        // Redirect based on selected role
        if (role === "RESIDENT") {
          router.push("/page"); // Redirect to the page for residents
        } else if (role === "MANAGER") {
          router.push("/dashboard"); // Redirect to the manager's dashboard
        } else if (role === "STAFF") {
          router.push("/dashboard"); // Redirect to the staff's dashboard
        }
      }
    } catch (error) {
      // Handle error (invalid email/password)
      console.error(error); // Log the error for debugging
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  // Prevent rendering when not mounted yet (to avoid issues with SSR in Next.js)
  if (!isMounted) {
    return null; // You can return a loading spinner or null until mounted
  }

  return (
    <section
      className="p-6 flex items-center justify-center min-h-screen relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle, rgba(14, 6, 41, 1) 0%, rgba(65, 9, 121, 1) 51%, rgba(0, 0, 0, 1) 100%)",
      }}
    >
      <div className="items-center space-y-4 p-10 w-[400px] rounded-lg bg-black bg-opacity-10 backdrop-blur-md border border-white border-opacity-20">
        <h2 className="text-3xl font-bold text-white flex justify-center items-center">
          Sign in
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              name="email"
              placeholder="Enter Email"
              className="w-full h-full p-2 rounded-md bg-transparent border border-gray-300 text-white focus:outline-none focus:ring-1 focus:ring-blue-50"
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              name="password"
              placeholder="Enter Password"
              className="w-full h-full p-2 rounded-md bg-transparent border border-gray-300 text-white focus:outline-none focus:ring-1 focus:ring-blue-50"
            />
          </div>

          {/* Role Selection */}
          <div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)} // Set role based on selection
              required
              className="w-full p-2 rounded-md bg-transparent border-2 border-white text-white focus:outline-none focus:ring-1 focus:ring-blue-50"
            >
              <option value="RESIDENT" className="bg-slate-400 text-white">Resident</option>
              <option value="MANAGER" className="bg-slate-400 text-white">Manager</option>
              <option value="STAFF" className="bg-slate-400 text-white">Staff</option>
            </select>
          </div>

          {/* Error message */}
          {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>}

          <div className="flex justify-center">
            <p className="text-white text-sm">
              Already have an account?{" "}
              <Link href="/sign-in">Sign in</Link>
            </p>
          </div>

          {/* Link to registration page */}
          <div className="flex justify-center">
            <p className="text-white text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-500 hover:text-blue-700">
                Sign up
              </Link>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-full p-2 rounded-md bg-black border border-black text-white"
          >
            Sign in
          </button>
        </form>
      </div>
    </section>
  );
};

export default Signin;
