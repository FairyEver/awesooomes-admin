<template>
  <el-container class="page">
    <el-table v-bind="table">
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            size="small"
            plain
            @click="handleEdit(scope)">
            修改
          </el-button>
          <el-button
            size="small"
            type="danger"
            plain
            @click="handleDelete(scope)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script>
export const router = {}
export default {
  data () {
    return {
      table: {
        data: [],
        border: true,
        stripe: true
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    /**
     * 获取数据
     */
    getData () {
      this.$http.get('tag', {
        params: {
          currentPage: 1,
          pageSize: 10
        }
      })
        .then(res => {
          this.table.data = res.data
        })
    },
    /**
     * 接收编辑事件
     */
    handleEdit (scope) {
      console.log(scope)
    },
    /**
     * 接收删除事件
     */
    handleDelete (scope) {
      console.log(scope)
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
}
</style>
