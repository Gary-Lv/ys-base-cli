<template>
  <div class="Login">
    <div class="wrapper">
      <YsMLogin @on-handle-login="handleLogin" :borderDisplay="borderDisplay"></YsMLogin>
    </div>
  </div>
</template>

<script>
  import {
    ys_SysAction
  } from "ys-utils-js";
  export default {
    name: 'YsLoginTest',
    components: {},
    data() {
      return {
        // 传入是否显示border
        borderDisplay: true
      }
    },
    methods: {
      // 登录回调
      handleLogin(res) {
        this.login(res);
      },
      // 登录
      async login(res) {
        try {
          const result = await ys_SysAction.userLogin(res, window.GlobalConfig.PaaSCode);
          if (result) {
            this.$YsMessage.success('登录成功~');
            this.$router.push({
              name: "home"
            });
          } else {
            this.$Message.error('账号或密码有误~');
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .Login {
    width: 100%;
    height: 100vh;
    background: #273b60;
    display: flex;
    justify-content: center;
    align-items: center;

    .wrapper {
      width: 400px;
    }
  }
</style>