<template>
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Logo-blibli-blue.svg/1200px-Logo-blibli-blue.svg.png"
    alt="Blibli logo"
  />

  <div class="checkout-container">
    <aside class="order-summary">
      <h2>ORDER SUMMARY</h2>
      <div class="summary-item" v-for="item in cartItems" :key="item.pId">
        <img
          :src="getImageUrl(item.image)"
          alt="Product Image"
          class="product-image"
        />
        <div class="product-details">
          <p class="product-name">{{ item.pName }}</p>
          <p>Price: Rs {{ item.price }}</p>
          <p>Quantity: {{ item.quantity }}</p>
        </div>
      </div>
      <div class="summary-total">
        <p class="total-price">Total Amount: Rs {{ total }}</p>
      </div>
    </aside>

    <section class="payment-details">
      <h2>SHIPPING DETAILS</h2>
      <form @submit.prevent="handleProceed">
        <div class="shipping-details">
          <label for="firstName">First Name*</label>
          <input type="text" id="firstName" />

          <label for="lastName">Last Name*</label>
          <input type="text" id="lastName" />

          <label for="address">Address Line 1*</label>
          <input type="text" id="address" />

          <label for="city">City*</label>
          <input type="text" id="city" />

          <label for="postalCode">Postal Code*</label>
          <input type="text" id="postalCode" />

          <label for="country">Country/Region</label>
          <input type="text" id="country" value="India" />
        </div>

        <h2>PAYMENT METHODS</h2>
        <div class="payment-methods">
          <label for="payment"> Credit/Debit Card </label>
          <input
            type="radio"
            name="payment"
            value="card"
            v-model="selectedPaymentMethod"
          />
          <label>
            UPI
            <input
              type="radio"
              name="payment"
              value="upi"
              v-model="selectedPaymentMethod"
            />
          </label>
          <label>
            Cash on Delivery (COD)
            <input
              type="radio"
              name="payment"
              value="cod"
              v-model="selectedPaymentMethod"
            />
          </label>
        </div>

        <div v-if="selectedPaymentMethod === 'card'" class="card-details">
          <label for="cardNumber">Card Number*</label>
          <input
            type="text"
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
          />

          <label for="expiryDate">Expiry Date*</label>
          <input type="text" id="expiryDate" placeholder="MM/YY" />

          <label for="cvv">CVV*</label>
          <input type="text" id="cvv" placeholder="123" />
        </div>

        <div v-if="selectedPaymentMethod === 'upi'" class="upi-details">
          <label for="upiId">UPI ID*</label>
          <input type="text" id="upiId" placeholder="example@upi" />
        </div>
        <button type="submit" class="proceed-button" @click="checkOut">
          CONTINUE TO BILLING
        </button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [],
      total: 0,
      selectedPaymentMethod: "",
    };
  },
  mounted() {
    this.fetchCartData();
  },

  methods: {
    async fetchCartData() {
      try {
        const response = await fetch(
          "http://10.20.3.79:8092/cart/getItems?cartId=112"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Fetched Data:", result);

        if (result.success && Array.isArray(result.data)) {
          this.cartItems = result.data.map((item) => ({
            pId: item.pId,
            pName: item.pName,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
          }));
        } else {
          console.error("Unexpected data format:", result);
        }

        this.calculateTotal();
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    },
    calculateTotal() {
      this.total = this.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
    handleProceed() {
      this.$router.push("/thank");
    },
    getImageUrl(image) {
      const match = image.match();
      return match
        ? `https://drive.google.com/uc?export=view&id=${match[0]}`
        : image;
    },
    async checkOut() {
      const url = `http://10.20.3.79:8092/cart/checkout?cartId=112`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      let data = await response.json();
      console.log(data);
    },
  },
};
</script>

<style scoped>
img {
  max-width: 150px;
  height: auto;
  margin-bottom: 2px;
  margin-top: 5px;
  margin-left: 20px;
}
h2 {
  margin-bottom: 12px;
  margin-top: 4px;
}
.checkout-container {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.order-summary {
  width: 35%;
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  overflow-y: auto;
  max-height: 600px;
}

.summary-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-right: 15px;
}

.product-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.product-name {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 5px;
}

.summary-total {
  margin-top: 20px;
  font-weight: bold;
  color: #003366;
}

.total-price {
  color: red;
}

.payment-details {
  width: 60%;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
}

.shipping-details label,
.payment-methods label {
  display: block;
  margin: 10px 0 5px;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 7px;
}

.proceed-button {
  width: 100%;
  padding: 10px;
  background-color: #003366;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}
</style>
