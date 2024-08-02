import React from "react";
import pocketnotes from "../assets/pocket-notes.png";
import lock from "../assets/lock.png";

const MainPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <img
        src={pocketnotes}
        className="w-[626px] h-[313px]"
        alt="pocket-notes-image"
      />
      <h1 className="mt-1 text-4xl font-bold">Pocket Notes</h1>
      <div className="w-[650px] text-center">
        <p className="mt-2 text-lg font-medium">
          Send and receive messages without keeping your phone online. <br />{" "}
          Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
        </p>
      </div>
      <div className="absolute flex items-center justify-center bottom-5">
        <img src={lock} className="w-[17px] h-[21px]" alt="lock-image" />
        <p className="ml-2 text-lg">end-to-end encrypted</p>
      </div>
    </div>
  );
};

export default MainPage;
