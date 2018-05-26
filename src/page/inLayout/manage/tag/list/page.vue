<template>
  <el-container class="page-container">
    <!-- 标题 -->
    <page-title title="Tag 标签管理" sub-title="新增 修改 或者删除标签"/>
    <!-- 主体 -->
    <el-card>
      <!-- 头部 -->
      <div slot="header" class="card-header">
        <el-form :inline="true" size="small">
          <el-form-item>
            <el-button type="primary" icon="el-icon-plus" @click="handleNew">新建</el-button>
          </el-form-item>
          <!-- 根据名称搜索 -->
          <el-form-item>
            <el-input v-model="searchId" placeholder="id" prefix-icon="el-icon-search" :clearable="true" style="width: 150px;" @clear="getTableData">
              <el-button slot="append" icon="el-icon-search" @click="handleSearchId"></el-button>
            </el-input>
          </el-form-item>
        </el-form>
        <!-- 模糊查询面板 -->
        <el-collapse class="card-header-search-collapse">
          <el-collapse-item title="模糊查询" name="search">
            <!-- 模糊查询表单 -->
            <el-form :model="searchForm" :inline="true" size="small" ref="searchForm">
              <el-form-item prop="name">
                <el-input v-model="searchForm.name" placeholder="名称" :clearable="true" class="w100"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button plain icon="el-icon-search" type="primary" @click="getTableData" />
              </el-form-item>
              <el-form-item>
                <el-button plain icon="el-icon-refresh" type="warning" @click="handleResetSearchForm('searchForm')" />
              </el-form-item>
            </el-form>
            <!-- 模糊查询表单 结束 -->
          </el-collapse-item>
        </el-collapse>
      </div>
      <!-- 表格 -->
      <div class="card-body">
        <!-- 分页 -->
        <page v-if="page.pageSize > 10" class="mb-5" v-bind="page" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
        <!-- 表格 -->
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
        <page class="mt-5" v-bind="page" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
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
      searchForm: {
        name: ''
      },
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
      const { pageSize, currentPage } = this.page
      this.$http.get('tag', {
        params: {
          pageSize,
          currentPage,
          ...this.searchForm
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
     * 点击了表格上某一行的编辑按钮
     */
    handleEdit (scope) {
      this.$router.push({
        name: 'manage-tag-edit',
        params: {
          id: scope.row.id
        }
      })
    },
    /**
     * 点击了表格上某一行的删除按钮
     */
    handleDelete (scope) {
      this.$confirm(`确认删除 "${scope.row.name}" ?`)
        .then(() => this.deleteOne(scope.row.id))
        .catch(() => {})
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
    },
    /**
     * 接收点击复位模糊搜索表单
     */
    handleResetSearchForm (formName) {
      // 清空表单
      this.resetForm(formName)
      // 自动搜索数据
      this.getTableData()
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  .card-header {
    margin: -10px;
    .el-form-item {
      margin-bottom: 0px;
      margin-right: 5px;
    }
    .el-input-group--append {
      margin-top: -1px;
    }
  }
  .card-body {
    margin: -10px;
  }
}
</style>
