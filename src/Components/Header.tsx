"use client";

import Link from "next/link";
import React from "react";
import FormSearch from "./FormSearch";

import { ReduxProvider } from "./ReduxProvider";

import Navbar from "./Navbar";
import { CartState } from "@/types";

function Header({ session, cartUser }: { session: any; cartUser: CartState }) {
  return (
    <ReduxProvider>
      <header className="w-screen  bg-yellow-400 p-2 flex justify-evenly items-center text-white font-bold ">
        <Link href={`/`}>
          <h3 className="text-4xl">Store</h3>
        </Link>
        <FormSearch />
        <Navbar session={session} cartUser={cartUser} />
      </header>
    </ReduxProvider>
  );
}

export default Header;
