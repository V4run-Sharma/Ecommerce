import { createRouter, createWebHistory } from "vue-router";

import Products from "@/views/Products/Products.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/products",
      name: "Products",
      component: Products,
    },
  ],
});

export default router;
