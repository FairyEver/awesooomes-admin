export default {
  data () {
    return {
      loading: null,
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
      this.getTableData()
    },
    /**
     * 页码变化
     */
    handleCurrentChange (val) {
      this.page.currentPage = val
      this.getTableData()
    },
    /**
     * 开始显示loading
     */
    loadingStart () {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.5)'
      })
    },
    /**
     * 开始显示loading
     */
    loadingEnd () {
      this.loading.close()
    }
  }
}
