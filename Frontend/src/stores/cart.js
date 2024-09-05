import { defineStore } from "pinia";
import { ref } from "vue";

const useCartStore = defineStore("cart", () => {
  const cart = ref([]);

  const getAllCartItems = async (cId) => {
    const url = `http://10.20.3.79:8092/cart/getItems?cId=${cId}`;
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
  };
  getAllCartItems(111);

  // const count = computed(() => cart.value.length);

  const updateQuantity = async (cId, pId, quantity, sId) => {
    const url = `http://10.20.3.79:8092/cart/updateQuantity?cId=${cId}&newQuantity=${quantity}&pId=${pId}&sId=${sId}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        // cross-origin
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        cId,
        pId,
        quantity,
        sId,
      }),
    });

    let data = await response.json();
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
  };

  return {
    cart,
    // count,
    updateQuantity,
    deleteItem,
  };
});

export default useCartStore;
