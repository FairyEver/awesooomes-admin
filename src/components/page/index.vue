<template>
  <div class="mt-10" v-if="total > 1">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 40, 60, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    // 当前页面
    currentPage: {
      default: 1
    },
    // 每页的大小
    pageSize: {
      default: 10
    },
    // 总共
    total: {
      default: 0
    }
  },
  methods: {
    /**
     * 每页大小发生变化
     */
    handleSizeChange (val) {
      this.$emit('size-change', val)
    },
    /**
     * 页码变化
     */
    handleCurrentChange (val) {
      this.$emit('current-change', val)
    }
  }
}
</script>
