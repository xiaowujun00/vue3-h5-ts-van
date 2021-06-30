import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import routerConfig from "./router.config";
import { createRouterGuards } from "./router-guards";
import { App } from "vue";
// 路由表
const routes: Array<RouteRecordRaw> = [...routerConfig];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}
export default router;
