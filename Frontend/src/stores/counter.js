import { computed, ref } from "vue";

import { defineStore } from "pinia";

export const useProduct = defineStore("Products", () => {
  const productsInStore = ref([]);

  const getAllProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    productsInStore.value = await response.json();
  };
  getAllProducts();

  const count = computed(() => productsInStore.value.length);

  return {
    productsInStore,
    count,
  };
});
