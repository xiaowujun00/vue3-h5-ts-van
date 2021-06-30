import { Router } from "vue-router";
// import store from "@/store";
import { CURRENT_USER } from "@/store/mutation-types";
import { storage } from "@/utils/Storage";

const allowList = ["login"]; // no redirect whitelist
const loginRoutePath = "/login";
const defaultRoutePath = "/home";
const win: any = window;
export function createRouterGuards(router: Router) {
  router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
      win.document.title = to.meta.title;
    }
    const token = storage.get(CURRENT_USER);
    if (token) {
      if (to.name === "login") {
        next({ path: defaultRoutePath });
      } else {
        const hasRoute = router.hasRoute(to.name!);
        if (allowList.includes(to.name as string) || hasRoute) {
          // 在免登录名单，直接进入
          next();
        }
        // } else {
        //     next()
        // }
      }
    } else {
      // not login
      if (allowList.includes(to.name as string)) {
        // 在免登录名单，直接进入
        next();
      } else {
        next({
          path: loginRoutePath,
          query: { redirect: to.fullPath },
          replace: true,
        });
      }
    }
  });

  // router.afterEach((to, from, failure) => {
  //   document.title = (to?.meta?.title as string) || document.title;
  //   if (isNavigationFailure(failure)) {
  //     console.log("failed navigation", failure);
  //   }
  //   // 在这里设置需要缓存的组件名称
  //   const keepAliveComponents = store.state.asyncRoute.keepAliveComponents;
  //   const currentComName = to.matched.find((item) => item.name == to.name)
  //     ?.components?.default.name;
  //   if (
  //     currentComName &&!keepAliveComponents.includes(currentComName) && to.meta?.keepAlive
  //   ) {
  //     // 需要缓存的组件
  //     keepAliveComponents.push(currentComName);
  //   } else if (!to.meta?.keepAlive || to.name == "Redirect") {
  //     // 不需要缓存的组件
  //     const index = store.state.asyncRoute.keepAliveComponents.findIndex(
  //       (name) => name == currentComName
  //     );
  //     if (index != -1) {
  //       keepAliveComponents.splice(index, 1);
  //     }
  //   }
  //   store.commit("asyncRoute/setKeepAliveComponents", keepAliveComponents);
  // });

  router.onError((error) => {
    console.log(error, "路由错误");
  });
}
