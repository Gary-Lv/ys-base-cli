<template>
  <div class="Main">
    <div class="layout-outer">
      <div class="siderBox animation frame-sider" :style="{width:`${collapsedWidth}px`}">
        <!-- logo -->
        <div class="frame-logo">
          <img src="../../assets/small.png" alt="">
          <span v-if="isCollapsed">
            远舢Base
          </span>
        </div>
        <!-- 菜单 -->
        <div class="frame-menu">
          <YsMMenu :unfold="isCollapsed" :MenuList_Source="meun_bean_list" @on-select="meunSelect"></YsMMenu>
        </div>
        <!-- 收起展开 -->
        <div class="frame-collapsed">
          <YsIcon type="ios-arrow-back" class="animation" :style="{transform:!isCollapsed?'rotate(180deg)':''}"
            @click.native="collapsed" />
        </div>
      </div>
      <div class="contentBox">
        <div class="headerBox frame-header">
          <div>
            <YsMTag :tagData="getTagItemList" :nowRouteName="nowRouteName" @on-select="NowSelTag"
              @on-close="NowCloseTag">
            </YsMTag>
          </div>
          <div>
            <YsMHeader :themeList="themeList" :nowUserInfo="nowUserInfo" @on-change-theme="ChangeTheme" @on-quit="Quit">
            </YsMHeader>
          </div>
        </div>
        <div class="content frame-content">
          <div class="breadcrumbBox" v-if="breadcrumbData.length>0">
            <YsBreadcrumb>
              <YsBreadcrumbItem v-for="(item,key) in breadcrumbData" :key="key"
                :to="!item.meta.isActive?{name:item.name}:''">
                {{item.title}}
              </YsBreadcrumbItem>
            </YsBreadcrumb>
          </div>
          <div class="contentCardBox frame-content-card">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // vuex获取基础的数据信息 必须的  否则项目中拿不到数据
  import {
    init_commitData,
    saveTagItemList,
    setStystemTheme
  } from "../../utils/init_commitData";
  import {
    mapGetters
  } from "vuex";
  import {
    ys_SysAction,
    ys_tagAndbread
  } from "ys-utils-js";

  export default {
    name: "Main",
    data() {
      return {
        isCollapsed: true, // 是否展开 默认是
        collapsedWidth: 200,
        themeInfo: {}, // 切换皮肤的数据
        meun_bean_list: [],
        // 当前登录人信息
        nowUserInfo: {
          userName_title: "",
          userName: "",
          userImg: "",
          userInfo: []
        },
        // 换肤数据
        themeList: [{
            title: "蓝色主题",
            themeName: "theme-blue",
            themeColor: "#0061FF"
          },
          {
            title: "白色主题",
            themeName: "theme-white",
            themeColor: "#FFFFFF"
          }
        ],
        nowRouteName: '', // 当前所在路由名字
        breadcrumbData: [],
      };
    },
    created() {
      init_commitData(); // commit数据
    },
    mounted() {
      // 菜单
      this.meun_bean_list = this.getMenuList;
      // 获取消息列表
      this.getNewsList();
      this.getNowUserInfo();
      // 拷贝数据
      this.tagData = JSON.parse(JSON.stringify(this.getTagItemList));
    },
    computed: {
      ...mapGetters(['getCommData', 'getMenuList', 'getBtnPermission', 'getTagItemList']),
      menuitemClasses: function () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      }
    },
    methods: {
      collapsed() {
        this.isCollapsed = !this.isCollapsed;
        if (this.isCollapsed) {
          this.collapsedWidth = 200;
          return;
        }
        this.collapsedWidth = 64;
      },
      // 切换皮肤
      ChangeTheme(info) {
        setStystemTheme(info);
      },
      // 获取当前登录人信息
      getNowUserInfo() {
        let {
          orguser_cn_name,
          ent_no,
          bl_dprl_expls1,
          dept_cn_name
        } = this.getCommData;
        this.nowUserInfo = {
          userName_title: orguser_cn_name,
          userName: orguser_cn_name,
          userImg: "",
          userInfo: [{
              title: "工号",
              value: ent_no
            },
            {
              title: "姓名",
              value: orguser_cn_name
            },
            {
              title: "部门",
              value: dept_cn_name
            },
            {
              title: "岗位",
              value: bl_dprl_expls1
            }
          ]
        }
      },
      // 获取消息通知列表
      async getNewsList() {
        try {
          const result = await ys_SysAction.getMessages();
          if (result) {
            console.log(result, "**********");
          }
        } catch (error) {
          console.log(error);
        }
      },
      // 退出登录
      async Quit() {
        try {
          const result = await ys_SysAction.userLoginOut();
          if (result) {
            this.$router.push({
              name: "login"
            })
          }
        } catch (error) {
          console.log(error);
        }
      },
      // 菜单切换路由跳转
      meunSelect(routerInfo) {
        this.$router.push({
          name: routerInfo
        });
      },
      // tag标签选择
      NowSelTag(routerInfo) {
        this.$router.push({
          name: routerInfo.name
        });
      },
      // tag标签关闭
      NowCloseTag(info) {
        ys_tagAndbread.clostTagItem(info, (tagData) => {
          saveTagItemList(tagData);
        })
      },
    },
    watch: {
      $route: {
        immediate: true,
        handler: function (newRouteInfo) {
          this.nowRouteName = newRouteInfo.name;
          if (!newRouteInfo.meta.hideInTab) {
            // 添加tag标签
            ys_tagAndbread.addTagItem(newRouteInfo, (tagData) => {
              saveTagItemList(tagData);
            });
          }
          this.breadcrumbData = [];
          if (!newRouteInfo.meta.isHideBreadcrumb) {
            // 获取当前路由的面包屑数据
            this.breadcrumbData = ys_tagAndbread.setBreadcrumbData(newRouteInfo.matched);
          }
        },
      }
    }
  }
</script>
<style lang="less" scoped>
  .Main,
  .layout-outer {
    height: 100%;
    width: 100%;
    display: flex;

    .siderBox {
      height: 100%;

      .frame-logo {
        height: 48px;
        width: 100%;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        justify-content: center;

        &>img {
          height: 40px;
        }

        &>span {
          margin: 0 16px;
          color: white;
          font-size: 18px;
          font-weight: 600;
        }
      }

      .frame-menu {
        width: 100%;
        height: calc(100% - 112px);
      }

      .frame-collapsed {
        width: 100%;
        height: 48px;
        padding: 5px 16px;
        font-size: 26px;

        &>i {
          cursor: pointer;
        }
      }
    }

    .contentBox {
      height: 100%;
      width: 200px;
      flex: 1;

      .headerBox {
        width: 100%;
        height: 48px;
        padding: 0 16px;
        display: flex;
        flex-wrap: nowrap;

        &>div:first-child {
          margin-right: 10px;
          flex: 1;
          align-self: flex-end;
        }
      }

      .content {
        width: 100%;
        height: calc(100% - 48px);
        padding: 0 16px;
        overflow: hidden;

        .breadcrumbBox {
          height: 48px;
          width: 100%;
          display: flex;
          align-items: center;
        }

        .contentCardBox {
          height: calc(100% - 48px);
          width: 100%;
          padding-bottom: 10px;
          overflow: auto;
        }
      }
    }

    // 关闭按钮旋转动画
    .animation {
      transition: all .5s;
    }
  }
</style>