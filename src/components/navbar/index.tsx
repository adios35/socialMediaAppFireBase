import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../api/firebase";

const NavBar = () => {
  return (
    <div className="w-full flex p-3 justify-between items-center shadow-sm">
      <div className="logo font-bold text-gray-600 cursor-pointer">
        <span className=" text-blue-400">Chat</span>App
      </div>
      <button
        onClick={() => signOut(auth)}
        className="btn p-2 shadow-md rounded-md  duration-300 hover:scale-105"
      >
        log out
      </button>
    </div>
  );
};

export default NavBar;
