import React, { useState, useEffect } from "react";
import UserLoadingSkeleton from "../../ui/UserLoadingSkeleton";

const Test = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(1200);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(isFollowing ? followerCount - 1 : followerCount + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col p-5 items-center justify-center space-y-4">
      {isLoading ? (
        <UserLoadingSkeleton />
      ) : (
        <>
          <img
            className="w-32 h-32 rounded-full"
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
          <h2 className="text-lg font-bold">Jane Doe</h2>
          <p className="text-gray-600 text-sm">
            <span className="font-bold">{followerCount}</span> followers
          </p>
          <button
            className={`px-4 py-2 rounded-full ${
              isFollowing ? "bg-gray-500 text-white" : "bg-blue-500 text-white"
            }`}
            onClick={handleFollowClick}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
          <p className="text-gray-600">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet est risus.`}</p>
        </>
      )}
    </div>
  );
};

export default Test;
