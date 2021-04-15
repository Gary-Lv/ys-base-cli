import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 自适应
import "ys-lib-flesible";

//基本样式初始化
import "./assets/normalize.css";

// 引入ysUI组件库
import ysUI from "ys-ui";
import "ys-ui/dist/styles/ys-ui.css";

// 修改主题色配置
import "./theme/index.less";

// 设置默认皮肤
import { setStystemTheme } from "./utils/init_commitData";
setStystemTheme();

Vue.use(ysUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
