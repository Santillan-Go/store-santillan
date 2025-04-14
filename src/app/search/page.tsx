import CardProductHome from "@/Components/CardProductHome";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

//import { useSearchParams } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    query: string;
  };
}
export function generateMetadata({ params, searchParams }: Props) {
  console.log(searchParams);
  return {
    title: `${searchParams.query}`,
    description: "Product Page",
  };
}

async function getData(query: string): Promise<Product[]> {
  const data = await fetch(`https://fakestoreapi.com/products`);
  const products: Product[] = await data.json();

  // console.log(Object.entries(products[0]));
  const filteredProducts = products.filter((product) =>
    Object.entries(product).some(([key, value]) => {
      const valuestring = String(value);
      return valuestring.toLowerCase().includes(query.toLowerCase());
    })
  );

  return filteredProducts;
}

async function Search({
  searchParams,
}: {
  searchParams: {
    query: string;
  };
}) {
  const { query } = searchParams;
  const products = await getData(query);
  return (
    <section>
      <h1 className="font-bold text-3xl">Search for {searchParams.query}</h1>

      <section className="grid grid-cols-4 w-full p-7 rounded-2xl gap-5 justify-center  ">
        {products.map((product) => (
          <CardProductHome
            key={product.id}
            product={product}
            priority={product.id <= 4}
          />
        ))}
      </section>
    </section>
  );
}

export default Search;
