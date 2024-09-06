<template>
  <div class="main">
    <h1>Order History</h1>
    <div v-if="orders.length > 0" class="container">
      <ul>
        <li
          v-for="order in orders"
          :key="order.orderId"
          @click="goToOrderDetails(order.orderId)"
        >
          <p>Order ID: {{ order.orderId }}</p>
          <p>Total Price: ${{ order.totalPrice }}</p>
          <p>Date: {{ formatDate(order.date) }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No orders found.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "OrderHistory",
  setup() {
    const orders = ref([]);

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://10.20.3.79:8092/order/getAllOrders?userId=112`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        orders.value = data.data;
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const goToOrderDetails = (orderId) => {
      window.location.href = `/orderhistory/${orderId}`;
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString();
    };

    onMounted(fetchOrders);

    return {
      orders,
      fetchOrders,
      goToOrderDetails,
      formatDate,
    };
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

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  padding: 10px;
  background-color: rgba(255, 255, 255);
}

h1 {
  font-size: 2.6em;
  margin-top: 3%;
  margin-bottom: 5%;
}

.container {
  width: 90%;
  max-width: 1200px;
  background-color: rgba(255, 255, 255);
  margin: 0 auto;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 10px 0;
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  background-color: rgb(255, 255, 255);
  transition: background-color 0.3s ease;
}

li:hover {
  background-color: #ccd7f7;
}

p {
  font-size: 18px;
  margin: 0;
}

/* Responsive styles */
@media (max-width: 576px) {
  .main {
    padding: 20px;
  }

  h1 {
    font-size: 2em;
  }

  li {
    padding: 10px;
    font-size: 16px;
  }

  p {
    font-size: 16px;
  }
}

@media (min-width: 577px) and (max-width: 768px) {
  .main {
    padding: 20px;
  }

  h1 {
    font-size: 2.2em;
  }

  li {
    padding: 12px;
    font-size: 18px;
  }

  p {
    font-size: 17px;
  }
}
</style>
