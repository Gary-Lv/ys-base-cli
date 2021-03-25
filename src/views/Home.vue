<template>
  <div class="homePage pageBackground">
    <div>欢迎使用</div>
    <div>远舢Base项目框架</div>
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

    &>div:last-child {
      margin-top: 20px;
      font-size: 28px;
    }
  }
</style>