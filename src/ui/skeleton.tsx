import React from "react";

const PostSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-lg my-2 shadow-md">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <div className="bg-gray-300 animate-pulse h-full w-full"></div>
        </div>
        <div className="ml-4">
          <div className="bg-gray-300 animate-pulse h-4 w-32 mb-2"></div>
          <div className="bg-gray-300 animate-pulse h-4 w-16"></div>
        </div>
        <div className="ml-auto">
          <div className="bg-gray-300 animate-pulse h-4 w-16"></div>
        </div>
      </div>
      <div className="mt-4">
        <div className="bg-gray-300 animate-pulse h-12"></div>
        <div className="bg-gray-300 animate-pulse h-48 mt-4"></div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="bg-gray-300 animate-pulse h-8 w-16"></div>
        <div className="bg-gray-300 animate-pulse h-8 w-16"></div>
        <div className="bg-gray-300 animate-pulse h-8 w-16"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
