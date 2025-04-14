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
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-full transition-colors duration-200"
    >
      Checkout
    </button>
  );
}

export default ButtonCartPay;
