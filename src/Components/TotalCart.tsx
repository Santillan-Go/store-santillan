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
    <section className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

      <div className="space-y-4">
        {/* Order Details */}
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Total Items</span>
            <span className="font-medium">{cart.quantity}</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium">${cart.total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="font-medium">Free</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-4"></div>

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <div className="text-right">
            <span className="text-2xl font-bold text-blue-600">
              ${cart.total.toFixed(2)}
            </span>
            <p className="text-sm text-gray-500">Including VAT</p>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="mt-6">
          <ButtonCartPay cart={cart} setLoading={setLoading} />
        </div>
      </div>
    </section>
  );
}

export default TotalCart;
