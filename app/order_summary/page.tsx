"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { loadCartFromLocalStorage } from "../../store/cartSlice"; // Assuming you have this action in your cartSlice
import {client} from "../../sanity/lib/client"; // Sanity client

// Order Summary Component
export default function OrderSummary() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [orderData, setOrderData] = useState<any>(null); // For order data from Sanity
  const [totalPrice, setTotalPrice] = useState(0); // Total price from cart
  const [isLoading, setIsLoading] = useState(true); // Loading state for order data

  // Retrieve cart items from Redux
  const cartItems = useSelector((state: any) => state.cart.items); // Assuming your cart is in the Redux state

  useEffect(() => {
    // Load cart data from localStorage if not already loaded
    dispatch(loadCartFromLocalStorage());

    // Retrieve order ID from localStorage
    const orderId = localStorage.getItem("orderId");
    if (orderId) {
      // Fetch order data from Sanity using the order ID
      client.getDocument(orderId)
        .then((data) => {
          setOrderData(data); // Set order data
          setIsLoading(false); // Stop loading after data is fetched
        })
        .catch((error) => {
          console.error("Error fetching order data from Sanity:", error);
          setIsLoading(false); // Stop loading on error
        });
    } else {
      console.error("No order ID found in localStorage.");
      setIsLoading(false); // Stop loading if no order ID
    }
  }, [dispatch]);

  // Function to calculate the total price from cart items
  const calculateTotalPrice = () => {
    return cartItems.reduce((total: number, item: any) => {
      return total + item.price * item.quantity; // Assuming each item has a price and quantity
    }, 0);
  };

  // Update total price whenever the cart changes
  useEffect(() => {
    const calculatedTotal = calculateTotalPrice();
    setTotalPrice(calculatedTotal); // Set the total price
  }, [cartItems]); // Recalculate when cartItems change

  // Calculate VAT (15%)
  const vat = (totalPrice * 0.15).toFixed(2);

  // If the order data is still loading, show a loading message
  if (isLoading) return <div >Loading order data...</div>;

  // If no order data is found in Sanity
  if (!orderData) return <div>No order data found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Order Summary</h1>

      {/* Shipping Information Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
        <div>
          <p className="mb-2"><strong>Full Name: </strong>{orderData.fullName}</p>
          <p className="mb-2"><strong>Email: </strong>{orderData.email}</p>
          <p className="mb-2"><strong>Phone Number: </strong>{orderData.phoneNumber}</p>
          <p className="mb-2">
            <strong>Address: </strong>
            {orderData.address}, {orderData.city}, {orderData.state} - {orderData.postalCode}, {orderData.country}
          </p>
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div>
          <p className="mb-2"><strong>Total Price: </strong>Rs.{totalPrice}</p>
     
        </div>
      </div>

      {/* Order Confirmation */}
      <div className="flex justify-center">
        <Button
          onClick={() => router.push("/payment")}
          className="bg-[#80b934] hover:bg-[#6fa12b] text-white w-full py-3 mt-6 rounded-lg shadow-md"
        >
          Confirm Order
        </Button>
      </div>
    </div>
  );
}
