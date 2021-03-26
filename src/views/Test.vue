<template>
  <div class="testBox">
    <p>
      <YsIcon type="md-arrow-back" size="32" @click.native="$router.go(-1)" />
    </p>
    <div class="contentBox">
      <YsButton type="primary" @click="getData(1)">获取请求头信息</YsButton><br><br>
      <p>
        请求头信息：{{commData}}
      </p>
      <YsButton type="primary" @click="getData(2)">获取菜单列表信息</YsButton><br><br>
      <p>
        菜单列表信息：{{menuList}}
      </p>
      <YsButton type="primary" @click="getData(3)">获取按钮列表信息</YsButton><br><br>
      <p>
        按钮列表信息：{{butList}}
      </p>
      <br>
      <p>
        <YsButton type="primary" @click="handleCancle">退出登录</YsButton>
      </p>
      <br>
      <p>
        <YsButton type="primary" @click="handleList">获取列表数据</YsButton>
      </p>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters
  } from "vuex";
  import { ysSysAction } from "ys-utils_js";
  export default {
    data() {
      return {
        commData: null,
        menuList: null,
        butList: null
      }
    },
    computed: {
      ...mapGetters(['getCommData', 'getMenuList', 'getBtnPermission']),
    },
    methods: {
      getData(i) {
        switch (i) {
          case 1:
            this.commData = this.getCommData;
            break;
          case 2:
            this.menuList = this.getMenuList;
            break;
          case 3:
            this.butList = this.getBtnPermission;
            break;
        }
      },
      // 退出登录
      async handleCancle() {
        console.log('退出登录')
        try {
          const result = await ysSysAction.userLoginOut();
          console.log(result, '-----------')
        } catch (error) {
          console.log(error);
        }
      },
      async handleList() {
        try {
          const result = await ysSysAction.getMessages();
          console.log(result, '-----------')
        } catch (error) {
          console.log(error);
        }
      }
    },
  }
</script>
<style lang="less" scoped>
  .testBox {
    height: 100%;
    width: 100%;

    &>i {
      color: #c9c9c9;
      cursor: pointer;

      &:hover {
        color: tint(#c9c9c9, 50%);
      }

      &:active {
        color: shade(#c9c9c9, 5%);
      }
    }

    .contentBox {
      padding: 20px;
      color: white;

      &>p {
        font-size: 18px;
      }
    }

  }
</style>