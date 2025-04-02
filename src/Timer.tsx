import React, { useState, useEffect } from "react";

const Timer: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState<number>(25 * 60)   //Initializes timeLeft
    const [isRunning, setIsRunning] = useState<boolean>(false);  // Tracks if the timer is running

    //  Start/Pause functionality
    useEffect(() => {
        let timer: ReturnType<typeof setInterval> | undefined;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);  //1000ms
        } else {
            clearInterval(timer);
        }
        //Preventing Multiple Intervals (Reset button)
        return () => clearInterval(timer);}
    , [isRunning, timeLeft]);

    //Converts seconds into mm:ss format
    const formatTime = (secconds: number) : string => {
        const minutes = Math.floor(secconds / 60);
        const secs = secconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    } 

    return (
        <div className="flex flex-col justify-center items-center space-y-4">
            <h1 className="py-2 font-bold text-gray-600 text-5xl trex">{formatTime(timeLeft)}</h1>
            <div className="space-x-4">
                <button onClick={() => setIsRunning(!isRunning)}
                    className="bg-blue-400 px-6 py-3 rounded-lg text-gray-100">
                    {isRunning ? "Pause" : "Start"}
                </button>
                <button onClick={() => {
                    setIsRunning(false);
                    setTimeLeft(25 * 60);
                    }}
                    className="bg-red-700 px-5 py-3 rounded-lg text-gray-100"
                >
                    Reset
                </button>
            </div>
        </div>


)

};
export default Timer;