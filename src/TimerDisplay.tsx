import React from "react";

interface TimerDisplayProps {
    timeLeft: number
    mode: "work" | "break"
    darkMode: boolean
}

 
const TimerDisplay: React.FC<TimerDisplayProps> = ({timeLeft, mode, darkMode}) => {
    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
      };
      const textColor = darkMode ? "text-gray-400" : "text-gray-600";
    return (
        <>
<h1 className={`py-1 font-bold text-5xl ${textColor}`}>{formatTime(timeLeft)}</h1>
<p className={`font-semibold text-lg ${textColor}`}>{mode === "work" ? "Work Time" : "Break Time"}</p>
        </>
      );
};
 
export default TimerDisplay ;