<template>
  <el-container class="page-container">
    <!-- 标题 -->
    <page-title title="Tag 标签管理" sub-title="新增 修改 或者删除标签"/>
    <!-- 主体 -->
    <el-card>
      <!-- 头部 -->
      <el-form slot="header" :inline="true" size="small" class="card-header">
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="handleNew">新建</el-button>
        </el-form-item>
        <!-- 根据名称搜索 -->
        <el-form-item>
          <el-input
            v-model="searchId"
            placeholder="id"
            prefix-icon="el-icon-search"
            :clearable="true"
            style="width: 150px;"
            @clear="getTableData">
            <el-button slot="append" icon="el-icon-search" @click="handleSearchId"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <div class="card-body">
        <el-table v-bind="table">
          <el-table-column prop="id" label="ID" align="center" width="60"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column label="操作" align="center" width="140">
            <template slot-scope="scope">
              <el-button size="mini" plain @click="handleEdit(scope)" icon="el-icon-edit"/>
              <el-button size="mini" type="danger" plain @click="handleDelete(scope)" icon="el-icon-delete"/>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <page v-bind="page" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
      </div>
    </el-card>
  </el-container>
</template>

<script>
import pageMixin from '@/mixin/page.js'
export const router = {}
export default {
  mixins: [
    pageMixin
  ],
  data () {
    return {
      searchId: '',
      table: {
        data: [],
        size: 'mini',
        border: true,
        stripe: true
      }
    }
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    /**
     * 获取最基础的表格数据
     */
    getTableData () {
      // 清空搜索条件
      this.searchId = ''
      // 搜索
      this.loadingStart()
      this.$http.get('tag', {
        params: {
          ...this.page
        }
      })
        .then(res => {
          this.loadingEnd()
          this.messageData(res)
          this.table.data = res.data.data.list
          this.page.total = res.data.data.total
        })
    },
    /**
     * 通过 id 精确搜索
     */
    searchById () {
      this.loadingStart()
      this.$http.get(`tag/${this.searchId}`)
        .then(res => {
          this.loadingEnd()
          this.messageData(res)
          this.table.data = res.data.data.list
          this.page.total = res.data.data.total
        })
    },
    /**
     * 删除一个tag
     */
    deleteOne (id) {
      this.loadingStart()
      this.$http.delete(`tag/${id}`)
        .then(res => {
          this.loadingEnd()
          this.getTableData()
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
      this.$confirm(`确认删除 "${scope.row.name}" ?`)
        .then(_ => {
          this.deleteOne(scope.row.id)
        })
        .catch(_ => {})
    },
    /**
     * 接收新增事件
     */
    handleNew () {
      this.$router.push({
        name: 'manage-tag-new'
      })
    },
    /**
     * 接收搜索事件 根据 name 搜索
     */
    handleSearchName () {
      //
    },
    /**
     * 接收搜索事件 根据 id 搜索
     */
    handleSearchId () {
      // 写了搜索id 用id查
      // 没写id 直接拉取数据
      if (this.searchId) {
        this.searchById()
      } else {
        this.getTableData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  .card-header {
    margin: -10px;
  }
  .el-form-item {
    margin-bottom: 0px;
    margin-right: 5px;
  }
  .el-input-group--append {
    margin-top: -1px;
  }
  .card-body {
    margin: -10px;
  }
}
</style>
