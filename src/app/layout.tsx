import React, { Suspense } from "react";
import Header from "../Components/Header";
import { Metadata } from "next";
import "@/ui/global.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { ReduxProvider } from "@/Components/ReduxProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
export const metadata: Metadata = {
  title: {
    default: "",
    template: `%s-Store`,
  },
  description: "The store where you can find anything you can think of",
};
const getCartUser = async (id: string) => {
  if (id) {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/cart/${id}`);
    //JSON SHOULD HAVE   { cart, quantity, total }
    const json = await res.json();
    return json;
  }

  return false;
};

async function layout({ children }: { children: React.ReactNode }) {
  const session: any = await getServerSession(authOptions);
  const cartUser = await getCartUser(session?.user?.id);
  return (
    <html className="overflow-x-hidden box-border">
      <body>
        {/* <Suspense fallback={<h2>Loading...</h2>}> */}
        <AppRouterCacheProvider>
          <Header session={session} cartUser={cartUser} />
        </AppRouterCacheProvider>
        {/* </Suspense> */}

        <main className="p-6">
          <ReduxProvider>{children}</ReduxProvider>
        </main>
      </body>
    </html>
  );
}

export default layout;
