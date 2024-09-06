<template>
  <div class="main-section">
    <div v-if="product" class="product-detail">
      <img class="product-image" :src="product.image" alt="Product Image" />
      <div class="product-info">
        <h2 class="product-name">{{ product.pname }}</h2>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-stock">
          Price:
          <span class="highlighted-price">${{ selectedSeller.price }}</span>
        </p>
        <h4>USP:</h4>
        <ul class="product-usps">
          <li v-for="usp in product.usp" :key="usp">{{ usp }}</li>
        </ul>
        <h4>Attributes:</h4>
        <div class="product-attributes">
          <ul>
            <li v-for="attribute in product.attribute" :key="attribute">
              {{ attribute }}
            </li>
          </ul>
        </div>
        <div class="seller-info">
          <label for="seller">Choose a seller:</label>
          <select v-model="selectedSeller">
            <option
              v-for="seller in product.seller"
              :key="seller.sid"
              :value="seller"
            >
              {{ seller.sName }} - ${{ seller.price }}
              {{ seller.stock < 1 ? " - Out of Stock" : "" }}
              {{
                seller.stock < 5 && seller.stock > 0
                  ? " - Running out soon"
                  : ""
              }}
            </option>
          </select>
        </div>

        <div class="action-buttons">
          <button class="add-to-cart-btn" @click="addToCart">
            Add to Cart
          </button>
          <button class="checkout-btn" @click="goToCheckout">Checkout</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading product details...</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "ProductDetail",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const product = ref(null);
    const selectedSeller = ref(null);

    const fetchProductDetails = async (pid) => {
      try {
        const response = await fetch(`http://10.20.3.216:8090/product/${pid}`);
        const data = await response.json();
        if (data.success) {
          product.value = data.data;
          selectedSeller.value = product.value.seller[0];
          console.log(selectedSeller.value);
        } else {
          console.error("Error fetching product:", data.error);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    const addToCart = async () => {
      const url = `http://10.20.3.79:8092/cart/addItem?cartId=112`;
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pId: product.value.pid,
            sId: selectedSeller.value.sid,
            quantity: 1,
          }),
        });
        const data = await res.json();
        if (data.success) {
          console.log("Product added");
        } else {
          console.error("Error while im adding to cart:", data.error);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    const goToCheckout = () => {
      router.push("/payment");
    };

    onMounted(() => {
      const { id } = route.params;
      fetchProductDetails(id);
    });

    return {
      product,
      selectedSeller,
      addToCart,
      goToCheckout,
    };
  },
});
</script>

<style scoped>
.main-section {
  width: 100%;
  height: 100vh;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: rgb(0, 114, 255, 0.1);
  margin: 0;
}

.product-detail {
  display: flex;
  flex-direction: row;
  gap: 1%;
  padding: 2rem;
  background-color: white;
  width: fit-content;
  max-width: 85%;
  max-height: 80%;
  height: fit-content;
  border-radius: 0.5rem;
  border: 0.7px solid #000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.product-image-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  max-width: 150px;
  height: auto;
  margin-bottom: 2px;
  margin-top: 5px;
  margin-left: 20px;
}

.product-image {
  width: 30%;
  object-fit: cover;
  border-radius: 0.5rem;
}

.product-info {
  margin-top: 2%;
  flex: 1;
  align-items: flex-start;
  margin-left: 7%;
  display: flex;
  flex-direction: column;
  align-self: center;
  width: fit-content;
}

.product-name {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-align: center;
  color: #0072ff;
}

h4 {
  color: #0072ff;
  font-size: 1.3rem;
  margin-bottom: 0px;
}
.product-description {
  display: flex;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  justify-content: flex-start;
  text-align: left;
  align-items: center;
}

.product-usps {
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.product-attributes {
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.seller-info {
  width: fit-content;
  height: fit-content;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: #0072ff;
  font-weight: bold;
}
.seller-info label,
h4 {
  color: #0072ff;
  margin-bottom: 0px;
}
select {
  font-size: large;
  border-radius: 0.5rem;
  margin: 2px;
}

.product-stock {
  font-size: 2rem;
  font-weight: bold;
  color: red;
  margin-bottom: 0.5rem;
}

.stock-warning {
  color: red;
  font-weight: bold;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.add-to-cart-btn,
.checkout-btn {
  padding: 0.75rem 1.5rem;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart-btn {
  background-color: #007bff;
}

.add-to-cart-btn:hover {
  background-color: #0056b3;
}

.checkout-btn {
  background-color: #28a745;
}

.checkout-btn:hover {
  background-color: #218838;
}

@media (max-width: 576px) {
  .product-detail {
    flex-direction: column;
    padding: 1rem;
  }

  .product-image {
    width: 100%;
    margin-bottom: 1rem;
  }

  .product-info {
    margin-left: 0;
    text-align: center;
  }

  .add-to-cart-btn {
    width: 100%;
  }
}

@media (min-width: 577px) and (max-width: 768px) {
  .product-detail {
    flex-direction: column;
    max-height: fit-content;
    padding: 1.5rem;
  }

  .product-image {
    width: 100%;
    margin-bottom: 1.5rem;
  }

  .product-info {
    margin-left: 0;
  }

  .add-to-cart-btn {
    width: 100%;
  }
}

@media (min-width: 769px) {
  .product-detail {
    flex-direction: row;
  }

  .product-image {
    width: 30%;
  }

  .product-info {
    margin-left: 2rem;
  }
}
</style>
