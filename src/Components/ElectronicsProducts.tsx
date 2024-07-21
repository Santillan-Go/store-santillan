import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function getJewelry(): Promise<Product[]> {


    try {  const data = await fetch(
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
    <section className="mt-14">
      <h1 className="font-bold p-1 text-4xl">Electronics</h1>
      <article className="h-5/6  bg-slate-300 gap-4 rounded-2xl p-5 flex text-center">
        {electronics.splice(0, 4).map((product) => (
          <section className="rounded-xl p-2 bg-white w-52 " key={product.id}>
            <Link href={`/product/${product.id}`}>
              {/* <img
                src={product.image}
                alt={product.title}
                className="w-52 h-40"
              /> */}
              {/* using Image from next js */}
              <Image
                className="w-52 h-40"
                width={208}
                height={208}
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

export default ElectronicsProducts;
