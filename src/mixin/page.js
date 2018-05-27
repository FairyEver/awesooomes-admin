export default {
  data () {
    return {
      loading: null,
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      tableStyle: {
        size: 'mini',
        border: true,
        stripe: true
      }
    }
  },
  computed: {
    /**
     * 页面表格设置和通用默认设置混合
     * 这个值是直接给表格的
     */
    tableComputed () {
      return {
        ...this.tableStyle,
        ...this.table
      }
    }
  },
  methods: {
    /**
     * 数据加载后显示提示信息
     * @param {*} res ajax返回的数据
     */
    messageData (res) {
      this.$message({
        message: res.data.msg,
        type: res.data.code === 0 ? 'success' : 'error'
      })
    },
    /**
     * 每页大小发生变化
     * @param {number} val 新的页面条目数量
     */
    handleSizeChange (val) {
      this.page.currentPage = 1
      this.page.pageSize = val
      this.getTableData()
    },
    /**
     * 页码变化
     * @param {number} val 新的页码
     */
    handleCurrentChange (val) {
      this.page.currentPage = val
      this.getTableData()
    },
    /**
     * 接收清空表单的事件
     * @param {string} formName 表单的ref
     */
    resetForm (formName) {
      console.log(formName)
      this.$refs[formName].resetFields()
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
     * 结束显示loading
     */
    loadingEnd () {
      this.loading.close()
    },
    /**
     * 通用的页面异步请求错误处理
     * @param {error} err 错误对象
     */
    handleAjaxError (err) {
      console.log(err)
    }
  }
}
