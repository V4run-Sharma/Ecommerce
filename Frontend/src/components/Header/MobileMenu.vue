<template>
  <div class="mobile-menu-wrapper">
    <div class="logo-wrapper">
      <img src="@/assets/blibli.webp" alt="logo" />
    </div>
    <div class="mobile-profile-wrapper">
      <p class="mobile-profile-name">Hello, {{ userName }}</p>
      <p class="mobile-cart">Cart ({{ cartCount }})</p>
      <p class="view-order-history">Orders</p>
    </div>
  </div>
</template>

<script src="./mobile-menu.js"></script>

<style scoped>
.mobile-menu-wrapper {
  background-color: #0072ff;
  display: flex;
  width: fit-content;
  flex-direction: column;
  align-items: st;
  justify-content: start;
  padding: 0.75rem 1.5rem 0.75rem 0.75rem;
}

.logo-wrapper {
  padding-bottom: 0.75rem;
}

.logo-wrapper img {
  height: clamp(1.125rem, 10vw, 2.25rem);
}

.mobile-profile-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}

.mobile-profile-name {
  color: white;
  font-size: 1rem;
  margin: 0.5rem 0;
}

.mobile-cart {
  color: white;
  font-size: 1rem;
  margin: 0.5rem 0;
}

.view-order-history {
  color: white;
  font-size: 1rem;
  margin: 0.5rem 0;
}
</style>
