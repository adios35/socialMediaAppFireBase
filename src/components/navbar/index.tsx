import React, { useState, useEffect, useRef } from "react";
import { signOut } from "firebase/auth";
import { IoMdNotifications } from "react-icons/io";
import { HiEnvelope } from "react-icons/hi2";
import { FaTools } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import { auth } from "../../api/firebase";
import { useAuth } from "../../context/registerContext";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../ui/loader";

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const { user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  function handleClick(e) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setDropdownOpen(false);
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  });
  const handleLogout = () => {
    setIsLoading(true);
    signOut(auth).then(() => {
      setIsLoading(false);
      setDropdownOpen(false);
    });
  };

  return (
    <div className="w-full  flex p-3 justify-between items-center shadow-md px-4 md:px-10 bg-white">
      {isLoading && <LoadingSpinner />}
      <div
        onClick={() => navigate("/")}
        className="logo font-bold text-gray-600 cursor-pointer"
      >
        <span className="text-blue-400 text-xl">4</span>Chat
      </div>
      <div className="center hidden md:flex text-blue-500 w-2/5 justify-evenly items-center">
        <span className="block">
          <IoMdNotifications size={30} />
        </span>
        <span className="block">
          <MdOndemandVideo size={30} />
        </span>
        <span className="block">
          <HiEnvelope size={30} />
        </span>
      </div>
      <div className="wrapper relative" ref={dropdownRef}>
        <div
          className="flex items-center cursor-pointer md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="hamburger bg-red-500 ">
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </div>
        </div>
        {user && (
          <div
            // className={`flex items-center cursor-pointer ${
            //   mobileMenuOpen ? "md:hidden" : "hidden md:flex"
            // }`}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="cursor-pointer"
          >
            <img
              src={user?.photoURL!}
              className="photo border-2 border-blue-400 h-11 w-12 rounded-full "
              alt="profile"
            />
          </div>
        )}
        {dropdownOpen && (
          <div className="absolute top-14 right-0 w-56 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <div className="px-4 py-2 text-gray-800 text-sm">Logged in as:</div>
            <Link to={`user/${user?.uid}`}>
              <div className="px-4 py-2 text-gray-800 text-lg font-bold">
                {auth.currentUser?.email?.split("@")[0]}
              </div>
            </Link>
            <hr />
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
