import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

const useCartStore = defineStore("cart", () => {
  const cart = ref([]);

  const getAllCartItems = async () => {
    const url = `http://10.20.3.79:8092/cart/getItems?cartId=112`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

        // cross-origin
        "Access-Control-Allow-Origin": "*",
      },
    });
    let data = await response.json();
    console.log(data);
    cart.value = data.data;
  };
  getAllCartItems();

  // const count = computed(() => cart.value.length);

  const updateQuantity = async (cartId, pid, quantity, sid) => {
    const url = `http://10.20.3.79:8092/cart/updateQuantity?cartId=112&newQuantity=${quantity}&pId=${pid}&sId=${sid}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",

        // cross-origin
        "Access-Control-Allow-Origin": "*",
      },
    });
    console.log(cartId, pid, quantity, sid);
    let data = await response.json();
    console.log(data);
    getAllCartItems();
  };

  const deleteItem = async (pid, sid) => {
    console.log(pid, sid);
    const url = `http://10.20.3.79:8092/cart/deleteItem?cartId=112&pId=${pid}&sId=${sid}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",

        // cross-origin
        "Access-Control-Allow-Origin": "*",
      },
    });
    let data = await response.json();
    console.log(data);
    getAllCartItems();
  };

  const toCheckOut = async () => {
    const router = useRouter();

    router.push("/payment");
  };
  return {
    cart,
    getAllCartItems,
    updateQuantity,
    deleteItem,
    toCheckOut,
  };
});

export default useCartStore;
