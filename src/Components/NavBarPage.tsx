"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

function NavBarPage() {
  //const params = useSearchParams();
  const [query, setquery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setquery(window?.localStorage.getItem("query") || "");
    }
  }, []);
  return (
    <nav>
      {query && (
        <Link
          className="text-sky-500 font-bold text-xl"
          href={`/search?query=${query}`}
        >
          Back to list
        </Link>
      )}
    </nav>
  );
}

export default NavBarPage;
