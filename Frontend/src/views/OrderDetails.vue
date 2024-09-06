<template>
  <div>
    <h1>ORDER DETAILS</h1>
    <div v-if="order && order.length > 0">
      <h2>Cart ID: {{ order[0].cartId }}</h2>
      <!-- Assuming all items have the same cartId -->
      <h3>ITEMS:</h3>
      <ul>
        <li v-for="item in order" :key="item.pid">
          <img :src="item.image" alt="Product Image" width="100" />
          <div class="order-details">
            <p>Product Name: {{ item.pname }}</p>
            <p>Price: ${{ item.price }}</p>
            <p>Quantity: {{ item.quantity }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Loading order details...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "OrderDetails",
  setup() {
    const order = ref([]);
    const route = useRoute();
    const router = useRouter();

    const isLoggedIn = localStorage.getItem("auth");

    if (!isLoggedIn) {
      router.push("/");
    }

    const fetchOrderDetails = async () => {
      const orderId = route.params.orderId; // get the orderId from the route params
      try {
        const response = await fetch(
          `http://10.20.2.234:8090/order/getOrderDetails?orderId=${orderId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("auth")}`,
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        order.value = data.data; // assign the data array directly to order
        console.log(order.value); // should display the array of items
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    onMounted(fetchOrderDetails);

    return {
      order,
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

h1 {
  font-size: 2.5em;
  color: #0072ff;
}

h2 {
  font-size: 1.5em;
  color: #28a745;
  font-style: italic;
}

h3 {
  font-size: 1.5em;
  color: #0072ff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  align-content: center;
  margin-left: 10%;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 3% 10%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: row;
}

img {
  margin-bottom: 10px;
  width: 25%;
}

.order-details {
  margin: auto;
  font-size: 1.5rem;
  align-self: center;
  color: #000;
  font-style: oblique;
  font-weight: 400;
}
</style>
