<template>
  <el-container class="page-container">
    <!-- 标题 -->
    <page-title title="分类树" sub-title="分类树管理"/>
    <!-- 主体 -->
    <el-card>
      <!-- 头部 -->
      <div slot="header" class="card-header">
        <el-form :inline="true" size="small">
          <!-- 根据名称搜索 -->
          <el-form-item>
            <el-input v-model="searchId" placeholder="新增顶级分类" prefix-icon="el-icon-plus" :clearable="true" class="w200" @clear="getTableData">
              <el-button slot="append" @click="handleSearchId">新增</el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- tree -->
      <div class="card-body">
        <el-tree
          :data="treeData"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          draggable>
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="text" size="mini" @click="() => append(data)">Append</el-button>
              <el-button type="text" size="mini" @click="() => remove(node, data)">Delete</el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </el-card>
  </el-container>
</template>

<script>
import pageMixin from '@/mixin/page.js'
import treeData from './data'
export const router = {}
let id = 1000
export default {
  mixins: [
    pageMixin
  ],
  data () {
    return {
      treeData: treeData,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted () {
    // 加载后先自动请求一遍数据
    this.getTableData()
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] };
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    /**
     * 获取最基础的表格数据
     */
    getTableData () {
      // 搜索
      // this.loadingStart()
      // const { pageSize, currentPage } = this.page
      // this.$http.get('class', {
      //   params: {
      //     pageSize,
      //     currentPage,
      //     ...this.searchForm
      //   }
      // })
      //   .then(res => {
      //     this.loadingEnd()
      //     this.messageData(res)
      //     this.table.data = res.data.data.list
      //     this.page.total = res.data.data.total
      //   })
      //   .catch(err => {
      //     this.handleAjaxError(err)
      //   })
    },
    /**
     * 删除一个class
     */
    deleteOne (id) {
      this.loadingStart()
      this.$http.delete(`class/${id}`)
        .then(res => {
          this.loadingEnd()
          this.getTableData()
        })
        .catch(err => {
          this.handleAjaxError(err)
        })
    },
    /**
     * 点击了表格上某一行的编辑按钮
     */
    handleEdit (scope) {
      this.$router.push({
        name: 'manage-class-edit',
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
        name: 'manage-class-new'
      })
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
