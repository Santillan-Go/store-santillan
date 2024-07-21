"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

function LogoutView() {
  return (
    <div className="h-60 flex flex-col gap-4  text-center mt-4">
      <Link
        className="w-28 rounded-xl p-1 block bg-sky-400 font-semibold text-2xl text-white"
        href={"/"}
      >
        Home
      </Link>
      <button
        className="w-28 rounded-xl p-1 bg-sky-400 font-semibold text-2xl text-white"
        onClick={() => {
          signOut({ redirect: true, callbackUrl: "/" });
        }}
      >
        Log out
      </button>
    </div>
  );
}

export default LogoutView;
