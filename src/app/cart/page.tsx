import { Metadata } from "next";
import CartProducts from "@/Components/CartProducts";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const metadata: Metadata = {
  title: "Cart",
  description: "This page",
};

async function page() {
  // const userCart: any = await getUserProducts(0);
  // noStore();

  const session: any = await getServerSession(authOptions);

  return (
    <section>
      <h2 className="font-bold text-3xl">Cart</h2>
      {session?.user ? (
        <CartProducts session={session} />
      ) : (
        <h1 className="text-[26px] text-center font-bold">
          Please, sign up or log in so you can add items on your cart 🛒
        </h1>
      )}
    </section>
  );
}

export default page;
