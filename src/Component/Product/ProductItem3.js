import React, { Fragment } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from './Product.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Prod1 from '../../assets3/Spider.webp'
import Prod2 from '../../assets3/prod2.webp'
import Prod3 from '../../assets3/prod3.webp'
import Prod4 from '../../assets3/prod4.webp'
import Prod5 from '../../assets3/prod5.webp'
import Prod6 from '../../assets3/prod6.webp'
import Prod7 from '../../assets3/prod7.webp'
import Prod8 from '../../assets3/prod8.jpg'


const productsArr = [
  
  {
    title: "Spiderman Hoodie",
    price: 999,
    imageUrl:
      Prod1,
    amount: 1,
  },
  {
    title: "T-Shirt Pack of Three",
    price: 100,
    imageUrl:
      Prod2,
    amount: 1,
  },
  {
    title: "Blue Denim Dress",
    price: 1900,
    imageUrl:
      Prod3,
    amount: 1,
  },
  {
    title: "Pink Ghagra Choli ",
    price: 100,
    imageUrl:
      Prod4,
    amount: 1,
  },
  {
    title: "Blue T-Shirt ",
    price: 1500,
    imageUrl:
      Prod5,
    amount: 1,
  },
  {
    title: "Peach regular Jumpsuit",
    price: 1000,
    imageUrl:
      Prod6,
    amount: 1,
  },
  {
    title: "Blue Dress",
    price: 900,
    imageUrl:
      Prod7,
    amount: 1,
  },
  {
    title: "White Top",
    price: 1100,
    imageUrl:
      Prod8,
    amount: 1,
  },
  
  
  
];

export default function ProductItem3() {
  
   const navigate=useNavigate();

   async function btnClickHandler(item) {
    toast.dark(`${item.title} added to cart`);

    await axios.post("http://localhost:3000/getData", item, {
      headers: {
        Authorization: localStorage.getItem("token"), // Include the JWT token from local storage
      },
    });

    console.log(item)
}
  const navigateHandler=()=>{
    navigate('/shoes')
  }
  const prevnavigateHandler=()=>{
    navigate('/womensclothing');
  }
  return (
    <Fragment>
      <Container style={{marginBottom:"1rem", marginTop:"1rem"}}>
    
        <Row>
          {productsArr.map((item) => (
            <Col key={item.title} xs={12} md={6} lg={3} className={classes.column}>
              <div>
                <h3>{item.title}</h3>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{ height: "200px", width: "200px" }}
                />
                <div>
                  <p>
                    {" "}
                    Price: {item.price} Quantity: {item.amount}
                  </p>
                  <Button
                    onClick={() => btnClickHandler(item)}
                    variant="success"
                  >
                    Add To Cart
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={prevnavigateHandler}
            className="mr-2 bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded  border-2 border-gray-500"
          >
            Previous
          </button>
          <span className="mx-2 bg-blue-500 text-white font-bold py-2 px-2 rounded">3</span>
          <button
            onClick={navigateHandler}
            className="ml-2 bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded  border-2 border-gray-500"
          >
            Next
          </button>
        </div>
      
      </Container>
      <ToastContainer />
    </Fragment>
  );
}
