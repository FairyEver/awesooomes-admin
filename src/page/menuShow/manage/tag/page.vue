<template>
  <el-container class="page">
    hello
  </el-container>
</template>

<script>
export const router = {}
export default {
  mounted () {
    this.$http.post('test')
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
