<template>
  <el-container class="page height-full">
    <el-header class="header">
      <NavHeader />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
export default {
  components: {
    NavHeader: () => import('./NavHeader.vue')
  }
}
</script>

<style lang="scss" scoped>
.page {
  .header {
    padding: 0px;
  }
}
</style>
