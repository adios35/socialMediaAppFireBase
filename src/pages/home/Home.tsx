import React from "react";

import Center from "./Center";
import SideBar from "../../components/navbar/sidebar";
import Right from "../../components/right";

const Home = () => {
  return (
    <div className=" flex gap-3 justify-center h-screen">
      <div className="left ">
        <SideBar />
      </div>
      <div className="center">
        <Center />
      </div>
      <div className="right md:max-w-xs ">
        <Right />
      </div>
    </div>
  );
};

export default Home;
