import React from "react";

interface TimerControlsProps {
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
  mode: "work" | "break";
  sessionLength: number;
  breakLength: number;
  setTimeLeft: (value: number) => void;
}
 
const TimerControls: React.FC<TimerControlsProps> = ({
    isRunning,
  setIsRunning,
  mode,
  sessionLength,
  breakLength,
  setTimeLeft,
}) => {
    return (  
        <div className="space-x-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="bg-blue-400 hover:bg-blue-300 px-6 py-3 rounded-lg text-gray-300"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(mode === "work" ? sessionLength * 60 : breakLength * 60); // Reset properly
          }}
          className="bg-red-700 hover:bg-red-300 px-5 py-3 rounded-lg text-gray-300"
        >
          Reset
        </button>
      </div>
    );
}
 
export default TimerControls;