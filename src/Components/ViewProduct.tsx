"use client";

import { useState } from "react";
import ViewLoader from "./ViewLoader";
import NavBarPage from "./NavBarPage";
import ButtonBuy from "./ButtonBuy";
import ButtonCart from "./ButtonCart";
import ModelCart from "./ModelCart";
import { useAppDispatch } from "@/store/store";
import { addtocart } from "@/store/apiCalls";
import Image from "next/image";

export function ViewProduct({
  product,
  session,
}: {
  product: any;
  session: any;
}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [show, setState] = useState(false);

  const handleClickCart = () => {
    if (session?.user.id) {
      addtocart({ dispatch, product, userId: session?.user.id });
    } else {
      setState(!show);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 rounded-3xl">
      <NavBarPage />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="bg-white  shadow-lg overflow-hidden rounded-3xl">
          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* Image Section */}
            <div className="relative aspect-square bg-gray-100 rounded-xl p-8 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={400}
                className="object-contain w-full h-full transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col justify-between">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.title}
                </h1>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${
                          i < Math.floor(product.rating.rate)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-600">({product.rating.rate})</span>
                </div>

                <p className="text-4xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </p>

                <div className="prose prose-sm text-gray-600">
                  <p>{product.description}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 mt-8">
                <ButtonBuy
                  product={product}
                  setLoading={setLoading}
                  session={session}
                />
                <ButtonCart
                  product={product}
                  session={session}
                  handleClick={handleClickCart}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Additional Details Section */}
        <section className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Details
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>{product.description}</p>
          </div>
        </section>
      </main>

      <ModelCart show={show} setState={setState} />
      {loading && <ViewLoader />}
    </div>
  );
}
