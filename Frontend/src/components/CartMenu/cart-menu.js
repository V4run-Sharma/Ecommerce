import { computed, defineComponent, ref } from "vue";

import useCartStore from "@/stores/cart";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const cartItemsInStore = computed(() => {
      console.log(useCartStore().cart);
      return useCartStore().cart;
    });

    const quantities = ref([
      {
        _id: "",
        quantity: 0,
      },
    ]);
    const cartStore = useCartStore();

    // const fetchCartItems = () => {
    //   cartStore.getAllCartItems();
    //   cartItemsInStore.value = cartStore.cart;
    //   console.log(cartItemsInStore.value);
    // };
    // fetchCartItems();

    const fetchQuantities = () => {
      for (let i = 0; i < cartItemsInStore.value.length; i++) {
        quantities.value.push({
          _id: cartItemsInStore.value[i]._id,
          quantity: cartItemsInStore.value[i].quantity,
        });
      }
    };
    fetchQuantities();

    const updateQuantity = async (_id, quantity, sId) => {
      console.log(_id, quantity, sId);
      cartItemsInStore.value = cartItemsInStore.value.find(
        (item) => item._id === _id
      ).quantity = quantity;
      quantities.value = quantities.value.find(
        (item) => item._id === _id
      ).quantity = quantity;
      // quantities.value[_id] = quantity;
      // const response = await cartStore.updateQuantity(
      //   cartId,
      //   pId,
      //   quantity,
      //   sId
      // );
      // if (response.success) {
      //   fetchCartItems();
      //   fetchQuantities();
      // }
    };

    const deleteItem = async (pId, sId) => {
      const response = await cartStore.deleteItem(pId, sId);
      if (response.success) {
        fetchCartItems();
        fetchQuantities();
      }
    };

    const toPayment = () => {
      router.push("/payment");
    };

    const orderHistory = (uId) => {
      cartStore.orderHistory(uId);
    };

    return {
      cartItemsInStore,
      updateQuantity,
      deleteItem,
      toPayment,
      orderHistory,
      quantities,
    };
  },
});
