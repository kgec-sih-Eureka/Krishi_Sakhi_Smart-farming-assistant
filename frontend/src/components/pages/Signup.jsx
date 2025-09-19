import React, { useState } from "react";
import { Link } from "react-router-dom";
import {BackButton} from "../index";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Here you would typically handle form submission, e.g., send data to backend
    try {
      const res = await axios.post("http://localhost:5000/api/signup", form);
      alert("Form submitted!");
      navigate(`/user/${res.data.id}/home`); // Redirect to home or login page after successful signup
    } catch (err) {
      console.error("Error sending data:", err);
    }
    

  
    
  };

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-950">
        <BackButton />
      <div className="w-full max-w-md bg-white dark:bg-green-900 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-green-800 dark:text-green-100 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-green-800 dark:text-green-200 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-green-300 dark:border-green-700 bg-white dark:bg-green-800 text-green-900 dark:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

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
              type="tel"
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

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-green-800 dark:text-green-200 mb-1"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows="3"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-green-300 dark:border-green-700 bg-white dark:bg-green-800 text-green-900 dark:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
          >
            Sign Up
          </button>
        </form>

        {/* Already have account */}
        <p className="mt-6 text-center text-sm text-green-700 dark:text-green-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-green-600 dark:text-green-400 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}
