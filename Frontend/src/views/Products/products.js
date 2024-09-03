import { defineComponent, ref } from "vue";

import ProductCard from "@/components/ProductCard/ProductCard.vue";
import useProductStore from "@/stores/product";

export default defineComponent({
  components: {
    ProductCard,
  },
  setup() {
    const productsInStore = ref([]);
    const productStore = useProductStore();

    const fetchProducts = async () => {
      await productStore.getAllProducts();
      productsInStore.value = productStore.products;
      console.log(productsInStore.value);
    };
    fetchProducts();

    return {
      productsInStore,
    };
  },
});
