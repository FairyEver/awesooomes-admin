<template>
  <el-container class="page">
    <el-card>
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <h1 class="mt-0 mb-0">Tag 标签管理</h1>
        <p class="mt-5">管理你的标签</p>
        <div>
          <el-form :inline="true">
            <el-form-item>
              <el-button type="primary" @click="handleNew">新建</el-button>
            </el-form-item>
            <el-form-item>
              <el-input v-model="searchText" placeholder="tag name" prefix-icon="el-icon-search"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-if="searchText !== ''" @click="handleSearch">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 表格 -->
      <el-table v-bind="table">
        <el-table-column prop="id" label="ID" align="center" width="60"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <el-button size="small" plain @click="handleEdit(scope)">修改</el-button>
            <el-button size="small" type="danger" plain @click="handleDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100">
      </el-pagination>
    </el-card>
  </el-container>
</template>

<script>
export const router = {}
export default {
  data () {
    return {
      searchText: '',
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
     * 删除一个tag
     */
    deleteTag (id) {
      this.$http.delete(`tag/${id}`)
        .then(res => {
          this.getData()
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
      this.deleteTag(scope.row.id)
    },
    /**
     * 接收新增事件
     */
    handleNew () {
      //
    },
    /**
     * 接收搜索事件
     */
    handleSearch () {
      //
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  flex-direction: column;
  .el-form-item {
    margin-bottom: 0px;
  }
}
</style>
