<template>
  <div class="main-container">
    <div class="payment-page">
      <h1>PAYMENT</h1>

      <div class="products-list">
        <div class="product" v-for="(product, index) in products" :key="index">
          <img :src="product.image" alt="product image" class="product-image" />
          <div class="product-details">
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p>Price: ₹{{ product.price.toFixed(2) }}</p>
            </div>
            <div class="product-info2">
              <p>Quantity: {{ product.quantity }}</p>
              <p>Total: ₹{{ (product.price * product.quantity).toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="total">
        <h2>Total Amount: ₹{{ totalPrice.toFixed(2) }}</h2>
      </div>

      <div class="payment-method">
        <label>
          <input type="radio" v-model="paymentMethod" value="card" />
          Pay by Card
        </label>
        <label>
          <input type="radio" v-model="paymentMethod" value="cod" />
          Cash on Delivery
        </label>
      </div>

      <div class="payment-details" v-if="paymentMethod === 'card'">
        <h2>Enter Payment Details</h2>
        <form @submit.prevent="processPayment">
          <label for="cardholder-name">Cardholder Name:</label>
          <input
            v-model="paymentDetails.cardholderName"
            type="text"
            id="cardholder-name"
            required/>

          <label for="card-number">Card Number:</label>
          <input
            v-model="paymentDetails.cardNumber"
            type="text"
            id="card-number"
            required
            maxlength="16"
            placeholder="1234 5678 9012 3456"/>

          <label for="expiry-date">Expiry Date:</label>
          <input
            v-model="paymentDetails.expiryDate"
            type="text"
            id="expiry-date"
            required
            maxlength="5"
            placeholder="MM/YY"/>

          <label for="cvv">CVV:</label>
          <input
            v-model="paymentDetails.cvv"
            type="text"
            id="cvv"
            required
            maxlength="3"
            placeholder="123"/>

          <button type="submit" class="payment-button">
            Pay ₹{{ totalPrice.toFixed(2) }}
          </button>
        </form>
      </div>

      <div v-if="paymentMethod === 'cod'">
        <h2>Cash on Delivery Selected</h2>
        <button @click="confirmCOD" class="payment-button">
          Confirm COD
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
const router = useRouter();

const products = ref([
  {
    name: "Product 1",
    price: 2999,
    quantity: 1,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Product 2",
    price: 1999,
    quantity: 2,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Product 3",
    price: 4999,
    quantity: 1,
    image: "https://via.placeholder.com/150",
  },
]);

const totalPrice = ref(
  products.value.reduce((sum, product) => sum + product.price * product.quantity, 0)
);

const paymentDetails = ref({
  cardholderName: "",
  cardNumber: "",
  expiryDate: "",
  cvv: "",
});

const paymentMethod = ref("card");

function processPayment() {
  if (
    paymentDetails.value.cardholderName &&
    paymentDetails.value.cardNumber &&
    paymentDetails.value.expiryDate &&
    paymentDetails.value.cvv
  ) {
    alert(`Payment of ₹${totalPrice.value.toFixed(2)} processed successfully!`);
    router.push('/thank');
  } else {
    alert("Please fill in all payment details.");
  }
}

function confirmCOD() {
  alert("Cash on Delivery selected. Order will be paid at delivery.");
  router.push('/thank');
}
</script>

<style scoped>
h1 {
  margin: 10px;
  font-size: 35px;
}

.main-container {
  background-image: url("https://t3.ftcdn.net/jpg/09/17/90/72/360_F_917907209_a0QdDLtQhOGD5PF4IbiEM8xvNWOLYGBg.jpg");
  background-repeat: repeat;
}

.payment-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.products-list {
  margin: 10px;
}

.product {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: #d9edff;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.product-details {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.product-info {
  text-align: left;
  font-size: 18px;
  margin: 10px;
}

.product-info2 {
  text-align: right;
  font-size: 18px;
  margin: 10px;
}

.total {
  font-size: 1.4em;
  margin-bottom: 20px;
}

.payment-method {
  margin-bottom: 20px;
}

.payment-method label {
  margin-right: 15px;
}

.payment-details form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #d9edff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.payment-details label {
  font-size: 1em;
  text-align: left;
}

.payment-details input {
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.payment-button {
  padding: 10px 20px;
  background-color: #bdb6eb;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2em;
}

.payment-button:hover {
  background-color: #FFD981;
}
</style>
