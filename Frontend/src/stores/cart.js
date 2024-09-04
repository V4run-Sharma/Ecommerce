import { computed, ref } from "vue";

import { defineStore } from "pinia";

const useCartStore = defineStore("cart", () => {
  const cart = ref([]);

  const getAllCartItems = async () => {
    const url = "http://10.20.3.216:8090/cart/getItems";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

        // cross-origin
        "Access-Control-Allow-Origin": "*",
      },
    });
    let data = await response.json();
    cart.value = data.data;
    console.log(authToken);
  };
  getAllCartItems();

  const count = computed(() => cart.value.length);

  const updateQuantity = async (pId, quantity, sId) => {
    const url = "";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        // cross-origin
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        pId,
        quantity,
        sId,
      }),
    });

    let data = await response.json();
    console.log(data);
  };

  const deleteItem = async (pId, sId) => {
    const url = "";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        // cross-origin
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        pId,
        sId,
      }),
    });

    let data = await response.json();
    console.log(data);
  };

  return {
    cart,
    count,
    updateQuantity,
    deleteItem,
  };
});

export default useCartStore;
