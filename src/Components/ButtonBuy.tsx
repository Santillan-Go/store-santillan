"use client";

import { Product } from "@/types";
import React from "react";

interface Props {
  product: Product;
  setLoading: (value: boolean) => void;
  session?: { user: any };
}

function ButtonBuy({ product, setLoading }: Props) {
  const payment = async () => {
    setLoading(true);
    // i can send the product's id or all product's data
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ ...product, endpoint: "product" }),
    });
    const json = await res.json();
    setLoading(false);
    window.location.href = json.url;
  };
  return (
    <button
      className="w-4/5  h-10 rounded-lg font-bold text-white bg-blue-400 text-center "
      onClick={payment}
    >
      Buy
    </button>
  );
}

export default ButtonBuy;
