import { computed, defineComponent, ref } from "vue";

import ProductCard from "@/components/ProductCard/ProductCard.vue";
import useSearchProductStore from "@/stores/search";

export default defineComponent({
  components: {
    ProductCard,
  },
  setup() {
    const searchProductStore = useSearchProductStore();

    const searchProductsInStore = computed(() => {
      return searchProductStore.searchProducts;
    });

    const noProductsFound = computed(() => {
      if (searchProductsInStore.value === null) {
        return true;
      } else {
        return false;
      }
    });

    return {
      searchProductsInStore,
      noProductsFound,
    };
  },
});
