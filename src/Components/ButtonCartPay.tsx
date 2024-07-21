"use client";

function ButtonCartPay({
  cart,
  setLoading,
}: {
  cart: any;
  setLoading: (state: any) => void;
}) {
  const handlePayment = async () => {
    setLoading(true);
    const res = await fetch("/api/cart/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        endpoint: "cart",
        ...cart,
        title: "Products from your cart",
        description: "These are all the products that you added into your cart",
      }),
    });

    if (res.ok) {
      const json = await res.json();
      window.location.href = json.url;
    }
    setLoading(false);
  };
  return (
    <button
      onClick={handlePayment}
      className="w-full rounded-lg p-1 bg-sky-400 text-white font-bold text-center text-xl"
    >
      Checkout
    </button>
  );
}

export default ButtonCartPay;
