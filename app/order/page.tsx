"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { Button } from "../../components/ui/button"; 
import {client} from "../../sanity/lib/client"; 

// Define the form data structure
interface OrderFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
}

export default function OrderPage() {
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter();

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create order document in Sanity
      const createdOrder = await client.create({
        _type: "order",
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        city: formData.city,
        country: formData.country,
      });

      console.log("Order data submitted successfully!");

       // Save the orderId to localStorage after the order is created
    localStorage.setItem("orderId", createdOrder._id);

      // Redirect after successful submission
      if (isClient) {
        router.push("/order_summary");
      }
    } catch (error) {
      console.error("Error submitting order data to Sanity: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Shipping Information</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>


        {/* Country */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#80b934] hover:bg-[#6fa12b] text-white w-full py-3 mt-6 rounded-lg shadow-md "
          >
            {isSubmitting ? "Submitting..." : "Place Order"}
          </Button>
        </div>
      </form>
    </div>
  );
}
