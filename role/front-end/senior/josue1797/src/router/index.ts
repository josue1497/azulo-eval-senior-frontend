import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    // {
    //   path: "/map",
    //   name: "home",
    //   component: () => import("../views/AboutView.vue"),
    // },
    {
      path: "/:library_id",
      name: "Library details",
      props: true,
      component: () => import("../views/LibraryDetailView.vue"),
    },
  ],
});

export default router;
