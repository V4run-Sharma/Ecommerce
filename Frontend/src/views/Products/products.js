import "swiper/swiper-bundle.css"; // Import Swiper styles

// Import Swiper modules
import { Swiper, SwiperSlide } from "swiper/vue";
import { computed, defineComponent, ref } from "vue";

// import { Autoplay } from "swiper/vue";
// import { Navigation } from "swiper/vue";
// import { Pagination } from "swiper/vue";
import ProductCard from "@/components/ProductCard/ProductCard.vue";
import useSearchProductStore from "@/stores/search";

export default defineComponent({
  components: {
    ProductCard,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const images = [
      {
        src: "https://fundamental.in/wp-content/uploads/2021/03/ps5-banner-1024x375.png",
        alt: "PS5 Banner 2",
      },
      {
        src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/f3832e180145769.6505ae76214ca.jpg",
        alt: "iPhone Banner",
      },
      {
        src: "https://dlcdnimgs.asus.com/websites/global/productcustomizedTab/1460/images/banner-00.jpg",
        alt: "ASUS Banner",
      },
    ];
    const searchProductStore = useSearchProductStore();

    const searchProductsInStore = computed(() => {
      console.log("searchProductsInStore", searchProductStore.searchProducts);
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
      images,
      searchProductsInStore,
      noProductsFound,
      // Autoplay,
      // Navigation,
      // Pagination,
    };
  },
});
