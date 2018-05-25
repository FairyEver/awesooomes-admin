<template>
  <el-container class="page-table-list">
    <!-- 标题 -->
    <page-title title="Tag 标签管理" sub-title="新增 修改 或者删除标签"/>
    <!-- 主体 -->
    <el-card>
      <!-- 头部 -->
      <el-form slot="header" :inline="true" size="small" class="card-header">
        <el-form-item>
          <el-button type="primary" @click="handleNew">新建</el-button>
        </el-form-item>
        <!-- 根据名称搜索 -->
        <el-form-item>
          <el-input v-model="searchTagName" placeholder="tag name" prefix-icon="el-icon-search" style="width: 150px;">
            <el-button v-if="searchTagName" slot="append" icon="el-icon-search" @click="handleSearchName"></el-button>
          </el-input>
        </el-form-item>
        <!-- 根据名称搜索 -->
        <el-form-item>
          <el-input v-model="searchTagId" placeholder="tag id" prefix-icon="el-icon-search" style="width: 150px;">
            <el-button v-if="searchTagId" slot="append" icon="el-icon-search" @click="handleSearchId"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <div class="card-body">
        <el-table v-bind="table" class="mb-10">
          <el-table-column prop="id" label="ID" align="center" width="60"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column label="操作" align="center" width="160">
            <template slot-scope="scope">
              <el-button size="small" plain @click="handleEdit(scope)">修改</el-button>
              <el-button size="small" type="danger" plain @click="handleDelete(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <page
          v-bind="page"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"/>
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
      searchTagName: '',
      searchTagId: '',
      table: {
        data: [],
        size: 'mini',
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
          ...this.page
        }
      })
        .then(res => {
          this.messageData(res)
          this.table.data = res.data.data.list
          this.page.total = res.data.data.total
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
     * 接收搜索事件 根据 name 搜索
     */
    handleSearchName () {
      //
    },
    /**
     * 接收搜索事件 根据 id 搜索
     */
    handleSearchId () {
      //
    }
  }
}
</script>

<style lang="scss" scoped>
.page-table-list {
  flex-direction: column;
  .card-header {
    margin: -10px;
  }
  .el-form-item {
    margin-bottom: 0px;
    margin-right: 5px;
  }
  .card-body {
    margin: -10px;
  }
}
</style>
