import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/authOptions";
// const getUserByid = async (id: string) => {
//   const res = await fetch(`http://localhost:4000/api/auth/user/${id}`);

//   return res.json();
// };

async function page() {
  const session: any = await getServerSession(authOptions);

  return (
    <section className="flex flex-col items-center">
      {session?.user ? (
        <>
          <h1 className="text-center font-bold text-4xl">Profile</h1>
          <p className="text-center text-lg">Welcome, {session.user.name}!</p>
        </>
      ) : (
        <></>
      )}
    </section>
  );
}

export default page;
