import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardProductProps {
  product: Product;
  priority?: boolean;
}

function CardProductHome({ product, priority = false }: CardProductProps) {
  return (
    <article className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      <Link
        href={`/product/${product.id}`}
        className="relative block aspect-square w-full overflow-hidden rounded-xl bg-gray-100"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            width={400}
            height={400}
            src={product.image}
            alt={product.title}
            className="object-contain w-[80%] h-[80%] group-hover:scale-105 transition-transform duration-300"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            quality={85}
          />
        </div>
      </Link>

      <div className="mt-4 flex flex-col flex-grow">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
            {product.title}
          </h3>
        </Link>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>
          <Link
            href={`/product/${product.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default CardProductHome;
