import React, { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement } from "@stripe/react-stripe-js";

export default function Checkout() {
  const [checkoutItems, setCheckoutItems] = useState([]);
  const userId = localStorage.getItem("userId");

  const stripePromise = loadStripe(
    "pk_test_51NMoiWSIM6RPcgbrzg92FDF9czosKjYfgiBIPbZCsGi4GLQBg1OYopUk6tXhxRqyqKh7R7Db6GqMgYysDbb6DySn00TZnvwtov"
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getData");
      const data = response.data;
      const filteredItems = data.filter((item) => item.userId == userId);
      setCheckoutItems(filteredItems);
    } catch (error) {
      console.log(error);
    }
  };

  const sum = checkoutItems.reduce((total, item) => {
    return total + item.price * item.amount; // Multiply price by amount
  }, 0);

  const checkoutHandler = async () => {
    try {
      const stripe = await stripePromise;

      // Create a checkout session on the server
      const response = await axios.post("http://localhost:3000/checkout", {
        items: checkoutItems,
      });

      const { sessionId } = response.data;

      // Redirect to Stripe Checkout page
      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (result.error) {
        console.error(result.error.message);
        // Handle redirection error
      }
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout Page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {checkoutItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-32 h-32 object-cover square-full mx-auto mb-4"
            />
            <h2 className="text-lg font-bold mb-2">{item.title}</h2>
            <p className="text-gray-800 font-semibold">Price: {item.price}</p>
            <p className="text-gray-800">Quantity: {item.amount}</p>
            {/* Add additional information as needed */}
          </div>
        ))}
      </div>
      <h3 className="text-2xl font-semibold mt-8">Total: {sum}</h3>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mt-4 rounded"
        onClick={checkoutHandler}
      >
        Checkout
      </button>
    </div>
  );
}
