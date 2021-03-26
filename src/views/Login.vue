<template>
  <div class="Login">
    <div class="wrapper">
      <YsMLogin @on-handle-login="handleLogin" :borderDisplay="borderDisplay"></YsMLogin>
    </div>
  </div>
</template>

<script>
  import {
    ysSysAction
  } from "ys-utils_js";
  // vuex获取基础的数据信息 必须的  否则项目中拿不到数据
  import init_commitData from "../utils/init_commitData";
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
          const result = await ysSysAction.userLogin(res, window.GlobalConfig.PaaSCode);
          if (result) {
            init_commitData(); // commit数据
            this.$Message.success('登录成功~');
            this.$router.push('/home');
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