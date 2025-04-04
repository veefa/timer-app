// App.tsx
import React, { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import "./index.css";
import Timer from "./Timer";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Save Dark Mode preference to localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <div
      className={`flex justify-center items-center h-screen transition-all ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-red-200"
      }`}
    >
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="top-5 right-5 absolute px-2 py-2 rounded-lg text-gray-500"
      >
        {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
      </button>

      {/* Timer Component */}
      <Timer darkMode={darkMode} />
    </div>
  );
};

export default App;