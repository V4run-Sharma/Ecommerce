<template>
  <div class="profile-menu-wrapper">
    <p class="profile-menu-item">Orders</p>
    <p class="profile-menu-item">Logout</p>
  </div>
</template>

<script src="./profile-menu.js"></script>

<style scoped>
.profile-menu-wrapper {
  background-color: #0072ff;
  display: flex;
  width: fit-content;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 1rem;
  padding: 1rem;
  box-shadow: -0.5rem 0.5rem 1rem 0.25rem #00000033;
}

.profile-menu-item {
  color: white;
  cursor: pointer;
}
</style>
