"use client";

import { useAppDispatch } from "@/store/store";
import { CartProduct } from "@/types";
import { ShoppingCartCheckoutRounded } from "@mui/icons-material";
import React from "react";

function ButtonCart({
  product,
  session, // Add session prop here to get user ID for adding to cart.
  handleClick
}: {
  product: CartProduct;
    session: { user: any };
  handleClick: () => void; // Add handleClick prop here to trigger the cart popup.
}) {
  const dispatch = useAppDispatch();
  console.log(product);
  return (
    <button
      className=" w-4/5 h-10  rounded-lg font-bold text-white bg-blue-400"
      onClick={handleClick}
    >
      <ShoppingCartCheckoutRounded />
    </button>
  );
}

export default ButtonCart;
