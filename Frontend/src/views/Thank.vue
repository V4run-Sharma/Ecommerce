<template>
    <div class="bg">
      <div class="container">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Logo-blibli-blue.svg/1200px-Logo-blibli-blue.svg.png" alt="Blibli logo">
        <h1>Thank You!</h1>
        <h2>Your Order has been placed successfully.</h2><br><br>
        <h4>An email receipt including the details about your order has been sent to the email address provided. Please keep it for your records.</h4>
        <h4>You can also visit the My Account page at any time to check the status of your order, or access your order history.</h4>
        <div class="contact-button">
          <button @click="openEmailClient">Contact for any query</button>
        </div>
        <div class="contact-button">
          <button @click="openOrderHistory">Show Order History</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
   import { useRouter } from 'vue-router';
   const router = useRouter();

  const openEmailClient = () => {
    window.location.href = 'mailto:customer.care@blibli.com';
  };
  const openOrderHistory = () => {
     router.push("/history")
  };
  </script>
  
  <style scoped>
  .bg {
    width: 100vw;
    height: 100vh;
    background-image: url("../assets/thankyou.jpg");
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    font-family: 'Helvetica Neue', sans-serif, sans-serif;
    height: 400px;
    width: fit-content;
    border: 1px solid #0072ff;
    border-radius: 1rem;
    background-color: #fcfcfc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  img {
    max-width: 100px;
    height: auto;
    margin-bottom: 20px;
  }
  
  h1 {
    font-size: 32px;
    color: #000;
    margin: 10px 0;
  }
  
  h2 {
    font-size: 20px;
    color: #0072ff;
    margin: 10px 0;
  }
  
  h4 {
    font-size: 16px;
    color: #000;
    margin: 10px 0;
    line-height: 1.5;
  }
  h4{
    font-style: italic;
    font-weight: 300;
  }
  .contact-button {
    margin-top: 20px;
  }
  
  .contact-button button {
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #0072ff;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .contact-button button:hover {
    background-color: #0056b3;
  }
  </style>
  