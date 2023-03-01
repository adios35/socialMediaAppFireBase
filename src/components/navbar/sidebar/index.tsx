import React from "react";
import "./style.css";
import { FaUserFriends, FaStore, FaVideo } from "react-icons/fa";
import { MdEventNote, MdGroups } from "react-icons/md";

const SideBar = () => {
  const menus = [
    {
      id: 1,
      title: "Friends",
      icon: <FaUserFriends size={23} />,
    },
    {
      id: 2,
      title: "Marketplace",
      icon: <FaStore size={23} />,
    },
    {
      id: 3,
      title: "Watch",
      icon: <FaVideo size={23} />,
    },
    {
      id: 4,
      title: "Event",
      icon: <MdEventNote size={23} />,
    },
    {
      id: 5,
      title: "Group",
      icon: <MdGroups size={23} />,
    },
  ];

  return (
    <div className="w-full  px-16">
      <ul className="space-y-7 divide-y-3 p-3  border-b-2 my-5">
        {menus.map((menu) => (
          <li key={menu.id} className="flex text-blue-500 gap-2 items-center">
            {menu.icon} <span className="text-gray-700">{menu.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
