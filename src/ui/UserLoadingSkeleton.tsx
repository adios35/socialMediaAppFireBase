import React from "react";

const UserLoadingSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col justify-center items-center gap-3">
      <div className="rounded-full bg-gray-200 h-32 w-32"></div>
      <div className="w-1/4 bg-gray-200 h-4"></div>
      <div className="w-1/2 bg-gray-200 h-4"></div>
      <div className="w-2/4 bg-gray-200 h-8"></div>
    </div>
  );
};

export default UserLoadingSkeleton;
