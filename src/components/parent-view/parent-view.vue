<template>
  <div>
    <keep-alive>
      <router-view ref="child" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view ref="child" v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
  export default {
    name: 'ParentView',
    // computed: {
    //   tagNavList() {
    //     return this.$store.state.app.tagNavList
    //   },
    //   notCacheName() {
    //     return [(this.$route.meta && this.$route.meta.notCache) ? this.$route.name : '']
    //   },
    //   cacheList() {
    //     return ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta
    //       .notCache)).map(item => item.name) : []]
    //   }
    // }
  }
</script>