import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import LastGames from "../views/LastGames.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/last-games",
    name: "LastGames",
    component: LastGames,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
