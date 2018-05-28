<template>
  <el-container class="page-container">
    <!-- 标题 -->
    <page-title title="分类树" sub-title="分类树管理"/>
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
export const router = {}
let id = 1000
export default {
  mixins: [
    pageMixin
  ],
  data () {
    return {
      treeData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2',
          children: [{
            id: 11,
            label: '三级 3-2-1'
          }, {
            id: 12,
            label: '三级 3-2-2'
          }, {
            id: 13,
            label: '三级 3-2-3'
          }]
        }]
      }],
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
