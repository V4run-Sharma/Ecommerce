import { computed, defineComponent, ref } from "vue";

import MobileMenu from "./MobileMenu.vue";

export default defineComponent({
  name: "Header",
  components: {
    MobileMenu,
  },
  setup() {
    const isMobile = computed(() => window.innerWidth < 768);
    const isMobileMenuOpen = ref(false);

    const toggleMobileMenu = computed(() => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    });

    return {
      userName: "Varun",
      cartCount: 0,
      isMobile,
      isMobileMenuOpen,
      toggleMobileMenu,
    };
  },
});
