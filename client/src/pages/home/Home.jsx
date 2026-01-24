import React from "react";
import UserSideBar from "./UserSideBar";
import MessageContainer from "./MessageContainer";

const Home = () => {
  return (
    <div className="flex">
      <UserSideBar />
      <MessageContainer />
    </div>
  );
};

export default Home;
