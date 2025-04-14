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
import { Add, Remove, DeleteOutline } from "@mui/icons-material";

function CartProducts({ session }: { session: { user: User } }) {
  const cart: CartState = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleAmount = (type: string, product: CartProduct) => {
    if (type === "decrese") {
      console.log(type);
      removeonefromcart({ dispatch, product, userId: session.user.id });
    }
    if (type === "increse") {
      console.log(type);
      addtocart({ dispatch, product, userId: session.user.id });
    }
    if (type === "all") {
      console.log(type);
      removefromcart({ dispatch, product, userId: session.user.id });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {cart.cart.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
              <h2 className="text-xl text-gray-600">Your cart is empty</h2>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-700 mt-4 inline-block"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <ul className="space-y-6">
              {cart.cart.map((product) => (
                <li
                  key={product.id}
                  className="bg-white rounded-2xl shadow-sm p-6 transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    <Link
                      href={`/product/${product.id}`}
                      className="relative aspect-square w-32 sm:w-40 rounded-xl overflow-hidden bg-gray-50"
                    >
                      <Image
                        fill
                        src={product.image || ""}
                        alt={product.title}
                        className="object-contain p-2"
                      />
                    </Link>

                    <div className="flex-grow space-y-4">
                      <div>
                        <Link
                          href={`/product/${product.id}`}
                          className="text-lg font-medium text-gray-900 hover:text-blue-600"
                        >
                          {product.title}
                        </Link>
                        <p className="text-sm text-gray-500 capitalize mt-1">
                          {product.category}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-lg font-semibold text-gray-900">
                            $
                            {(Number(product.price) * product.quantity).toFixed(
                              2
                            )}
                          </p>
                          <p className="text-sm text-gray-500">
                            ${product.price} each
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleAmount("decrese", product)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Remove className="w-6 h-6 text-gray-600" />
                          </button>

                          <span className="w-8 text-center font-medium">
                            {product.quantity}
                          </span>

                          <button
                            onClick={() => handleAmount("increse", product)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Add className="w-6 h-6 text-gray-600" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAmount("all", product)}
                        className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                      >
                        <DeleteOutline className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="lg:w-80">
          <div className="sticky top-24">
            <TotalCart cart={cart} setLoading={setLoading} />
          </div>
        </div>
      </div>

      {loading && <ViewLoader />}
    </div>
  );
}

export default CartProducts;
