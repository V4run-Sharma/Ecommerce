import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const url = "http://10.20.3.79:8092/cart/addItem";

    const addToCart = async (product, cartId) => {
      // const authToken = checkUser();
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // authToken: "hello",
        },
        body: JSON.stringify({
          pId: "f6daf1e4-3d74-47b2-a6e4-f63553bf5502",
          quantity: 3,
          sId: "SELLER008",
        }),
      });
      const data = await res.json();
    };

    const goToDetails = (pId) => {
      router.push(`/product/${pId}`);
    };

    return {
      product: props.product,
      addToCart,
      goToDetails,
    };
  },
});
