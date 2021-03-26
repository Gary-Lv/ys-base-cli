import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//基本样式初始化
import "./assets/normalize.css";

// 引入ysUI组件库
import ysUI from "ys-ui";
import "ys-ui/dist/styles/ys-ui.css";

// // 引入iconfont
// import "./assets/iconfont/iconfont.css";

// 修改主题色配置
import "./theme/index.less";

Vue.use(ysUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
