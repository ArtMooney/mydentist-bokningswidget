import {
  createRouter,
  createWebHistory,
} from "vue-router/dist/vue-router.esm-bundler";
import Home from "./Widget.vue";

export default () =>
  createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/boka",
        name: "Boka",
        component: Home,
      },
    ],
  });
