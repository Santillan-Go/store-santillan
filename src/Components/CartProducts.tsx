"use client";

import { CartProduct, CartState } from "@/types";
import Link from "next/link";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { addtocart, removefromcart, removeonefromcart } from "@/store/apiCalls";
import { User } from "next-auth";
import TotalCart from "./TotalCart";
import ViewLoader from "./ViewLoader";
import Image from "next/image";

function CartProducts({ session }: { session: { user: User } }) {
  const cart: CartState = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleAmount = (type: string, product: CartProduct) => {
    // const { id, price, quantity, title, category, image } = product;
    if (type === "decrese") {
      console.log(type);
      removeonefromcart({ dispatch, product, userId: session.user.id });
      //      dispatch(removeOneFromCart({ id }));
    }
    if (type === "increse") {
      console.log(type);
      addtocart({ dispatch, product, userId: session.user.id });
      // dispatch(addToCart({ id, price, quantity, title, category, image }));
    }
    if (type === "all") {
      console.log(type);
      removefromcart({ dispatch, product, userId: session.user.id });
      // dispatch(RemoveFromCart({ id }));
    }
  };
  return (
    <div className="flex gap-2 ">
      <ul className="basis-4/5 flex flex-col  gap-4">
        {cart.cart.map((product) => {
          return (
            <li
              key={product.id}
              className="flex bg-slate-300 h-36 rounded-lg items-center"
            >
              <Link href={`/product/${product.id}`} className="basis-1/4 p-4 ">
                {/* <img
                  className="w-40 h-32 rounded-lg"
                  src={product.image}
                  alt=""
                /> */}

                <Image
                  width={160}
                  height={128}
                  src={product.image ? product.image : ""}
                  alt={product.title}
                  className="w-40 h-32 rounded-lg"
                />
              </Link>
              <article className="basis-3/4">
                <Link href={`/product/${product.id}`}>
                  <h3>{product.title}</h3>
                </Link>
                <h4>${product.price}</h4>

                <p>{product.category}</p>
                <button
                  className="text-red-600 border border-red-600 outline-none p-1 pr-2 pl-2 font-semibold text-xl rounded-lg hover:bg-red-600 hover:text-white"
                  onClick={() => handleAmount("all", product)}
                >
                  Delete
                </button>

                <div className="flex gap-2">
                  <p>Total Product:</p>
                  <h4 className="text-2x1   font-semibold">
                    ${Number(product.price) * product.quantity}
                  </h4>
                </div>
              </article>
              <article className="basis-1/6 flex flex-col gap-2 items-center text-center">
                <button
                  className="w-4/5  h-8 rounded-lg font-bold text-white bg-blue-400 text-center text-2xl"
                  onClick={() => handleAmount("increse", product)}
                >
                  +
                </button>
                <h4 className="text-2x1  w-4/5 font-semibold text-center">
                  {product.quantity}
                </h4>
                <button
                  className="w-4/5  h-8 rounded-lg font-bold text-white bg-blue-400 text-center text-2xl"
                  onClick={() => handleAmount("decrese", product)}
                >
                  -
                </button>
              </article>
            </li>
          );
        })}
      </ul>

      <TotalCart cart={cart} setLoading={setLoading} />
      {loading && <ViewLoader />}
    </div>
  );
}

export default CartProducts;
