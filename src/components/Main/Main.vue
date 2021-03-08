<template>
  <div class="Main">
    <div class="layout-outer">
      <div class="siderBox animation frame-sider" :style="{width:`${collapsedWidth}px`}">
        <!-- logo -->
        <div class="frame-logo"></div>
        <!-- 菜单 -->
        <div class="frame-menu"></div>
        <!-- 收起展开 -->
        <div class="frame-collapsed">
          <Icon type="ios-arrow-back" class="animation" :style="{transform:!isCollapsed?'rotate(180deg)':''}"
            @click.native="collapsed" />
        </div>
      </div>
      <div class="contentBox">
        <div class="headerBox frame-header"></div>
        <div class="content frame-content">
          <div class="breadcrumbBox">
            <Breadcrumb>
              <BreadcrumbItem>Home</BreadcrumbItem>
              <BreadcrumbItem>Components</BreadcrumbItem>
              <BreadcrumbItem>Layout</BreadcrumbItem>
            </Breadcrumb>
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
  export default {
    name: "Main",
    data() {
      return {
        isCollapsed: true, // 是否展开 默认是
        collapsedWidth: 200,
      };
    },
    computed: {
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
        border: 1px solid red;
      }

      .frame-menu {
        width: 100%;
        height: calc(100% - 112px);
        border: 1px solid yellow;
      }

      .frame-collapsed {
        width: 100%;
        height: 48px;
        padding: 5px 16px;
        font-size: 26px;

        &>i {
          cursor: pointer;
          border: 1px solid red;
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