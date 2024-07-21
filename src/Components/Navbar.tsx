"use client";
import { GetAllProduct } from "@/store/cartRedux";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { CartState } from "@/types";
import { Home, Person, ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";

interface Props {
  session: {
    user: {
      id: string;
      name: string;
    };
  } | null;

  cartUser: CartState;
}
function Navbar({ session, cartUser }: Props) {
  const authState = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // const getCartUser = async () => {
    //   const res = await fetch(`/api/cart/${session?.user.id}`);
    //   //JSON SHOULD HAVE   { cart, quantity, total }
    //   const json = await res.json();
    //   dispatch(GetAllProduct(json));
    // };
    if (cartUser) {
      dispatch(GetAllProduct(cartUser));
    }

    // session?.user.id && getCartUser();
    // eslint-disable-next-line
  }, [cartUser]);
  console.log(authState, "SESSSION COMPONENT");
  return (
    <nav className="flex gap-5">
      <Link href={"/"}>
        <Home className="w-8 h-8" />
      </Link>
      {!session?.user && (
        <>
          <Link href={"/login"}>Log in</Link>
          <Link href={"/register"}>register</Link>
        </>
      )}

      <Link href={"/cart"}>
        <Badge badgeContent={authState.quantity} color="primary">
          <ShoppingCart className="w-8 h-8" />
        </Badge>
      </Link>

      {session?.user && (
        <>
          <Link
            className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center"
            href={"/profile"}
          >
            <Person color="primary" />
          </Link>
          <Link href={"/logout"}>Log Out</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
