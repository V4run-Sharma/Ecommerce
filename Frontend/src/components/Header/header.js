import { computed, defineComponent, ref } from "vue";

import CartMenu from "../CartMenu/CartMenu.vue";
import MobileMenu from "../MobileMenu/MobileMenu.vue";
import ProfileMenu from "../ProfileMenu/ProfileMenu.vue";
import useCartStore from "@/stores/cart";
import { useRouter } from "vue-router";
import useSearchProductStore from "@/stores/search";

export default defineComponent({
  name: "Header",
  components: {
    MobileMenu,
    ProfileMenu,
    CartMenu,
  },
  setup() {
    const searchProductStore = useSearchProductStore();
    const isMobile = computed(() => window.innerWidth < 768);
    const isMobileMenuOpen = ref(false);
    const isProfileMenuOpen = ref(false);
    const isCartMenuOpen = ref(false);

    const keyword = ref("");

    const router = useRouter();

    const userName = ref("");

    const isLoggedIn = computed(() => {
      if (localStorage.getItem("auth")) {
        return true;
      } else if (localStorage.getItem("auth") === undefined) {
        return false;
      }
    });

    const getUserName = async () => {
      const url = "http://10.20.2.234:8090/auth/username";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      });
      const data = await response.json();
      userName.value = data.data.username;
    };

    if (isLoggedIn.value) {
      getUserName();
    }

    const search = async (keyword) => {
      await searchProductStore.getAllSearchProducts(keyword);
      console.log(searchProductStore.searchProducts);
      router.push("/");
    };

    const toggleMobileMenu = computed(() => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    });

    const toggleProfileMenu = computed(() => {
      isProfileMenuOpen.value = !isProfileMenuOpen.value;
      isCartMenuOpen.value = false;
    });

    const toggleCartMenu = computed(() => {
      isCartMenuOpen.value = !isCartMenuOpen.value;
      isProfileMenuOpen.value = false;
    });

    const goToCheckout = () => {
      router.push("/payment");
    };

    const cartStore = useCartStore();
    const cartCount = computed(() => cartStore.count);

    return {
      goToCheckout,
      userName,
      cartCount,

      isLoggedIn,

      keyword,
      search,

      isMobile,
      isMobileMenuOpen,
      toggleMobileMenu,

      isProfileMenuOpen,
      toggleProfileMenu,

      isCartMenuOpen,
      toggleCartMenu,
    };
  },
});
