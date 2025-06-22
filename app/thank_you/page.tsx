"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice"; // ✅ Correct path for your cartSlice

export default function ThankYouPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear cart when this page is loaded
    dispatch(clearCart());
    localStorage.removeItem("cart"); // Optional: also clear cart from localStorage
  }, [dispatch]);

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
      <div className="bg-white shadow-lg rounded-xl p-10 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-[#80b934] hover:text-[#6fa12b]0 mb-4">🎉 Thank You!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Your order has been successfully placed.
          <br />
          You will pay via <strong>Cash on Delivery</strong>.
        </p>
        <p className="text-sm text-gray-500">
          We appreciate your business. Stay tuned for delivery updates!
        </p>
      </div>
    </div>
  );
}
