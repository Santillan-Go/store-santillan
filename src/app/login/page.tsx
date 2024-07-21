import React from "react";
import { FormLogin } from "@/Components/FormUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login so you can access all features ",
};
function page() {
  return (
    <section className="flex flex-col items-center">
      <h1 className="text-center font-bold text-4xl">Log in</h1>

      <FormLogin />
    </section>
  );
}

export default page;
