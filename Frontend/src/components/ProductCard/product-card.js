import { defineComponent } from "vue";
import useCartStore from "@/stores/cart";
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

    const addToCart = async (pid, minSId, quantity) => {
      const url = `http://10.20.3.79:8092/cart/addItem?cartId=112`;
      const product = {
        pId: pid,
        sId: minSId,
        quantity: 1,
      };
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // authToken: "hello",
        },
        body: JSON.stringify(product),
      });
      const cartStore = useCartStore();
      cartStore.getAllCartItems();
      const data = await res.json();
      console.log(product, data);
    };

    const goToDetails = (pid) => {
      router.push(`/product/${pid}`);
    };

    return {
      product: props.product,
      addToCart,
      goToDetails,
    };
  },
});
