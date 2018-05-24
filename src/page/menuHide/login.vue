<template>
  <el-container class="page flex-center-column height-full">
    <h1 class="mb-0">虽然丑但是能用的登陆</h1>
    <p>赶工...</p>
    <el-card shadow="never" class="card">
      <el-input v-model="form.username" placeholder="用户名" class="mb-10"></el-input>
      <el-input type="password" v-model="form.password" placeholder="密码" class="mb-10"></el-input>
      <el-button type="primary" class="btn-submit">GO GO GO</el-button>
    </el-card>
  </el-container>
</template>

<script>
export default {
  name: 'loginPage',
  data () {
    return {
      form: {
        username: 'liyang',
        password: '666666'
      }
    }
  }
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
