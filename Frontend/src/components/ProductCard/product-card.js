import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const url =
      "http://192.168.50.124:8090/swagger-ui/index.html#/cart/addItem";

    const addToCart = async (product, cartId) => {
      // const authToken = checkUser();
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // authToken: "hello",
        },
        body: JSON.stringify({ product, cartId }),
      });
      const data = await res.json();
      console.log(product);
    };

    return {
      product: props.product,
      addToCart,
    };
  },
});
