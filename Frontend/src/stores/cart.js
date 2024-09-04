import { computed, ref } from "vue";

import { checkUser } from "@/javascript/check-uesr";
import { defineStore } from "pinia";

const useCartStore = defineStore("cart", () => {
  const cart = ref([]);

  const getAllCartItems = async () => {
    const authToken = checkUser();
    // const url = "http://10.20.3.216:8090/cart/getItems";
    // const response = await fetch(url, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     // cross-origin
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // });
    // let data = await response.json();
    // cart.value = data.data;
    console.log(authToken);
  };
  getAllCartItems();

  const count = computed(() => cart.value.length);

  return {
    cart,
    count,
  };
});

export default useCartStore;
