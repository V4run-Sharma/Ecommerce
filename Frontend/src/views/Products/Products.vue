<template>
  <section class="products-wrapper">
    <div class="banner-carousel">
      <img
        class="banner-image"
        src="https://fundamental.in/wp-content/uploads/2021/03/ps5-banner-1024x375.png"
        alt="Banner"
      />
    </div>
    <div class="products">
      <ProductCard
        v-for="product in productsInStore"
        :key="product.pid"
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

.banner-carousel {
  width: 100%;
  display: flex;
  justify-content: center;
  box-shadow: 0 0.25rem 1rem 9px #00000033;
  border-radius: 1rem;
}

.banner-image {
  width: 100%;
  border-radius: 1rem;
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
