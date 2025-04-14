import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CardProductHome from "./CardProductHome";

async function getJewelry(): Promise<Product[]> {
  try {
    const data = await fetch(
      `https://fakestoreapi.com/products/category/electronics`
    );

    const jewelry = await data.json();
    return jewelry;
  } catch (error) {
    return [];
  }
}

async function ElectronicsProducts() {
  const electronics = await getJewelry();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">
        Electronics
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {electronics.map((product) => (
          <CardProductHome
            key={product.id}
            product={product}
            priority={product.id <= 4}
          />
        ))}
      </div>
    </section>
    // <section className="mt-14">
    //   <h1 className="font-bold p-1 text-4xl">Electronics</h1>
    //   <article className="h-5/6  bg-slate-300 gap-4 rounded-2xl p-5 flex text-center">
    //     {electronics.splice(0, 4).map((product) => (
    //       <CardProductHome
    //         key={product.id}
    //         product={product}
    //         priority={product.id <= 4}
    //       />
    //     ))}
    //   </article>
    // </section>
  );
}

export default ElectronicsProducts;
