export default {
  data () {
    return {
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  methods: {
    /**
     * 数据加载后显示提示信息
     */
    messageData (res) {
      this.$message({
        message: res.data.msg,
        type: res.data.code === 0 ? 'success' : 'error'
      })
    },
    /**
     * 每页大小发生变化
     */
    handleSizeChange (val) {
      this.page.pageSize = val
      this.getData()
    },
    /**
     * 页码变化
     */
    handleCurrentChange (val) {
      this.page.currentPage = val
      this.getData()
    }
  }
}
