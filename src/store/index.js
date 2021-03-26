import Vue from "vue";
import Vuex from "vuex";
import { baseRequire_Store } from "ys-utils_js";

Vue.use(Vuex);

/**
 * 批量导入module下的所有模块
 * 如果module下面有自己新建的文件夹  文件夹里面的JS文件不能用index命名  容易冲突
 */
const path = require("path");
const files = require.context("./module", true, /\.js$/);
const modules = {};
files.keys().forEach((key) => {
  const name = path.basename(key, ".js"); // 回key的最后一部分
  modules[name] = files(key).default || files(key);
});

// 将导入的基础Store数据
modules.BaseCommon = { ...baseRequire_Store };
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: modules,
});
export default store;
