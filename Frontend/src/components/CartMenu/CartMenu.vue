<template>
  <article class="cart-menu-wrapper">
    <div
      class="cart-item"
      v-for="cartItem in cartItemsInStore"
      :key="cartItem._id"
    >
      <img :src="cartItem.image" alt="cart item" />
      <div class="cart-item-details">
        <div class="item-detials">
          <p class="cart-item-name">
            {{ cartItem.pName }}
          </p>
          <p class="cart-item-price">${{ cartItem.price }}</p>
        </div>
        <div class="item-amount">
          <div class="change-amount">
            <button
              :disabled="cartItem.quantity === 1"
              @click="
                updateQuantity(
                  // cartItem.cartId,
                  cartItem._id,
                  cartItem.quantity - 1,
                  cartItem.sId
                )
              "
            >
              -
            </button>
            <p>{{ cartItem.quantity }}</p>
            <button
              :disabled="cartItem.quantity === cartItem.stock"
              @click="
                updateQuantity(
                  // cartItem.cartId,
                  cartItem._id,
                  cartItem.quantity + 1,
                  cartItem.sId
                )
              "
            >
              +
            </button>
          </div>
          <div class="delete-item">
            <button @click="deleteItem(cartItem.pid, cartItem.sid)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="checkout-wrapper">
      <button class="checkout-btn" @click="toPayment">
        Proceed to Payment
      </button>
    </div>
  </article>
</template>

<script src="./cart-menu.js"></script>

<style scoped>
.cart-menu-wrapper {
  background-color: white;
  display: flex;
  max-width: 50rem;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 2px solid lightgrey;
  box-shadow: -0.5rem 0.5rem 1rem 0.25rem #00000033;
}

.cart-item {
  display: flex;
  gap: 1rem;
}

.cart-item img {
  width: 5rem;
  height: 5rem;
  object-fit: contain;
  border-radius: 0.5rem;
}

.cart-item-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
}

.item-detials {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
}

.cart-item-name {
  font-size: 0.75rem;
  font-weight: bold;
}

.cart-item-price {
  font-size: 1rem;
}

.item-amount {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.change-amount {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.change-amount button {
  background-color: #0072ff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  transition: all 0.3s;
}

.change-amount button:disabled {
  opacity: 0.7;
}

.change-amount button:hover {
  cursor: pointer;
  background-color: #0056b3;
}

.delete-item button {
  background-color: rgb(239, 58, 58);
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  transition: all 0.3s;
}

.delete-item button:hover {
  cursor: pointer;
  background-color: rgb(204, 0, 0);
}

hr {
  width: 100%;
  border: 1px solid lightgrey;
}

.checkout-wrapper {
  display: flex;
}

.checkout-btn {
  background-color: #0072ff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  transition: all 0.3s;
}

.checkout-btn:hover {
  cursor: pointer;
  background-color: #0056b3;
}
</style>
