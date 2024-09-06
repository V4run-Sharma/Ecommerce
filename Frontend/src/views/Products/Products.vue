<template>
  <section class="products-wrapper">
    <div class="banner-carousel">
      <Swiper :space-between="50" :slides-per-view="1" :loop="true">
        <SwiperSlide v-for="(image, index) in images" :key="index">
          <img :src="image.src" :alt="image.alt" class="carousel-image" />
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="products">
      <ProductCard
        v-if="!noProductsFound"
        v-for="product in searchProductsInStore"
        :key="product.pid"
        :product="product"
        class="product-card"
      />
      <h2 v-else>No Products Found</h2>
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
  z-index: 0;
  /* display: flex;
  justify-content: center;
  align-items: start; */
  width: 100%;
  height: 20rem;
  margin: 0 auto;
  box-shadow: 0 0.25rem 1rem 9px #00000033;
  border-radius: 1rem;
}

.carousel-image {
  z-index: 0;
  width: 100%;
  max-height: 20rem;
  display: block;
  object-fit: cover;
  border-radius: 1rem;
}

/* .banner-carousel {
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-x: scroll;
  scrollbar-width: none;
  gap: 1rem;
}

.banner-image {
} */

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
