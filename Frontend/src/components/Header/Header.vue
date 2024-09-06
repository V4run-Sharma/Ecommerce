<template>
  <section class="header-wrapper">
    <div class="ham-toggle">
      <img
        v-if="isMobileMenuOpen"
        @click="toggleMobileMenu"
        src="@/assets/x.svg"
        alt="Close Menu"
        class="close-icon"
      />
      <img
        v-else
        @click="toggleMobileMenu"
        src="@/assets/menu.svg"
        alt="menu"
        class="menu-icon"
      />
    </div>

    <div class="mobile-menu-wrapper">
      <MobileMenu v-if="isMobile && isMobileMenuOpen" :cartCount="cartCount" />
    </div>

    <div class="logo-wrapper">
      <img src="@/assets/blibli.webp" alt="logo" />
    </div>

    <div class="search-wrapper">
      <input
        type="text"
        placeholder="Search"
        v-model="keyword"
        @input="search(keyword)"
      />
    </div>

    <div v-if="isLoggedIn" class="profile-wrapper">
      <div @click="toggleCartMenu" class="cart-wrapper">
        <img src="@/assets/cart.svg" alt="Cart" class="cart-icon" />
        <div class="cart-count">{{ cartCount }}</div>
      </div>
      <p @click="toggleProfileMenu" class="profile-name">
        Hello, {{ userName }}
      </p>

      <div class="cart-menu-wrapper">
        <CartMenu v-if="isCartMenuOpen" />
      </div>

      <div class="profile-menu-wrapper">
        <ProfileMenu v-if="isProfileMenuOpen" />
      </div>
    </div>

    <div v-else class="login-wrapper">
      <router-link to="/login">Login</router-link>
    </div>
  </section>
</template>

<script src="./header.js"></script>

<style scoped>
.header-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: #0072ff;
}

.ham-toggle {
  display: none;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.menu-icon,
.close-icon {
  width: 1.5rem;
}

.mobile-menu-wrapper {
  display: none;
  position: absolute;
  top: 110%;
  left: 6;
  z-index: 1;
  width: fit-content;
  border-radius: 0.5rem;
}

.logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-wrapper img {
  height: clamp(1.125rem, 10vw, 2.25rem);
  margin-top: -2px;
}

.search-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-wrapper input {
  width: clamp(10rem, 25vw, 20rem);
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  transition: all 0.3s;
}

.search-wrapper input:focus {
  outline: none;
  background: #cfe0ff;
}

.profile-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
}

@media (max-width: 768px) {
  .ham-toggle {
    display: flex;
  }

  .mobile-menu-wrapper {
    display: flex;
  }

  .logo-wrapper img {
    display: none;
  }

  .profile-wrapper {
    display: none;
  }
}

.cart-wrapper {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s;
  border-radius: 0.5rem;
}

.cart-wrapper:hover {
  cursor: pointer;
  background-color: #cfe0ff;
}

.cart-icon {
  width: 2.5rem;
}

.cart-count {
  position: absolute;
  top: 6px;
  right: 6px;
  background-color: red;
  color: white;
  border-radius: 999px;
  padding: 3px;
  font-size: 10px;
  font-weight: bolder;
}

.profile-name {
  padding: calc(0.5rem + 2px);
  background-color: white;
  font-weight: bold;
  border-radius: 0.5rem;
  transition: all 0.3s;
}

.profile-name:hover {
  cursor: pointer;
  background-color: #cfe0ff;
}

.cart-menu-wrapper {
  position: absolute;
  top: 110%;
  right: 4px;
  z-index: 1;
  width: fit-content;
  border-radius: 0.5rem;
}

.profile-menu-wrapper {
  position: absolute;
  top: 110%;
  right: 4px;
  z-index: 1;
  width: fit-content;
  border-radius: 0.5rem;
}

.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
}

.login-wrapper a {
  text-decoration: none;
  padding: 0.5rem 1rem;
  background-color: white;
  color: black;
  font-weight: 700;
  border: 2px solid #0072ff;
  border-radius: 0.5rem;
  transition: all 0.3s;
}
</style>
