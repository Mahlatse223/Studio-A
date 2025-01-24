'use client';

import { useState } from "react";
import Link from "next/link";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    unit: "",
    password: "",
    role: "RESIDENT", // Default to Resident
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Handle successful registration, e.g., redirect to login page
      window.location.href = "/sign-in"; // redirect to sign-in page
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
          Sign up
        </h2>
        <p className="text-white">Welcome to Studio Apartments</p>

        {error && <div className="text-red-500">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              name="name"
              placeholder="Enter Full name"
              className="w-full h-full p-2 rounded-md bg-transparent border border-gray-300 text-white focus:outline-none focus:ring-1 focus:ring-blue-50"
            />
          </div>
 

          <div>
            <input
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              name="email"
              placeholder="Enter Email"
              className="w-full h-full p-2 rounded-md bg-transparent border border-gray-300 text-white focus:outline-none focus:ring-1 focus:ring-blue-50"
            />
          </div>

          <div>
            <input
              type="text"
              value={formData.unit}
              onChange={handleChange}
              required
              name="unit"
              placeholder="Unit Number"
              className="w-full h-full p-2 rounded-md bg-transparent border border-gray-300 text-white focus:outline-none focus:ring-1 focus:ring-blue-50"
            />
          </div>

          <div>
            <input
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              name="password"
              placeholder="Password"
              className="w-full h-full p-2 rounded-md bg-transparent border border-gray-300 text-white focus:outline-none focus:ring-1 focus:ring-blue-50"
            />
          </div>

          {/* Role Dropdown */}
          <div>
               <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md bg-transparent border-2 border-white text-white focus:outline-none focus:ring-1 focus:ring-blue-50">
              <option value="RESIDENT" className="bg-slate-400 text-white">Resident</option>
              <option value="MANAGER" className="bg-slate-400 text-white">Manager</option>
              <option value="STAFF" className="bg-slate-400 text-white">Staff</option>
              </select>
          </div>

          <div className="flex justify-center">
            <p className="text-white text-sm">
              Already have an account?{" "}
              <Link href="/sign-in">Sign in</Link>
            </p>
          </div>

          <button
            type="submit"
            className="w-full h-full p-2 rounded-md bg-black border border-black text-white"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
