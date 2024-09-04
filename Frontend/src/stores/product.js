import { computed, ref } from "vue";

import { defineStore } from "pinia";

const useProductStore = defineStore("products", () => {
  const products = ref([]);

  const getAllProducts = async () => {
    const url = "http://10.20.3.216:8090/product/all?pageNumber=0&pageSize=90";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // cross-origin
        "Access-Control-Allow-Origin": "*",
      },
    });
    let data = await response.json();
    products.value = data.data;
    document.cookie;
    console.log(response.headers);
  };

  return {
    getAllProducts,
    products,
  };
});

export default useProductStore;
