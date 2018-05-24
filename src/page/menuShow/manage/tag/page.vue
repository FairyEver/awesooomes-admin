<template>
  <el-container class="page">
    hello
  </el-container>
</template>

<script>
export const router = {}
export default {
  mounted () {
    this.$http.get('tag', {
      params: {
        currentPage: 1,
        pageSize: 10
      }
    })
      .then(res => {
        console.log(res)
      })
  }
}
</script>

<style lang="scss" scoped>
.page {
}
</style>
