import { Product } from "@/types";
import React from "react";
import CardProductHome from "./CardProductHome";

async function getJewelry(): Promise<Product[]> {
  try {
    const data = await fetch(
      `https://fakestoreapi.com/products/category/jewelery`
    );
    //await new Promise((resolve) => setTimeout(resolve, 10000));
    const jewelry = await data.json();
    return jewelry;
  } catch (error) {
    return [];
  }
}

async function JeweleryProducts() {
  const jewelery: Product[] = await getJewelry();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">
        Luxury Jewelry Collection
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {jewelery.map((product) => (
          <CardProductHome
            key={product.id}
            product={product}
            priority={product.id <= 4}
          />
        ))}
      </div>
    </section>
  );
}

export default JeweleryProducts;
