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
    const cartStore = useCartStore();

    const addToCart = async (addedProduct) => {
      const url = `http://10.20.2.234:8090/cart/addItem`;
      const product = {
        pId: addedProduct.pid,
        sId: addedProduct.minSId,
        quantity: 1,
      };
      console.log(product);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      if (data.success) {
        cartStore.getAllCartItems();
      }
    };

    const goToDetails = (pid) => {
      router.push(`/${pid}`);
    };

    return {
      product: props.product,
      addToCart,
      goToDetails,
    };
  },
});
