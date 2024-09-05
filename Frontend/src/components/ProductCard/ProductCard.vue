<template>
  <div class="product-card" @click.stop="goToDetails(product.pid)">
    <img class="product-image" :src="product.image" :alt="product.title" />
    <div class="product-details">
      <h4 class="product-name">
        {{ product.pname }}
      </h4>
      <div class="product-price-action">
        <p class="product-price">${{ product.minPrice }}</p>
        <button
          class="add-to-cart-btn"
          @click.stop="addToCart(product.pid, product.minSId, product.quantity)"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script src="./product-card.js"></script>

<style scoped>
.product-card {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  border: 2px solid #ccc;
  padding: 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s;
}

.product-card:hover {
  border-color: #007bff;
}

.product-image {
  width: 100%;
  object-fit: contain;
}

.product-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.5rem;
}

.product-name {
  font-weight: normal;
  line-break: anywhere;
}

.product-price-action {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-weight: bold;
}

.add-to-cart-btn {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.3s;
}

.add-to-cart-btn:hover {
  cursor: pointer;
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .product-card {
    width: 45%;
  }
  .product-image {
    height: 150px;
  }
  .product-details {
    gap: 0.25rem;
  }
  .product-price-action {
    flex-direction: column;
    align-items: start;
    gap: 0.25rem;
  }
  .product-name {
    font-size: 0.75rem;
    line-break: anywhere;
  }
  .product-price {
    font-size: 1rem;
  }
}
</style>
