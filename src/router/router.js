import Main from "_c/Main";
export default [
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
    ],
  },
];
