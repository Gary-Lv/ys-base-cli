import Main from "_c/Main";
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
    meta: {
      title: "首页",
    },
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "Test",
        name: "Test",
        component: () => import("@/views/Test.vue"),
      },
    ],
  },
];
