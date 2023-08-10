import { createRouter, createWebHistory } from "vue-router";

import Home from "./Widget.vue";
import Boka from "./Widget.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/boka", component: Boka },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
