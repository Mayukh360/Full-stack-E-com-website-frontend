import React from 'react';
import './Successful.css'; // Import the CSS file for styling
import {  useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";


export default function Successful() {
  const navigate=useNavigate()
  const naviagteHandler=()=>{
    navigate('/productitem')
  }
  return (
    <div className="success-container">
      <div className="success-content">
        <svg
          className="success-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5-2 4-2 4 2 4 2" />
          <path d="M9.7 11.6L12 14l2.3-2.4" />
        </svg>
        <h2 className="success-heading">Payment Successful</h2>
        <p className="success-message">
          Thank you for your purchase! Your payment has been successfully
          processed.
        </p>
        <NavLink to="/productitem" className="visit-link">
        Visit Product Page
      </NavLink>
      </div>
      
    </div>
  );
}
