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
          <YsMMenu :unfold="isCollapsed" :MenuList_Source="meun_bean_list"></YsMMenu>
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
            <YsMTag :tagData="tagData"></YsMTag>
          </div>
          <div>
            <YsMHeader :themeList="themeList" :nowUserInfo="nowUserInfo" @on-change-theme="ChangeTheme" @on-quit="Quit"></YsMHeader>
          </div>
        </div>
        <div class="content frame-content">
          <div class="breadcrumbBox">
            <YsBreadcrumb>
              <YsBreadcrumbItem>首页</YsBreadcrumbItem>
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
</template>
<script>
  import {
    mapGetters
  } from "vuex";
  import {
    ysSysAction
  } from "ys-utils_js";
  export default {
    name: "Main",
    data() {
      return {
        isCollapsed: true, // 是否展开 默认是
        collapsedWidth: 200,
        themeInfo: {}, // 切换皮肤的数据
        tagData: [], // tag切换数据
        meun_bean_list: [{
            path: "Welcome",
            frame: "Welcome",
            rs_code: "150001",
            super_rs_code: "1500",
            rsim_url: "home_a.png",
            sort_key: 1,
            defaulttab: 0,
            spread: false,
            icon: "zhuye2",
            name: "主页",
          },
          {
            rs_code: "150007",
            frame: "wuliu",
            super_rs_code: "1500",
            rsim_url: "wuliu_a.png",
            sort_key: 7,
            defaulttab: 0,
            spread: false,
            icon: "application",
            name: "物流协同",
          },
          {
            rs_code: "150008",
            frame: "123",
            super_rs_code: "1500",
            rsim_url: "wulian_a.png",
            sort_key: 8,
            defaulttab: 0,
            spread: false,
            icon: "application",
            name: "基础物联管理",
            tabs: [{
                rs_code: "15000801",
                super_rs_code: "150008",
                sort_key: 1,
                frame: "1234",
                spread: false,
                icon: "application",
                name: "业务建模",
                tabs: [{
                    path: "ObjectMgtNewBuild",
                    rs_code: "1500080101",
                    super_rs_code: "15000801",
                    sort_key: 1,
                    spread: false,
                    icon: "application",
                    name: "对象管理",
                    text: "对象管理",
                    frame: "12345",
                    tabs: [{
                      path: "ObjectMgtNewBuildd",
                      rs_code: "15000801012",
                      super_rs_code: "150008012",
                      sort_key: 1,
                      spread: false,
                      icon: "application",
                      name: "对象管理11",
                      text: "对象管理11",
                      frame: "123456",
                    }]
                  },
                  {
                    path: "RelationMgtList",
                    rs_code: "1500080102",
                    super_rs_code: "15000801",
                    sort_key: 2,
                    spread: false,
                    icon: "application",
                    name: "关系管理",
                    text: "关系管理",
                    frame: "4567",
                  },
                ],
              },
              {
                rs_code: "15000802",
                super_rs_code: "150008",
                sort_key: 2,
                tabs: [{
                  path: "DynamicallyAttribute",
                  rs_code: "1500080201",
                  super_rs_code: "15000802",
                  sort_key: 1,
                  spread: false,
                  icon: "application",
                  name: "动态属性定义",
                  frame: "Welcome458",
                }],
                spread: false,
                icon: "application",
                name: "标签设计",
                frame: "678",
              },
              {
                rs_code: "15000803",
                super_rs_code: "150008",
                sort_key: 3,
                tabs: [{
                    path: "TagsList",
                    rs_code: "1500080301",
                    super_rs_code: "15000803",
                    sort_key: 1,
                    spread: false,
                    icon: "application",
                    name: "标签生成",
                    frame: "Welcome123",
                  },
                  {
                    path: "labelMgtLabelscrap",
                    rs_code: "1500080302",
                    super_rs_code: "15000803",
                    sort_key: 2,
                    spread: false,
                    icon: "application",
                    name: "标签报废",
                    frame: "Welcome456",
                  },
                  {
                    path: "LargeLabelQuery",
                    rs_code: "1500080303",
                    super_rs_code: "15000803",
                    sort_key: 3,
                    spread: false,
                    icon: "application",
                    name: "大标签查询",
                    frame: "Welcome789",
                  },
                  {
                    path: "SizeTagQuery",
                    rs_code: "1500080304",
                    super_rs_code: "15000803",
                    sort_key: 4,
                    spread: false,
                    icon: "application",
                    name: "大小标签查询",
                    frame: "Welcome222",
                  },
                  {
                    path: "RuleDetailsQuery",
                    rs_code: "1500080305",
                    super_rs_code: "15000803",
                    sort_key: 5,
                    spread: false,
                    icon: "application",
                    name: "需增加条码规则反间谍法的",
                    frame: "Welcome333",
                  },
                ],
                spread: false,
                icon: "application",
                name: "标签管理",
                frame: "Welcome11",
              },
            ],
          },
        ],
        // 当前登录人信息
        nowUserInfo: {
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
        ]
      };
    },
    mounted() {
      // 默认展示的皮肤
      this.ChangeTheme("theme-blue");
      for (let i = 0; i < 15; i++) {
        this.tagData.push({
          title: `标签${i+1}`,
          closable: true, //是否可关闭
        })
      };
      // 菜单
      this.meun_bean_list = this.getMenuList;
      // 获取消息列表
      this.getNewsList();
      this.getNowUserInfo();
    },
    computed: {
      ...mapGetters(['getCommData', 'getMenuList', 'getBtnPermission']),
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
        let SelTheme = info;
        if (typeof info === "object") {
          SelTheme = info.themeName;
        }
        console.log(SelTheme);
        document.querySelector("body").className = SelTheme;
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
          const result = await ysSysAction.getMessages();
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
          const result = await ysSysAction.userLoginOut();
          if (result) {
            this.$router.push({
              name: "login"
            })
          }
        } catch (error) {
          console.log(error);
        }
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