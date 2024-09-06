import "./assets/main.css";

import App from "./App.vue";
import cors from "cors";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
// app.use(
//   cors({
//     origin: "*",
//   })
// );

app.mount("#app");
