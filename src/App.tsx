import React,{ useState, useEffect } from "react";
import './index.css'
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
    <div className={`flex justify-center items-center h-screen transition-all ${
      darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
    }`}>
      
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="top-5 right-5 absolute bg-blue-500 px-4 py-2 rounded-lg text-white"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Timer Component */}
      <Timer />
    </div>
  );
};

export default App;