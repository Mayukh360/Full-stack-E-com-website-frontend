import React, { Fragment } from "react";
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./AuthForm.module.css";
import AuthContext from "../store/AuthContext";
import CartContext from "../Component/Store/CartContext";
import Modal from "../Component/Portal/Modal";

export default function AuthForm(props) {
  const AuthCtx = useContext(AuthContext);
  // const cartCtx=useContext(CartContext);
  const history = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const nameinputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    // localStorage.setItem('email',e);
    // const changedEmail=enteredEmail.replace("@","").replace(".","");

    const password = passwordInputRef.current.value;
    const name = nameinputRef.current.value;
    // console.log(enteredEmail,enteredPassword,enteredName);

    setIsLoading(true);
    if (!isLogin) {
      axios
        .post("http://localhost:3000/signup", { name, email, password })
        .then((response) => {
          console.log(response.data);
          const { token } = response.data;
          const {userId}=response.data
          console.log(token);
          console.log(userId)
          localStorage.setItem("userId", userId);
          localStorage.setItem("token", token);

          AuthCtx.login(token);
          history("/Ecommerce-Website-using-React");
          // Store the token in local storage or cookies
          // Perform any necessary actions after successful signup
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
          // Handle signup error
        });
    } else {
      axios
        .post("http://localhost:3000/login", { email, password })
        .then((response) => {
          const { token } = response.data;

          const userId = response.data.userId; // Replace `response.data.userId` with the actual response data containing the user ID

          AuthCtx.login(token);
          localStorage.setItem("userId", userId);
          localStorage.setItem("token", token);
          history("/Ecommerce-Website-using-React");
          // Store the token in local storage or cookies
          // Perform any necessary actions after successful login
        })
        .catch((error) => {
          console.error(error);
          // Handle login error
        });
    }
    // let url;
    // if (isLogin) {
    //   url =
    //     "http://localhost:3000/login";
    // } else {
    //   url =
    //     "http://localhost:3000/signup";
    // }
    // fetch(url, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email: enteredEmail,
    //     password: enteredPassword,
    //     returnSecureToken: true,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }).then((response) => {
    //   setIsLoading(false);
    //   if (response.ok) {
    //     return response.json();
    //   } else {
    //     //The responde holds error
    //     return response.json().then((data) => {
    //       let errorMessage = "Authentication Failed,please Check input field";

    //       throw new Error(errorMessage)
    //     });
    //   }
    // })
    // .then((data)=>{
    //   AuthCtx.login(data.idToken);

    //   AuthCtx.autoLogout();
    //   // console.log(data.idToken);
    //   history('/Ecommerce-Website-using-React');
    //  })

    // .catch((err)=>{
    //   alert(err.message);
    // })
  };

  return (
    <Fragment>
      {!AuthCtx.isLoggedIn && (
        <Modal>
          <section className={classes.auth}>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <form onSubmit={submitHandler}>
              <div className={classes.control}>
                <label htmlFor="name">Your Name</label>
                <input type="texrt" id="name" ref={nameinputRef} required />
                <label htmlFor="email">Your Email</label>
                <input type="email" id="email" ref={emailInputRef} required />
              </div>
              <div className={classes.control}>
                <label htmlFor="password">Your Password</label>
                <input
                  type="password"
                  id="password"
                  ref={passwordInputRef}
                  required
                />
              </div>

              <div className={classes.actions}>
                {!isLoading && (
                  <button>{isLogin ? "Login" : "Create Account"}</button>
                )}
                {isLoading && <p>Sending Request... </p>}
                <button
                  type="button"
                  className={classes.toggle}
                  onClick={switchAuthModeHandler}
                >
                  {isLogin
                    ? "Create new account"
                    : "Login with existing account"}
                </button>
              </div>
            </form>
          </section>{" "}
        </Modal>
      )}
      {AuthCtx.isLoggedIn && (
        <h2 className={classes.loggedInmessage}>
          You Are already logged in, Visit Product section to see our Products
        </h2>
      )}
    </Fragment>
  );
}
