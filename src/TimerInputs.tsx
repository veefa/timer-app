import React from "react";

interface TimeInputsProps {
    sessionLength: number;
    breakLength: number;
    setSessionLength: (value: number) => void;
    setBreakLength: (value: number) => void;
    mode: "work" | "break";
    isRunning: boolean;
    setTimeLeft: (value: number) => void;
    darkMode: boolean;  
}
    
const TimeInputs : React.FC<TimeInputsProps> = ({
    sessionLength,
    breakLength,
    setSessionLength,
    setBreakLength,
    mode,
    isRunning,
    setTimeLeft,
    darkMode,
}) => {

    const labelStyle = ` p-2 shadow border border-gray-300 rounded w-20  ${darkMode ? "text-gray-600 bg-gray-300 " : "text-gray-500 bg-gray-100"}`;
    const inputStyle = ` p-2 shadow border border-gray-300 rounded w-20  ${darkMode ? "text-gray-600 bg-gray-300 " : "text-gray-500 bg-gray-100"}`;

    return (  
        <div className="flex space-x-4 py-5">
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
            className={`${labelStyle}`}
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
            className= {`${inputStyle}`}
          />
        </div>
      </div>
    );
}
    
export default TimeInputs;