import React, { useState } from "react";
import GroupList from "../components/GroupList";
import NoteList from "../components/NoteList";

const Home = () => {
  return (
    <div className="flex h-screen">
      <GroupList />
      <div className="flex flex-col flex-1">
        <NoteList />
      </div>
    </div>
  );
};

export default Home;
