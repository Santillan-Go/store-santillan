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
    <section>
      <NavBarPage />
      <section className="flex bg-slate-300 p-4  rounded-2xl">
        <article className="basis-4/5  flex justify-evenly">
          {/* <img
            className="w-52  rounded-xl "
            src={product.image}
            alt={product.title}
          /> */}
          <Image
            className="w-52  rounded-xl"
            width={208}
            height={208}
            src={product.image}
            alt={product.title}
          />
          <div className="flex items-center flex-col">
            <h2 className="font-bold text-2xl p-3 w-3/4 text-center">
              {product.title}
            </h2>
            <h4 className="font-bold">🌟{product.rating.rate}</h4>
            <h4 className="font-bold text-3x1">${product.price}</h4>
          </div>
        </article>
        <aside className="basis-1/5  flex flex-col gap-2 items-center ">
          <ButtonBuy
            product={product}
            setLoading={setLoading}
            session={session}
          />
          {/* <ReduxProvider> */}
          <ButtonCart
            product={product}
            session={session}
            handleClick={handleClickCart}
          />
          {/* </ReduxProvider> */}
          <ModelCart show={show} setState={setState} />
        </aside>
      </section>
      {loading && <ViewLoader />}
      <article className=" bg-slate-300 p-4  rounded-2xl mt-8">
        <h2 className="font-bold  text-2xl ">Description</h2>

        <p className="p-3">{product.description}</p>
      </article>
    </section>
  );
}
