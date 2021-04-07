import _store from "../store";
import { ys_utils } from "ys-utils-js";
const init_commitData = () => {
  // 在这里需要将请求头、菜单、按钮的数据通过mutations绑定到state上
  _store.commit(
    "SET_COMMDATA",
    ys_utils.getSessionStorage("CommData")
      ? ys_utils.getSessionStorage("CommData")
      : null
  );
  _store.commit(
    "SET_MENULIST",
    ys_utils.getSessionStorage("MenuList")
      ? ys_utils.getSessionStorage("MenuList")
      : null
  );
  _store.commit(
    "SET_BTNPERMISSION",
    ys_utils.getSessionStorage("BtnPerm")
      ? ys_utils.getSessionStorage("BtnPerm")
      : null
  );
};
const saveTagItemList = (tagData) => {
  _store.commit("SET_TAGITEMLIST", tagData);
};

const setStystemTheme = (themeInfo = "theme-blue") => {
  let SelTheme = themeInfo;
  // 判断是否传入的是一个对象 如果是对象 说明是手动切换的
  if (themeInfo !== null && typeof themeInfo === "object") {
    SelTheme = themeInfo.themeName;
  } else {
    // 刷新页面读取缓存的或者默认的
    console.log(ys_utils.getSessionStorage("ThemeInfo"));
    let getSessionTheme =
      ys_utils.getSessionStorage("ThemeInfo") &&
      JSON.parse(ys_utils.getSessionStorage("ThemeInfo"));

    if (getSessionTheme) {
      SelTheme = getSessionTheme.theme;
    } else {
      SelTheme = themeInfo;
    }
  }
  ys_utils.setSessionStorage("ThemeInfo", JSON.stringify({ theme: SelTheme }));
  document.querySelector("body").className = SelTheme;
};

export { init_commitData, saveTagItemList, setStystemTheme };
