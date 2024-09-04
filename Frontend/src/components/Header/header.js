import { computed, defineComponent, ref } from "vue";

import CartMenu from "../CartMenu/CartMenu.vue";
import MobileMenu from "../MobileMenu/MobileMenu.vue";
import ProfileMenu from "../ProfileMenu/ProfileMenu.vue";
import useCartStore from "@/stores/cart";

export default defineComponent({
  name: "Header",
  components: {
    MobileMenu,
    ProfileMenu,
    CartMenu,
  },
  setup() {
    const isMobile = computed(() => window.innerWidth < 768);
    const isMobileMenuOpen = ref(false);
    const isProfileMenuOpen = ref(false);
    const isCartMenuOpen = ref(false);

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

    const cartStore = useCartStore();
    const cartCount = computed(() => cartStore.count);

    return {
      userName: "Varun",
      cartCount,

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
