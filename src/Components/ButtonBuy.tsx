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
      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200"
      onClick={payment}
    >
      Buy
    </button>
  );
}

export default ButtonBuy;
