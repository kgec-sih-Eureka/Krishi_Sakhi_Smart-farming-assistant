import React, { useState } from "react";
import { useParams } from "react-router";

export function Tracker() {
  let cropName = useParams().cropname;
  cropName = cropName.charAt(0).toUpperCase() + cropName.slice(1);

  // Predefined roadmap activities for each week
  const initialRoadmap = [
    { week: 1, task: "Prepare soil and add compost.", done: false },
    { week: 2, task: "Sow seeds and water adequately.", done: false },
    { week: 3, task: "Weed control and check for pests.", done: false },
    { week: 4, task: "Apply fertilizer and ensure irrigation.", done: false },
    { week: 5, task: "Monitor crop growth and health.", done: false },
    { week: 6, task: "Pest management and soil check.", done: false },
    { week: 7, task: "Check flowering stage, add nutrients.", done: false },
    { week: 8, task: "Prepare for harvest stage.", done: false },
  ];

  const [roadmap, setRoadmap] = useState(initialRoadmap);

  const toggleTask = (index) => {
    const updated = roadmap.map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    );
    setRoadmap(updated);
  };

  return (
    <div className="max-w-xl mx-auto mt-24 p-6 bg-white rounded-xl shadow-md border border-green-200">
      {/* <BackButton /> */}
      <h1 className="text-2xl font-bold text-green-700 mb-4">
        🌾 {cropName} farming roadmap
      </h1>
      <p className="text-gray-600 mb-6">
        Track your weekly tasks for{" "}
        <span className="font-semibold">{cropName}</span>.
      </p>

      <div className="space-y-4">
        {roadmap.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3 shadow-sm"
          >
            <label className="flex items-center flex-1 cursor-pointer">
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleTask(index)}
                className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span
                className={`ml-3 text-green-800 ${
                  item.done ? "line-through text-gray-500" : ""
                }`}
              >
                Week {item.week}: {item.task}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
