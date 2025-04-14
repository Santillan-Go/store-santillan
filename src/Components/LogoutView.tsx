"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { Home, Logout } from "@mui/icons-material";

function LogoutView() {
  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-all duration-200 group"
      >
        <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
        Return Home
      </Link>

      <button
        onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-200 group"
      >
        <Logout className="w-5 h-5 group-hover:scale-110 transition-transform" />
        Sign Out
      </button>
    </div>
  );
}

export default LogoutView;
