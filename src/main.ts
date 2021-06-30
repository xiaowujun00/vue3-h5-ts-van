import { createApp } from "vue";
import App from "./App.vue";
import router, { setupRouter } from "./router";
import store from "./store";
// 移动端适配
import "lib-flexible/flexible.js";
// 引入vant按需加载
import { setupAntd } from "@/plugins";
const app = createApp(App);
setupAntd(app);
// 挂载路由
setupRouter(app);
// app.use(store).use(router).mount("#app");
router.isReady().then(() => app.mount("#app"));
