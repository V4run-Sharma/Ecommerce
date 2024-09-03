import { computed, defineComponent, ref } from "vue";

import MobileMenu from "../MobileMenu/MobileMenu.vue";
import ProfileMenu from "../ProfileMenu/ProfileMenu.vue";

export default defineComponent({
  name: "Header",
  components: {
    MobileMenu,
    ProfileMenu,
  },
  setup() {
    const isMobile = computed(() => window.innerWidth < 768);
    const isMobileMenuOpen = ref(false);
    const isProfileMenuOpen = ref(false);

    const toggleMobileMenu = computed(() => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    });

    const toggleProfileMenu = computed(() => {
      isProfileMenuOpen.value = !isProfileMenuOpen.value;
    });

    const closeMenus = computed(() => {
      isMobileMenuOpen.value = false;
      isProfileMenuOpen.value = false;
    });

    const handleClickOutside = (event) => {
      const mobileMenu = document.getElementById("mobile-menu-wrapper");
      const profileMenu = document.getElementById("profile-menu-wrapper");

      if (
        mobileMenu &&
        !mobileMenu.contains(event.target) &&
        profileMenu &&
        !profileMenu.contains(event.target)
      ) {
        closeMenus();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return {
      userName: "Varun",
      cartCount: 0,
      isMobile,
      isProfileMenuOpen,
      toggleProfileMenu,
      isMobileMenuOpen,
      toggleMobileMenu,
    };
  },
});
