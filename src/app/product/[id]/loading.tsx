import Loader from "@/Components/Loader";
import React from "react";

function loading() {
  return (
    <section className="flex justify-center w-full">
      <Loader />
    </section>
  );
}

export default loading;
