import { defineStore } from "pinia";
import { ref } from "vue";

const useCartStore = defineStore("cart", () => {
  const cart = ref([]);

  const getAllCartItems = async () => {
    console.log(cart.value);
    const url = `http://10.20.2.234:8090/cart/getItems`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
        // cross-origin
        "Access-Control-Allow-Origin": "*",
      },
    });
    let data = await response.json();
    console.log(data);
    cart.value = data.data;
  };
  // getAllCartItems();

  const updateQuantity = async (pid, quantity, sid) => {
    const url = `http://10.20.2.234:8090/cart/updateQuantity?newQuantity=${quantity}&pId=${pid}&sId=${sid}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
        // cross-origin
        "Access-Control-Allow-Origin": "*",
      },
    });
    console.log(pid, quantity, sid);
    let data = await response.json();
    return data;
  };

  const deleteItem = async (pid, sid) => {
    console.log(pid, sid);
    const url = `http://10.20.2.234:8090/cart/deleteItem?cartId=112&pId=${pid}&sId=${sid}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
        // cross-origin
        "Access-Control-Allow-Origin": "*",
      },
    });
    let data = await response.json();
    return data;
  };

  return {
    cart,
    getAllCartItems,
    updateQuantity,
    deleteItem,
  };
});

export default useCartStore;
