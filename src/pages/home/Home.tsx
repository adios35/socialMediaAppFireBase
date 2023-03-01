import React from "react";

import Center from "./Center";
import SideBar from "../../components/navbar/sidebar";
import Right from "../../components/right";

const Home = () => {
  return (
    <div className=" flex gap-3  divide-x-2 h-screen">
      <div className="left flex-1">
        <SideBar />
      </div>
      <Center />
      <div className="right flex-1">
        <Right />
      </div>
    </div>
  );
};

export default Home;
