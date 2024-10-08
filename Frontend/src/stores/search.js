import { defineStore } from "pinia";
import { ref } from "vue";

const useSearchProductStore = defineStore("searchProducts", () => {
  const searchProducts = ref([]);
  const searchToken = ref("");

  const getAllSearchProducts = async (keyword = "") => {
    const url = `http://10.20.3.216:8091/search?keyword=${keyword}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // cross-origin
        "Access-Control-Allow-Origin": "*",
      },
    });
    let data = await response.json();
    searchProducts.value = data.data;
    console.log(searchProducts.value);
  };
  getAllSearchProducts();

  return {
    getAllSearchProducts,
    searchProducts,
    searchToken,
  };
});

export default useSearchProductStore;
