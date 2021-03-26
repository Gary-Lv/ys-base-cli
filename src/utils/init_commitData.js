import _store from "../store";
import { ysUtils } from "ys-utils_js";
const init_commitData = () => {
  // 在这里需要将请求头、菜单、按钮的数据通过mutations绑定到state上
  _store.commit(
    "SET_COMMDATA",
    ysUtils.getSessionStorage("CommData")
      ? ysUtils.getSessionStorage("CommData")
      : null
  );
  _store.commit(
    "SET_MENULIST",
    ysUtils.getSessionStorage("MenuList")
      ? ysUtils.getSessionStorage("MenuList")
      : null
  );
  _store.commit(
    "SET_BTNPERMISSION",
    ysUtils.getSessionStorage("BtnPerm")
      ? ysUtils.getSessionStorage("BtnPerm")
      : null
  );
};

export default init_commitData;
