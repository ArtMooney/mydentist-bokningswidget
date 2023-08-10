import { createRouter, createWebHistory } from "vue-router";

export default () =>
  createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: "/",
        name: "Home",
      },
      {
        path: "/boka",
        name: "Boka",
        component: () => import("./Boka.vue"),
      },
    ],
  });
