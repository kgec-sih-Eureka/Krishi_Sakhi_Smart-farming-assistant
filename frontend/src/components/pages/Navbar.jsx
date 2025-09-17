import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    console.log("User logged out");
    // Add your logout logic here (clear tokens, session, etc.)
    navigate("/login");
  };

  const navLinkClass =
    "block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200";
  const activeClass = "bg-green-600 text-white";
  const inactiveClass = "text-green-700 hover:bg-green-100 dark:text-green-200 dark:hover:bg-green-800";

  return (
    <nav className="bg-white dark:bg-green-900 shadow-md border-b border-green-200 dark:border-green-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-10 rounded-full border border-green-400"
            />
            <span className="text-xl font-bold text-green-700 dark:text-green-200">
              AgroAI
            </span>
          </div>

          {/* Always visible Home */}
          <NavLink
            to="home"
            className={({ isActive }) =>
              `hidden sm:inline-block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive ? activeClass : inactiveClass
              }`
            }
          >
            Home
          </NavLink>

          {/* Desktop Nav Links */}
          <div className="hidden sm:flex items-center space-x-4"
          >
            <NavLink
              to="chatbot"
              className={({ isActive }) =>
                `${navLinkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Chatbot
            </NavLink>
            <NavLink
              to="market"
              className={({ isActive }) =>
                `${navLinkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Market
            </NavLink>
            <NavLink
              to="crop-recommend"
              className={({ isActive }) =>
                `${navLinkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Crop Recommendation
            </NavLink>
            <NavLink
              to="farm"
              className={({ isActive }) =>
                `${navLinkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Farm
            </NavLink>
            <NavLink
              to="disease-detection"
              className={({ isActive }) =>
                `${navLinkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Disease Detection
            </NavLink>
            <NavLink
              to="alerts"
              className={({ isActive }) =>
                `${navLinkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Alerts
            </NavLink>
            <NavLink
              to="community"
              className={({ isActive }) =>
                `${navLinkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Community
            </NavLink>
          </div>

          {/* Logout (desktop) */}
          <div className="hidden sm:block">
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Hamburger (mobile) */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md text-green-700 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-800"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-green-900 border-t border-green-200 dark:border-green-700">
          <NavLink
            to="/dashboard/chatbot"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Chatbot
          </NavLink>
          <NavLink
            to="/dashboard/market"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Market
          </NavLink>
          <NavLink
            to="/dashboard/crop-recommendation"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Crop Recommendation
          </NavLink>
          <NavLink
            to="/dashboard/farm"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Farm
          </NavLink>
          <NavLink
            to="/dashboard/disease-detection"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Disease Detection
          </NavLink>
          <NavLink
            to="/dashboard/alerts"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Alerts
          </NavLink>
          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="w-full text-left px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
