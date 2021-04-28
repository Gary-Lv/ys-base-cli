/**
 * 此文件配置路由信息
 * meta{
 *    title: 显示在面包屑和标签栏的文字
 *    hideInTab:(false) 设为true后页面在切换标签不会出现
 *    isNotClose:(false) 设为true 这个页面出现的tab标签不可以关闭。如果可以关闭  不需要添加
 *    isHideBreadcrumb:(false) 当前页面是否隐藏面包屑组件  默认都显示  如果指定页面不显示 则设置为true
 *    isActive:(false) 当前路由是否可以通过面包屑点击跳转 默认都可以点击跳转
 *    isNotOpen:true  页面是否不开放  默认开放  如果为true 则不开放
 *    keepAlive:false 是否缓存页面  默认不缓存
 * }
 */

import Main from "_c/Main";
import ParentView from "_c/parent-view";
export default [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/",
    name: "_home",
    component: Main,
    redirect: "home",
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/Home.vue"),
        meta: {
          title: "首页",
          isNotClose: true,
          isHideBreadcrumb: true,
        },
      },
      {
        path: "Test",
        name: "Test",
        component: ParentView,
        meta: {
          title: "测试",
          hideInTab: true,
          isActive: true,
        },
        children: [
          {
            path: "test1",
            name: "test1",
            component: () => import("@/views/Test/test1.vue"),
            meta: {
              title: "测试页面1",
            },
          },
          {
            path: "test2",
            name: "test2",
            component: () => import("@/views/Test/test2.vue"),
            meta: {
              title: "测试页面2",
            },
          },
        ],
      },
    ],
  },
];
