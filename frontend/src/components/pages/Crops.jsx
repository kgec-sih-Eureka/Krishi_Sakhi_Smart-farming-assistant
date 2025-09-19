import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { BackButton } from "../index";

export function Crops() {
  const [crops, setCrops] = useState(["Wheat", "Rice", "Maize"]);
  const [newCrop, setNewCrop] = useState("");

  const addCrop = () => {
    if (newCrop.trim() !== "") {
      setCrops([...crops, newCrop.trim()]);
      setNewCrop("");
    }
  };

  const deleteCrop = (crop) => {
    setCrops(crops.filter((c) => c !== crop));
  };

  return (
    <div className="max-w-lg mx-auto mt-24 p-6 bg-white rounded-xl shadow-md border border-green-200">
        {/* <BackButton /> */}
      <h1 className="text-3xl font-bold text-green-700 mb-6">🌾 My Crops</h1>

      {/* Input field */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter crop name..."
          value={newCrop}
          onChange={(e) => setNewCrop(e.target.value)}
          className="flex-1 px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={addCrop}
          className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-md hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center"
        >
          <Plus className="w-4 h-4 mr-1" /> Add
        </button>
      </div>

      {/* Crop list */}
      <div className="space-y-4">
        {crops.length === 0 && (
          <p className="text-sm text-gray-500">No crops added yet.</p>
        )}
        {crops.map((crop, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-5 py-1 shadow-md hover:bg-green-100 transition-colors"
          >
            {/* Make crop name clickable */}
            <Link
              to={`${crop.toLowerCase()}`}
              className="flex-1 text-green-700 font-semibold text-lg hover:underline py-4"
            >
              {crop}
            </Link>
            {/* Delete button (center aligned) */}
            <button
              onClick={() => deleteCrop(crop)}
              className="ml-4 p-2 text-red-600 hover:text-red-800 rounded-md hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
