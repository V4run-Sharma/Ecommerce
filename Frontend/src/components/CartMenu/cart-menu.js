import { defineComponent, ref } from "vue";

import useCartStore from "@/stores/cart";

export default defineComponent({
  setup() {
    const cartItemsInStore = ref([]);
    const cartStore = useCartStore();

    const fetchCartItems = () => {
      cartItemsInStore.value = cartStore.cart;
    };
    fetchCartItems();

    const updateQuantity = (pId, quantity, sId) => {
      cartStore.updateQuantity(pId, quantity, sId);
    };

    const deleteItem = (pId, sId) => {
      cartStore.deleteItem(pId, sId);
    };

    return {
      cartItemsInStore,
      cartCount: cartItemsInStore.value.length,
      updateQuantity,
      deleteItem,
    };
  },
});
