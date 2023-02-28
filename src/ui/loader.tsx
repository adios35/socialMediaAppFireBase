import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = ({ percentage }: { percentage?: number | string }) => {
  return (
    <div className="loading-spinner-container">
      {percentage && (
        <span className="text-3xl text-gray-600 translate-x-[70px] text-center block">
          {percentage}%
        </span>
      )}
      <div className="loading-spinner "></div>
    </div>
  );
};

export default LoadingSpinner;
