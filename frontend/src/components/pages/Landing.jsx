import React from "react";
import { MessageSquare, Wheat, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "../Header";
import { Footer } from "../Footer";
import heroImg from "../../assets/hero_img.png";

export function Landing() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-100">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            {/* Farmer Illustration */}
            <img
              src={heroImg}
              alt="Farmer Illustration"
              className="mx-auto w-64 h-auto rounded-lg"
            />

            {/* Title */}
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Krishi Shakhi
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Lorem ipsum je tradicionalno uporabljeni kot
            </p>

            {/* Auth Buttons */}

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                to="/signup"
                className="px-8 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Sign up
              </Link>

              <Link
                to="/login"
                className="px-8 py-3 bg-white text-green-600 border-2 border-green-600 rounded-full font-medium hover:bg-green-50 transition-colors shadow-lg hover:shadow-xl"
              >
                Log in
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-b from-green-100 to-lime-200 rounded-3xl p-6 shadow-xl">
              {/* Chat Assistant */}
              <div className="bg-white rounded-2xl p-4 mb-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      Chat Assistant
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Your intelligent companion for farming queries and
                      real-time assistance for better crop management.
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommend Crops */}
              <div className="bg-white rounded-2xl p-4 mb-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Wheat className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      Recommend Crops
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Your intelligent companion for farming queries and
                      real-time assistance for better crop management.
                    </p>
                  </div>
                </div>
              </div>

              {/* Track Progress */}
              <div className="bg-white rounded-2xl p-4 mb-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      Track Progress
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Your intelligent companion for farming queries and
                      real-time assistance for better crop management.
                    </p>
                  </div>
                </div>
              </div>

              {/* Detect Disease */}
              <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      Detect Disease
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Your intelligent companion for farming queries and
                      real-time assistance for better crop management.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
