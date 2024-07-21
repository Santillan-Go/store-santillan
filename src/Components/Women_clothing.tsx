import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function getJewelry(): Promise<Product[]> {
  try {
    const data = await fetch(
      `https://fakestoreapi.com/products/category/women's%20clothing`
    );

    const womenClothing = await data.json();
    return womenClothing;
  } catch (error) {
    return [];
  }
}

async function Women_clothing() {
  const womenClothing = await getJewelry();
  return (
    <section className="mt-14">
      <h1 className="font-bold p-1 text-4xl">Womens` Clothing</h1>
      <article className="h-5/6  bg-slate-300 gap-4 rounded-2xl p-5 flex text-center">
        {womenClothing.slice(0, 4).map((product) => (
          <section className="rounded-xl p-2 bg-white w-52 " key={product.id}>
            <Link href={`/product/${product.id}`}>
              {/* <img
                src={product.image}
                alt={product.title}
                className="w-52 h-40"
              /> */}
              <Image
                width={208}
                height={208}
                className="w-52 h-40"
                src={product.image}
                alt={product.title}
              />
            </Link>

            <div className="flex flex-col justify-between h-1/3">
              <Link href={`/product/${product.id}`}>
                <h3 className="text-ellipsis text-pretty w-full">
                  {product.title}
                </h3>
              </Link>
              <h4>${product.price}</h4>
            </div>
          </section>
        ))}
      </article>
    </section>
  );
}

export default Women_clothing;
