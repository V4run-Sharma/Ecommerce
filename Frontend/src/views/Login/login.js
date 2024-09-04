import { defineComponent, ref } from "vue";

import { useRouter } from "vue-router";
import { useUserStore } from "../store";

export default defineComponent({
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const store = useUserStore();

    function login() {
      const user = store.findUser(email.value, password.value);
      if (user) {
        alert("Login successful!");
        router.push("/");
      } else {
        alert("Invalid credentials!");
      }
    }

    return {
      login,
    };
  },
});
