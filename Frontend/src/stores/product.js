import { computed, ref } from "vue";

import { defineStore } from "pinia";

const useProductStore = defineStore("products", () => {
  const products = ref([]);

  const getAllProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    products.value = await response.json();
  };

  const count = computed(() => products.value.length);

  return {
    getAllProducts,
    products,
    count,
  };
});

export default useProductStore;
