import { defineComponent, ref } from "vue";

import useCartStore from "@/stores/cart";

export default defineComponent({
  setup() {
    const cartItemsInStore = ref([]);
    const cartStore = useCartStore();

    const fetchCartItems = () => {
      cartItemsInStore.value = cartStore.cart;
      console.log(cartItemsInStore.value);
    };
    fetchCartItems();

    const updateQuantity = (cId, pid, quantity, sid) => {
      console.log(cId, pid, quantity, sid);
      cartStore.updateQuantity(cId, pid, quantity, sid);
    };

    const deleteItem = (pid, sid) => {
      cartStore.deleteItem(pid, sid);
    };

    return {
      cartItemsInStore,
      cartCount: cartItemsInStore.value.length,
      updateQuantity,
      deleteItem,
    };
  },
});
