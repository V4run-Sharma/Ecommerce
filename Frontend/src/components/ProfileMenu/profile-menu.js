import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ProfileMenu",
  setup() {
    const router = useRouter();

    const logout = () => {
      localStorage.removeItem("auth");
      if (localStorage.getItem("username")) {
        localStorage.removeItem("username");
      }
      window.location.reload();
      router.push("/");
    };

    const orderhistory = () => {
      router.push("/orderhistory");
    };
    return {
      logout,
      orderhistory,
    };
  },
});
