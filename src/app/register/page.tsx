import React from "react";
import FormRegister from "@/Components/FormUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "This is the register page",
};
function page() {
  return (
    <section className="flex flex-col items-center">
      <h1 className="text-center font-bold text-4xl">Register</h1>

      <FormRegister />
    </section>
  );
}

export default page;
