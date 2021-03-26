import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./router";
import { ysUtils } from "ys-utils_js";

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

//全局路由前置钩子函数
router.beforeEach((to, from, next) => {
  //是否前去登陆页
  if (to.path == "/login") {
    //是否存在用户缓存信息   getSessionStorage("NavList") &&
    if (ysUtils.getSessionStorage("CommData")) {
      //有  跳转首页无法返回
      if (to.path == "/login") {
        next(from.fullPath);
      }
    } else {
      //没有缓存 前去登陆
      next();
    }
  } else {
    //非前往登陆页 判断是否存在缓存  getSessionStorage("NavList")
    if (ysUtils.getSessionStorage("CommData")) {
      next();
      //非登陆并无用户信息缓存  则判断前去得页面是否在白名单内
    } else {
      next("/login");
    }
  }
});

export default router;
