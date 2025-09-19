import React, { useState } from "react";
import { Link } from "react-router-dom";
import {BackButton} from "../index";
import axios from "axios";    

export function Login() {
  const [form, setForm] = useState({
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", form);
      alert("Login successful!");
      window.location.href = `/user/${res.data.id}/home`; // Redirect to user home page after successful login
      
    } catch (err) {
      console.error("Error:", err);
    }
  };


  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-950">
        <BackButton />
      <div className="w-full max-w-md bg-white dark:bg-green-900 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-green-800 dark:text-green-100 mb-6">
          Log In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-green-800 dark:text-green-200 mb-1"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              
              pattern="[0-9]{10}"
              placeholder="Enter 10-digit number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-green-300 dark:border-green-700 bg-white dark:bg-green-800 text-green-900 dark:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-green-800 dark:text-green-200 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-green-300 dark:border-green-700 bg-white dark:bg-green-800 text-green-900 dark:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
          >
            Log In
          </button>
        </form>

        {/* Demo UI Link, to be deleted later */}
        <div>
            <Link
                to= '/user/userId/home'
            >
            Demo UI Link, to be deleted later 
            </Link>
        </div>

        {/* Don't have account */}
        <p className="mt-6 text-center text-sm text-green-700 dark:text-green-300">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-green-600 dark:text-green-400 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}
