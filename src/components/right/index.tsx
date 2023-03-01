import React from "react";

const Right = () => {
  return (
    <div className="p-5">
      <div className="advertisement">
        <header className="flex text-gray-600 items-center my-3 justify-between">
          <p className="">
            <span>Advertisement</span>
          </p>
          <span className="block text-sm text-blue-400">close</span>
        </header>
        <img
          src="https://img.freepik.com/free-photo/group-diverse-people-having-business-meeting_53876-25060.jpg?w=900&t=st=1677668588~exp=1677669188~hmac=10a3a997293a46729fb7aeaed30ff2888c4a5db6a47ca8cf2cbd9c3d4e1235d7"
          alt=""
          className="rounded-md"
        />
      </div>
      <div className="conversation text-gray-600">
        <header className="my-3 flex justify-between items-center">
          <span>Conversation</span>
          <span className="text-blue-400 text-sm ">Hide Chat</span>
        </header>
        <ul className="space-y-3 divide-y-2">
          <li className="flex justify-between relative items-center">
            <span className="absolute  bottom-0 left-8 z-[9] border-2 h-3 w-3 bg-green-400 rounded-full"></span>
            <div className="profilePhoto relative max-h-11 overflow-hidden max-w-11 mr-2 rounded-full border-blue-400 border-[2px]">
              <img
                //@ts-ignore
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                //@ts-ignore
                className="h-9 w-9 rounded-full object-cover"
              />
            </div>
            <div className="profile-info mr-auto">
              <p className="text-sm text-gray-600 capitalize">Rohit</p>
              <p className="text-xs text-gray-400 font-semibold capitalize"></p>
            </div>
          </li>
          <li className="flex justify-between relative items-center">
            <span className="absolute  bottom-0 left-8 z-[9] border-2 h-3 w-3 bg-green-400 rounded-full"></span>
            <div className="profilePhoto relative max-h-11 overflow-hidden max-w-11 mr-2 rounded-full border-blue-400 border-[2px]">
              <img
                //@ts-ignore
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                //@ts-ignore
                className="h-9 w-9 rounded-full object-cover"
              />
            </div>
            <div className="profile-info mr-auto">
              <p className="text-sm text-gray-600 capitalize">Jack</p>
              <p className="text-xs text-gray-400 font-semibold capitalize"></p>
            </div>
          </li>
          <li className="flex justify-between relative items-center">
            <span className="absolute  bottom-0 left-8 z-[9] border-2 h-3 w-3 bg-green-400 rounded-full"></span>
            <div className="profilePhoto relative max-h-11 overflow-hidden max-w-11 mr-2 rounded-full border-blue-400 border-[2px]">
              <img
                //@ts-ignore
                src="https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                //@ts-ignore
                className="h-9 w-9 rounded-full object-cover"
              />
            </div>
            <div className="profile-info mr-auto">
              <p className="text-sm text-gray-600 capitalize">Mia</p>
              <p className="text-xs text-gray-400 font-semibold capitalize"></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Right;
