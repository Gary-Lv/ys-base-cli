<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
  // export default {
  //   methods: {
  //     ChanageTheme(id) {
  //       let themeName = "";
  //       switch (id) {
  //         case 1:
  //           themeName = "lan-theme";
  //           break;
  //         case 2:
  //           themeName = "red-theme";
  //           break;
  //         case 3:
  //           themeName = "tlan-theme";
  //           break;
  //         case 4:
  //           themeName = "yellow-theme";
  //           break;
  //       };
  //       document.getElementById('app').className = themeName;
  //     }
  //   },
  //   mounted() {
  //     this.ChanageTheme(4);
  //   },
  // }
</script>

<style lang="less">
  #app {
    height: 100%;
    width: 100%;
  }
</style>