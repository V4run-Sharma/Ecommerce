import { createRouter, createWebHistory } from "vue-router";

import Login from "@/views/Login.vue";
import OrderDetails from "@/views/OrderDetails.vue";
import OrderHistory from "@/views/OrderHistory.vue";
import Payment from "@/views/Payment.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import Products from "@/views/Products/Products.vue";
import Signup from "@/views/Signup.vue";
import Thank from "@/views/Thank.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/login", name: "Login", component: Login },
    { path: "/signup", name: "Signup", component: Signup },
    { path: "/", name: "Products", component: Products },
    {
      path: "/:id",
      name: "ProductDetails",
      component: ProductDetail,
    },
    { path: "/payment", name: "Payment", component: Payment },
    { path: "/thank", name: "Thank", component: Thank },
    {
      path: "/orderhistory",
      name: "OrderHistory",
      component: OrderHistory,
    },
    {
      path: "/orderhistory/:orderId",
      name: "OrderDetails",
      component: OrderDetails,
    },
  ],
});

export default router;
