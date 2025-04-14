"use client";

import { useAppDispatch } from "@/store/store";
import { CartProduct } from "@/types";
import { ShoppingCartCheckoutRounded } from "@mui/icons-material";
import React from "react";

function ButtonCart({
  product,
  session, // Add session prop here to get user ID for adding to cart.
  handleClick,
}: {
  product: CartProduct;
  session: { user: any };
  handleClick: () => void; // Add handleClick prop here to trigger the cart popup.
}) {
  const dispatch = useAppDispatch();
  console.log(product);
  return (
    <button
      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-full font-medium transition-colors duration-200"
      onClick={handleClick}
    >
      <ShoppingCartCheckoutRounded />
    </button>
  );
}

export default ButtonCart;
