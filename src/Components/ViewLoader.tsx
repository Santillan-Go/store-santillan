import React from "react";
import Loader from "./Loader";

function ViewLoader() {
  return (
    <div className="flex justify-center items-center  bg-opacity-45 fixed top-0 left-0 bottom-0 right-0 bg-white">
      <Loader />
    </div>
  );
}

export default ViewLoader;
