import { ys_http } from "ys-utils-js";

const DemoApi = {
  /**
   * demo 根据部门编号查询部门
   */
  SpringTestDeptView_queryTestDept: (data) => {
    return ys_http.request({
      url: "sa_SpringTestDeptView_queryTestDept.do",
      method: "POST",
      data,
      // proxyName:""  如果定义了别的请求服务地址  需要添加这个属性 默认不需要指定 默认执行的是config配置中的BaseUrl地址
    });
  },
  /**
   * demo 新增部门
   */
  SpringTestDeptView_saveTestDept: (data) => {
    return ys_http.request({
      url: "sa_SpringTestDeptView_saveTestDept.do",
      method: "POST",
      data,
    });
  },
};
export default DemoApi;
