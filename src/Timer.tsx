import React, { useState, useEffect } from "react";

// Accept darkMode as a prop to control theme changes
interface TimerProps {
  darkMode: boolean;
}

const Timer: React.FC<TimerProps> = ({ darkMode }) => {
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60); // Initializes timeLeft
  const [isRunning, setIsRunning] = useState<boolean>(false); // Tracks if the timer is running
  const [mode, setMode] = useState<"work" | "break">("work");
  const [breakLength, setBreakLength] = useState<number>(5); // Default: 5 min break
  const [sessionLength, setSessionLength] = useState<number>(25); // Default: 25 min

  // Start/Pause functionality
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Play sound when time runs out
      const alarmSound = new Audio("/notification.mp3");
      alarmSound.play();

      if (mode === "work") {
        setMode("break");
        setTimeLeft(breakLength * 60); // Switch to break time
      } else {
        setMode("work");
        setTimeLeft(sessionLength * 60); // Switch back to work time
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode, breakLength, sessionLength]);

  // Converts seconds into mm:ss format
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    // Added darkMode class to apply conditional styles
    <div
      className={`flex flex-col justify-center items-center space-y-4 p-4 transition-all ${
        darkMode ? " text-gray-300" : " text-gray-700"
      }`}
    >
      <h1 className="py-1 font-bold text-5xl">{formatTime(timeLeft)}</h1>
      <p className="font-semibold text-lg">{mode === "work" ? "Work Time" : "Break Time"}</p>

      {/* Work & Break Length Input */}
      <div className="flex space-x-4 py-3">
        <div>
          <label className="block font-medium text-gray-500">Work Session:</label>
          <input
            type="number"
            value={sessionLength}
            onChange={(e) => {
              const value = Number(e.target.value);
              setSessionLength(value);
              if (!isRunning && mode === "work") setTimeLeft(value * 60);
            }}
            className={` p-2 shadow border border-gray-300 rounded w-20  ${darkMode ? "text-gray-600 bg-gray-300 " : "text-gray-500 bg-gray-100"}`}
          />
        </div>
        <div>
          <label className="block font-medium text-gray-500">Break Time:</label>
          <input
            type="number"
            value={breakLength}
            onChange={(e) => {
              const value = Number(e.target.value);
              setBreakLength(value);
              if (!isRunning && mode === "break") setTimeLeft(value * 60);
            }}
            className= {` p-2 shadow border border-gray-300 rounded w-20  ${darkMode ? "text-gray-600 bg-gray-300 " : "text-gray-500 bg-gray-100"}`}
          />
        </div>
      </div>

      {/* Timer control */}
      <div className="space-x-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="bg-blue-400 hover:bg-blue-300 px-6 py-3 rounded-lg text-gray-200"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(mode === "work" ? sessionLength * 60 : breakLength * 60); // Reset properly
          }}
          className="bg-red-700 hover:bg-red-300 px-5 py-3 rounded-lg text-gray-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;