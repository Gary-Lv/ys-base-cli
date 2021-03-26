<template>
  <div class="homePage pageBackground">
    <div>欢迎使用</div>
    <div>远舢Base项目框架</div>
    <p>
      <YsButton type="primary" @click="$router.push({name:'Test'})">测试页面</YsButton>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    components: {},
    data() {
      return {}
    },
    methods: {},
    mounted() {},
  }
</script>
<style lang="less" scoped>
  .homePage {
    width: 100%;
    padding: 16px;
    height: 100%;
    border-radius: 10px;
    padding-top: 200px;

    &>div {
      color: white;
      text-align: center;
    }

    &>div:first-child {
      font-size: 42px;
    }

    &>div:nth-child(2) {
      margin-top: 20px;
      font-size: 28px;
    }

    &>p {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>