<template>
  <section class="products-wrapper">
    <h1>Products</h1>
    <div class="products">
      <ProductCard
        v-for="product in productsInStore"
        :key="product.id"
        :product="product"
        class="product-card"
      />
    </div>
  </section>
</template>

<script src="./products.js"></script>

<style scoped>
.products-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 2rem;
}

.products {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

@media (max-width: 768px) {
  .products-wrapper {
    padding: 0.5rem;
    gap: 1rem;
  }
  .products {
    gap: 1rem;
  }
}
</style>
