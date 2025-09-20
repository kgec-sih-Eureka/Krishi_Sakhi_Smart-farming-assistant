import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "../Footer";

export function Home() {
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-8">
        Welcome to Krishi Sakhi
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Link
          to="../chatbot"
          className="bg-white shadow-md rounded-xl p-6 text-center text-green-700 font-medium hover:bg-green-50 hover:shadow-lg transition"
        >
          Chatbot
        </Link>

        <Link
          to="../market"
          className="bg-white shadow-md rounded-xl p-6 text-center text-green-700 font-medium hover:bg-green-50 hover:shadow-lg transition"
        >
          Market
        </Link>

        <Link
          to="../crop-recommend"
          className="bg-white shadow-md rounded-xl p-6 text-center text-green-700 font-medium hover:bg-green-50 hover:shadow-lg transition"
        >
          Crop Recommendation
        </Link>

        <Link
          to="../disease-detection"
          className="bg-white shadow-md rounded-xl p-6 text-center text-green-700 font-medium hover:bg-green-50 hover:shadow-lg transition"
        >
          Disease Detection
        </Link>

        <Link
          to="../farm"
          className="bg-white shadow-md rounded-xl p-6 text-center text-green-700 font-medium hover:bg-green-50 hover:shadow-lg transition"
        >
          Farm
        </Link>
        <Link
          to="../community"
          className="bg-white shadow-md rounded-xl p-6 text-center text-green-700 font-medium hover:bg-green-50 hover:shadow-lg transition"
        >
          Community
        </Link>
      </div>
    </div>
    <Footer />
    </>
  );
}
