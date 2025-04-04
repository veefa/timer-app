import React from "react";

interface ProgressBarProps {
    timeLeft: number;
    totalTime: number;
    darkMode: boolean;
}
 
const ProgressBar: React.FC<ProgressBarProps> = ({timeLeft, totalTime, darkMode}) => {
    // Calculate the percentage of time passed
    const percentage = ((totalTime - timeLeft) / totalTime) * 100;
    return ( 
        // The progress track
        <div className="bg-gray-300 mt-4 rounded w-full max-w-md h-4 overflow-hidden">
      {/* Inner bar: represents the completed portion of the session */}
      <div
        className={`
          h-full 
          transition-all duration-500 
          ${darkMode ? "bg-gray-500" : "bg-gray-400"}  
        `}
        style={{ width: `${percentage}%` }} // Dynamically adjusts width based on time progress
      />
    </div>
     );
}
 
export default ProgressBar;