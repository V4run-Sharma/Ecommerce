import { defineComponent } from "vue";

export default defineComponent({
  name: "MobileMenu",
  props: {
    cartCount: {
      type: Number,
      required: true,
    },
  },
  setup() {
    return {
      userName: "Varun",
    };
  },
});
