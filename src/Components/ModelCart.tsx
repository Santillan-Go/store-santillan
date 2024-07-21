import Link from "next/link";
import "./ModelCart.css";
import { useState } from "react";

function ModelCart({
  show,
  setState,
}: {
  show: boolean;
  setState: (state: any) => void;
}) {
  return (
    <div
      className={`${
        show ? "show" : "hide"
      } border border-sky-400 flex flex-col items-center absolute bg-white bg-opacity-70 w-96 rounded-2xl right-9`}
    >
      <h2 className="font-bold text-3x1">Please log in</h2>
      <section className="basis-1/2 flex flex-col justify-between">
        <Link className="text-sky-400 font-medium text-2xl" href={"/login"}>
          Log in
        </Link>
        <Link className="text-sky-400 font-medium text-2xl" href={"/register"}>
          Register
        </Link>
      </section>

      <button
        onClick={() => setState(!show)}
        className="text-red-600 p-1 border-red-500 rounded-xl font-semibold font-xl"
      >
        Close
      </button>
    </div>
  );
}

export default ModelCart;
