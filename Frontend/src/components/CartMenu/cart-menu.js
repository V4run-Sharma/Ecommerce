import { defineComponent, ref } from "vue";

import useCartStore from "@/stores/cart";

export default defineComponent({
  setup() {
    const cartItemsInStore = ref([]);
    const quantities = ref([
      {
        pId: "",
        quantity: 0,
      },
    ]);
    const cartStore = useCartStore();

    const fetchCartItems = () => {
      cartItemsInStore.value = cartStore.cart;
      console.log(cartItemsInStore.value);
    };
    fetchCartItems();

    const fetchQuantities = () => {
      for (let i = 0; i < cartItemsInStore.value.length; i++) {
        quantities.value[cartItemsInStore.value[i].pId] =
          cartItemsInStore.value[i].quantity;
      }
      console.log(quantities.value);
    };
    fetchQuantities();

    const updateQuantity = (cartId, pId, quantity, sId) => {
      console.log(cartId, pId, quantity, sId);
      quantities.value[pId] = quantity;
      cartStore.updateQuantity(cartId, pId, quantity, sId);
    };

    const deleteItem = (pId, sId) => {
      cartStore.deleteItem(pId, sId);
    };

    const toCheckOut = () => {
      cartStore.toCheckOut();
    };

    const orderHistory = (uId) => {
      cartStore.orderHistory(uId);
    };

    return {
      cartItemsInStore,
      updateQuantity,
      deleteItem,
      toCheckOut,
      orderHistory,
      quantities,
    };
  },
});
