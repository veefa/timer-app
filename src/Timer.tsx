import React, { useState, useEffect } from "react";
import TimerDisplay from "./TimerDisplay";
import TimeInputs from "./TimerInputs";

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


  return (
    // Added darkMode class to apply conditional styles
    <div
      className={`flex flex-col justify-center items-center space-y-4 p-4 transition-all ${
        darkMode ? " text-gray-300" : " text-gray-700"
      }`}
        >
      <TimerDisplay timeLeft={timeLeft} mode={mode} darkMode={darkMode} />

      {/* Work & Break Length Input */}
      <TimeInputs
        sessionLength={sessionLength}
        breakLength={breakLength}
        setSessionLength={setSessionLength}
        setBreakLength={setBreakLength}
        mode={mode}
        isRunning={isRunning}
        setTimeLeft={setTimeLeft}
        darkMode={darkMode}
      />

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