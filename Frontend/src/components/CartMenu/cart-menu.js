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

    return {
      cartItemsInStore,
      cartCount: cartItemsInStore.value.length,
    };
  },
});
