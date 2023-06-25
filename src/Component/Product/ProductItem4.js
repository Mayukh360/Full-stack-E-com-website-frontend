import React, { Fragment } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from "./Product.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Prod1 from '../../assets4/prod1.avif'
import Prod2 from '../../assets4/prod2.jpg'
import Prod3 from '../../assets4/prod3.jpg'
import Prod4 from '../../assets4/prod4.jpg'
import Prod5 from '../../assets4/prod5.jpg'
import Prod6 from '../../assets4/prod6.jpg'
import Prod7 from '../../assets4/prod7.jpg'
import Prod8 from '../../assets4/prod8.jpg'

const productsArr = [
  {
    title: "Asics Shoes",
    price: 1800,
    imageUrl:
      Prod1,
    amount: 1,
  },
  {
    title: "Campus Shoes",
    price: 2200,
    imageUrl: Prod2,
    amount: 1,
  },
  {
    title: "Nike Women's Shoe",
    price: 4800,
    imageUrl: Prod3,
    amount: 1,
  },
  {
    title: "Puma Shoes",
    price: 4800,
    imageUrl: Prod4,
    amount: 1,
  },
  {
    title: "Strappy Heel",
    price: 2000,
    imageUrl: Prod5,
    amount: 1,
  },
  {
    title: "Onemix Shoes",
    price: 27000,
    imageUrl: Prod6,
    amount: 1,
  },
  {
    title: "Cole Hann Sandle",
    price: 3000,
    imageUrl: Prod7,
    amount: 1,
  },
  {
    title: "Nike Lebron",
    price: 28000,
    imageUrl: Prod8,
    amount: 1,
  },
];

export default function ProductItem4() {
  const navigate = useNavigate();

  async function btnClickHandler(item) {
    toast.dark(`${item.title} added to cart`);

    await axios.post("http://localhost:3000/getData", item, {
      headers: {
        Authorization: localStorage.getItem("token"), // Include the JWT token from local storage
      },
    });

    console.log(item);
  }
  const navigateHandler = () => {
    navigate("/accessories");
  };
  const prevnavigateHandler = () => {
    navigate("/kidsclothing");
  };
  return (
    <Fragment>
      <Container style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        <Row>
          {productsArr.map((item) => (
            <Col
              key={item.title}
              xs={12}
              md={6}
              lg={3}
              className={classes.column}
            >
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
          <span className="mx-2 bg-blue-500 text-white font-bold py-2 px-2 rounded">
            4
          </span>
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
