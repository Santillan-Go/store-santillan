import { Metadata } from "next";
import React, { ReactElement } from "react";

export const metadata: Metadata = {
  title: "Log out",
  description: "Log out",
};

function layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default layout;
