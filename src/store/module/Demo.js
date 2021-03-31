import { YsDispose } from "ys-utils_js"; // 统一处理接口返回数据
import DemoApi from "../../api/demo";

const state = {};
const getters = {};
const mutations = {};
const actions = {
  // 调用服务 查询部门
  async SpringTestDeptView_queryTestDept({ commit }, params) {
    try {
      let result = await DemoApi.SpringTestDeptView_queryTestDept(params);
      return YsDispose(result);
    } catch (error) {
      return error;
    }
  },
  // 调用服务 新增部门
  async SpringTestDeptView_saveTestDept({ commit }, params) {
    try {
      let result = await DemoApi.SpringTestDeptView_saveTestDept(params);
      return YsDispose(result);
    } catch (error) {
      return error;
    }
  },
};

export { state, getters, mutations, actions };
