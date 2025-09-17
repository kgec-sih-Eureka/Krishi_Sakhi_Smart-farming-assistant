import React from "react";
import { User, LogIn, Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative">
      <header className="bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                {/* Logo Icon */}
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                {/* Company Name */}
                <span className="ml-3 text-xl font-semibold text-green-900">
                  EcoNature
                </span>
              </div>
            </div>

            {/* Navigation Links (Optional - can be added here) */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a
                  href="#"
                  className="text-green-900 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-green-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Explore
                </a>
                <a
                  href="#"
                  className="text-green-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Conservation
                </a>
                <a
                  href="#"
                  className="text-green-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Login/Signup Section */}
            <div className="flex items-center space-x-4">
              {/* Login Link with Button */}
              <Link to="/login">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-700 bg-white border border-green-300 rounded-md hover:bg-green-50 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors shadow-sm">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </button>
              </Link>

              {/* Signup Link with Button */}
              <Link to="/signup">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-md hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:scale-105 shadow-lg">
                  <User className="w-4 h-4 mr-2" />
                  Join Nature
                </button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-green-600 hover:text-green-700 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 z-50 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile Navigation Links */}
            <a
              href="#"
              className="text-green-900 hover:text-emerald-600 hover:bg-green-100 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-green-700 hover:text-emerald-600 hover:bg-green-100 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Explore
            </a>
            <a
              href="#"
              className="text-green-700 hover:text-emerald-600 hover:bg-green-100 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Conservation
            </a>
            <a
              href="#"
              className="text-green-700 hover:text-emerald-600 hover:bg-green-100 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Contact
            </a>

            {/* Mobile Auth Buttons */}
            <div className="pt-4 pb-3 border-t border-green-200 space-y-3">
              <button className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-green-700 bg-white border border-green-300 rounded-md hover:bg-green-50 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors shadow-sm">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </button>
              <button className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-md hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all shadow-lg">
                <User className="w-4 h-4 mr-2" />
                Join Nature
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
