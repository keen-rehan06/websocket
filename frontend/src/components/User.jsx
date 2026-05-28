import React, { useState } from 'react';

const User = () => {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleContinue = () => {
    if (name.trim()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            Welcome, {name}!
          </h2>

          <p className="text-gray-500 text-sm">
            You're all set to start chatting.
          </p>

          <button
            onClick={() => {
              setSubmitted(false);
              setName("");
            }}
            className="mt-5 text-sm text-green-500 hover:text-green-600 transition-colors"
          >
            ← Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Enter your name
        </h2>

        <p className="text-sm text-gray-500 mb-5 leading-relaxed">
          Enter your name to start chatting. This will be used to identify you
          in the conversation.
        </p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => e.key === "Enter" && handleContinue()}
          placeholder="Your name (e.g. John Doe)"
          className={`w-full border rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 ${
            focused
              ? "border-green-400 ring-2 ring-green-100"
              : "border-gray-300"
          }`}
        />

        <div className="flex justify-end mt-4">
          <button
            onClick={handleContinue}
            disabled={!name.trim()}
            className={`px-5 py-2 rounded-full text-sm font-medium text-white transition-all duration-200 ${
              name.trim()
                ? "bg-green-500 hover:bg-green-600 active:scale-95 shadow-sm cursor-pointer"
                : "bg-green-300 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;