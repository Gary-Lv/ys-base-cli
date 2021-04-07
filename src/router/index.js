import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./router";
import { ys_utils } from "ys-utils-js";

Vue.use(VueRouter);

// 解决重复定位同一路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  routes,
});

//全局路由前置钩子函数
router.beforeEach((to, from, next) => {
  // 判断是否已经存在请求头信息  表示登录成功
  if (ys_utils.getSessionStorage("CommData")) {
    if (to.path == "/login") {
      next(from.fullPath);
    } else {
      next();
    }
  } else {
    next("/login");
  }
});

export default router;
