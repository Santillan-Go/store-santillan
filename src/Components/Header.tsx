"use client";

import Link from "next/link";
import React from "react";
import FormSearch from "./FormSearch";
import { ReduxProvider } from "./ReduxProvider";
import Navbar from "./Navbar";
import { CartState } from "@/types";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

function Header({ session, cartUser }: { session: any; cartUser: CartState }) {
  return (
    <ReduxProvider>
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <h3
                className={`${montserrat.className} text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300`}
              >
                Store
              </h3>
            </Link>

            <div className="flex-1 max-w-xl mx-8">
              <FormSearch />
            </div>

            <div className="flex items-center">
              <Navbar session={session} cartUser={cartUser} />
            </div>
          </div>
        </div>
      </header>
    </ReduxProvider>
  );
}

export default Header;
