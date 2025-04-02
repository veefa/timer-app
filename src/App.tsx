import React from "react";
import './index.css'
import Timer from "./Timer";

const App: React.FC = () => {
  return (
    <div className="flex justify-center items-center bg-gray-100 h-screen">
      <Timer />
    </div>
  );
};

export default App;