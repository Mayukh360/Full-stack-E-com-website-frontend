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
    <div>
      <h1>Checkout Page</h1>
      <div>
        {checkoutItems.map((item) => (
          <div key={item.id}>
            {/* <img src={item.imageUrl} alt={item.title} /> */}
            <h3>{item.title}</h3>
            <p>Price: {item.price}</p>
            <p>Quantity: {item.amount}</p>
            {/* Add additional information as needed */}
          </div>
        ))}
      </div>
      <h3>{sum}</h3>
      <button onClick={checkoutHandler}>Checkout</button>
    </div>
  );
}
