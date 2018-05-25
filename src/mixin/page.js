export default {
  methods: {
    messageData (res) {
      this.$message({
        message: res.data.msg,
        type: res.data.code === 0 ? 'success' : 'error'
      })
    }
  }
}
