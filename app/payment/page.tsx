"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button } from "../../components/ui/button";

export default function PaymentPage() {
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const router = useRouter();

  // Get cart items from Redux (if needed)
  const cartItems = useSelector((state: any) => state.cart.items);

  const handleConfirmPayment = () => {
    // In real app, you could mark order as "confirmed" in Sanity
    setOrderConfirmed(true);

    // Optionally clear localStorage or cart data
    localStorage.removeItem("orderId");

    // Redirect after few seconds
    setTimeout(() => {
      router.push("/thank_you");
    }, 3000);
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Payment</h1>

      {orderConfirmed ? (
        <div className="text-center text-[#80b934] hover:text-[#6fa12b] text-lg font-semibold">
          🎉 Your order has been confirmed! <br />
          It will be delivered to your address soon. <br />
          (Payment on Delivery)
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            This order will be paid via <strong>Cash on Delivery</strong>.
          </p>

          <Button
            onClick={handleConfirmPayment}
            className="bg-[#80b934] hover:bg-[#6fa12b] text-white w-full py-3 rounded-md"
          >
            Confirm Payment
          </Button>
        </div>
      )}
    </div>
  );
}
