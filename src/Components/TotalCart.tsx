"use client";

import { CartState } from "@/types";
import ButtonCartPay from "./ButtonCartPay";

function TotalCart({
  cart,
  setLoading,
}: {
  cart: CartState;
  setLoading: (state: any) => void;
}) {
  return (
    <>
      <section className="basis-1/5 p-3 border border-gray-300  flex flex-col rounded-lg">
        <h2 className="text-center text-2xl  font-bold  basis-7">Cart total</h2>

        <div className="flex flex-col justify-evenly flex-1">
          <div>
            <p className="font-semibold text-xl">
              Total Products: {`${cart.quantity}`}
            </p>

            <p className="font-bold text-xl">Subtotal: $ {`${cart.total}`}</p>
          </div>

          <ButtonCartPay cart={cart} setLoading={setLoading} />
        </div>
      </section>
    </>
  );
}

export default TotalCart;
