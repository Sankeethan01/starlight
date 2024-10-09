"use client";
import { useCartStore } from "@/hooks/useCartStore";
import { useState } from "react";
import { useWixClient } from "@/hooks/useWixClient";
import { toast, Toaster } from "react-hot-toast"; 
import Loading from "./Loading";
import SuccessOrder from "./SuccessOrder";

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    mobile: "",
  });
  const { clearCart } = useCartStore();
  const wixClient = useWixClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log(await response.json());

      if (response.ok) {
        toast.success('Order submitted successfully!');
        clearCart(wixClient);
        setIsSuccess(true);
      } else {
        toast.error('Failed to submit the order. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('An error occurred while submitting the order.');
    }finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <>
     {isSubmitting ? (<Loading loadText="Submitting your order, please wait..." />) :
     isSuccess ? (
        <SuccessOrder /> 
      ) : (
        <form
        onSubmit={handleSubmit}
        className="w-1/3 mx-auto p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Checkout</h2>
        <div className="flex flex-col space-y-4">
          <label className="flex flex-col">
            <span className="text-gray-700">First Name:</span>
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-redColor"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-gray-700">Last Name:</span>
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-redColor"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-gray-700">Email:</span>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-redColor"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-gray-700">Address:</span>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-redColor"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-gray-700">Mobile:</span>
            <input
              type="text"
              name="mobile"
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-redColor"
            />
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-redColor text-white p-2 py-3 rounded-md hover:bg-white hover:text-redColor hover:ring-1 hover:ring-redColor transition duration-200"
        >
          Submit Order
        </button>
      </form>
       ) }
   
    <Toaster />
    </>
  );
};

export default CheckoutForm;
