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

    const updateQuantity = (cId, pId, quantity, sId) => {
      console.log(cId, pId, quantity, sId);
      cartStore.updateQuantity(cId, pId, quantity, sId);
    };

    const deleteItem = (pId, sId) => {
      cartStore.deleteItem(pId, sId);
    };

    return {
      cartItemsInStore,
      updateQuantity,
      deleteItem,
    };
  },
});
