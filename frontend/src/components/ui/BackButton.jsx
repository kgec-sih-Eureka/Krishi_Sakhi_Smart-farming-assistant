import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function BackButton({ fallback = "/", absolute = true, className = "" }) {
  const navigate = useNavigate();

  const handleBack = () => {
    // If there's a previous history entry, go back. Otherwise go to fallback route.
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  // Position fixed in top-left by default; remove by passing absolute={false}.
  const base = "inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-green-400";
  const theme = "bg-white text-green-700 hover:bg-green-50 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800";
  const pos = absolute ? "fixed top-4 left-4 z-50" : "";

  return (
    <button
      onClick={handleBack}
      aria-label="Go back"
      className={`${pos} ${base} ${theme} ${className}`}
      type="button"
    >
      <ArrowLeft size={18} />
      <span className="hidden sm:inline">Back</span>
    </button>
  );
}
