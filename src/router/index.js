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

// 不重定向白名单
const whiteList = ["/login"];

//全局路由前置钩子函数
router.beforeEach((to, from, next) => {
  // 判断如果是未开发的页面不让通过
  if (to.meta.isNotOpen) {
    Message.warning("暂未开放！");
    return;
  }

  // 判断是否是白名单
  if (whiteList.includes(to.path)) {
    next();
    return;
  }

  // 获取登录人请求头信息
  const TokenByUser = ys_utils.getSessionStorage("CommData");

  // 判断是否有用户登录信息
  if (TokenByUser) {
    //是否前去登陆页
    if (to.path == "/login") {
      // 跳转到当前页面
      next(from.fullPath);
    } else {
      next();
    }
  } else {
    next("/login");
  }
});

export default router;
