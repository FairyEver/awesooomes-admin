<template>
  <el-container class="page flex-center-column height-full">
    hello
  </el-container>
</template>

<script>
export const router = {
  path: 'page1',
  name: 'page1'
}
export default {
  name: 'page-1'
}
</script>

<style lang="scss" scoped>
.page {
  background-color: #F2F6FC;
  .card {
    width: 300px;
    .btn-submit {
      width: 100%;
      font-weight: bold;
    }
  }
}
</style>
