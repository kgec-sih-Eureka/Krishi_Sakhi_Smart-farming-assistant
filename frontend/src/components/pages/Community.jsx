import React, { useState } from "react";
import { Logo } from "../index";

export function Community() {
  const [messages, setMessages] = useState([]);

  const [newMsg, setNewMsg] = useState("");

  const handleSend = () => {
    if (newMsg.trim() === "") return;

    const now = new Date();
    const formattedDate = now.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const msg = {
      id: Date.now(),
      user: "You",
      text: newMsg,
      date: formattedDate,
    };

    setMessages([...messages, msg]);
    setNewMsg("");
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center p-4 mt-15">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl flex flex-col h-[80vh] border border-green-200">
        {/* Header */}
        <div className="bg-green-600 text-white px-4 py-3 rounded-t-xl font-semibold">
          <Logo />
          <span>Farmers Chat</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.user === "You" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-[75%] shadow-sm ${
                  msg.user === "You"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <span className="block text-sm font-semibold">
                  {msg.user}
                </span>
                <span>{msg.text}</span>
                <div className="text-xs opacity-70 mt-1">{msg.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex p-3 border-t border-green-200">
          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-green-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-green-600 text-white rounded-r-md hover:bg-green-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
