import { createRouter, createWebHistory } from "vue-router";

import Home from "./App.vue";
import About from "./App.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/boka", component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
