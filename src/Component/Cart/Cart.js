import React, { useState, useEffect } from "react";
import Modal from "../Portal/Modal";
import classes from "./Cart.module.css";
import axios from "axios";

import CartItem from "./CartItem";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



export default function Cart(props) {
  const [productList, setProductList] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const navigate=useNavigate()

   const userId=localStorage.getItem('userId');

  async function fetchData() {
    const response = await axios.get("http://localhost:3000/getData");
    const data=response.data;
    if (data) {
      const productList = Object.keys(data).map((key) => {
        const item = data[key];
        // Add the condition to filter based on userId
        // eslint-disable-next-line
        if (item.userId == userId) {
          return {
            id: item.id,
            name: item.title,
            price: Number(item.price),
            image: item.imageUrl,
            amount: item.amount,
            userId: item.userId
          };
        }
        return null;
      }).filter(Boolean); // Remove any null values from the array
    
      setProductList(productList);
      console.log(productList);
    } else {
      setProductList([]);
    }
  }

  useEffect(() => {
    fetchData();
    // console.log('Cart is executed');
  }, []);
  //***** */

  async function cartItemRemoveHandler(id) {
    console.log(id);
    try {
      await axios.delete(
        `http://localhost:3000/getData/${id}`
      );
      fetchData();
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  }
  async function cartItemAddHandler(id){
    try {
      await axios.put(
        `http://localhost:3000/addData/${id}`
      );
      fetchData();
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  }
  async function cartItemDecreaseHandler(id){
    try {
      await axios.put(
        `http://localhost:3000/removeData/${id}`
      );
      fetchData();
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  }

  const sum = productList.reduce((total, item) => {
    return total + item.price*item.amount;
  }, 0);
  

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {productList.map((item) => (
        <CartItem
          image={item.image}
          price={item.price}
          amount={item.amount}
          name={item.name}
          key={item.id}
          onRemove={() => cartItemRemoveHandler(item.id)}
          onAdd={() => cartItemAddHandler(item.id)}
          onDecrease={() => cartItemDecreaseHandler(item.id)}
        ></CartItem>
      ))}
    </ul>
  );

  async function orderPlaceHandler() {
    if (productList.length === 0) return;
     navigate('/checkout')
     props.onHide();
    
  }

  const hasItem = productList.length > 0;
  return (
    <Modal onHide={props.onHide}>
      {cartItems}
      <div className={classes.total}>
        <span>Total</span>
        <span>{sum}₹</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onHide} className={classes["button--alt"]}>
          Close
        </button>

        {hasItem && (
          <button onClick={orderPlaceHandler} className={classes.button}>
            Order{" "}
          </button>
        )}
      </div>
      <Alert
        variant="success"
        show={showAlert}
        onClose={() => setShowAlert(false)}
        dismissible
      >
        Thanks for shopping with us! Please visit us again.
      </Alert>
    </Modal>
  );
}
