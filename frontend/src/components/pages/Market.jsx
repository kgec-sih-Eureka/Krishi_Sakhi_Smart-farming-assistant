import React, { useState } from "react";

// Mock crop price data (replace with API later)
const cropData = [
  { name: "Wheat", price: "₹2200/quintal" },
  { name: "Rice", price: "₹1800/quintal" },
  { name: "Maize", price: "₹1500/quintal" },
  { name: "Soybean", price: "₹4200/quintal" },
  { name: "Potato", price: "₹1200/quintal" },
  { name: "Onion", price: "₹1000/quintal" },
  { name: "Tomato", price: "₹1400/quintal" },
];

export function Market() {
  const [query, setQuery] = useState("");

  // Filter crops by search
  const filteredCrops = query==="" ? [] : cropData.filter((crop) =>
    crop.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen mt-15 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 border border-green-200">
        <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">
          🌾 Crop Market Prices
        </h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search crops..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none mb-6"
        />

        {/* Crop List */}
        <div className="space-y-3">
          {filteredCrops.length > 0 ? (
            filteredCrops.map((crop) => (
              <div
                key={crop.name}
                className="flex justify-between items-center bg-green-100 hover:bg-green-200 transition rounded-lg px-4 py-3 shadow-sm"
              >
                <span className="text-lg font-medium text-green-800">
                  {crop.name}
                </span>
                <span className="text-md font-semibold text-green-600">
                  {crop.price}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No crops found</p>
          )}
        </div>
      </div>
    </div>
  );
}
