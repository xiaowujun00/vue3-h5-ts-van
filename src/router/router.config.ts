import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login.vue"),
  },
];

export default routes;
