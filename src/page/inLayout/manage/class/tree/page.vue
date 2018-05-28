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
            <el-input v-model="appendTopName" placeholder="新增顶级分类" prefix-icon="el-icon-plus" :clearable="true" class="w200" @clear="getTableData">
              <el-button slot="append" @click="handleAppendTop">新增</el-button>
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
              <span @click="() => append(data)">
                <i class="el-icon-circle-plus-outline"></i> add
              </span>
              <span @click="() => remove(node, data)">
                <i class="el-icon-delete"></i> delete
              </span>
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
      appendTopName: '',
      treeData: [],
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
    append (data) {
      this.$prompt('请输入分类名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '分类名称不能为空'
      }).then(async ({ value }) => {
        await this.appendOne(value)
        // 新的节点信息
        const newChild = { id: id++, label: value, children: [] }
        // 如果插入的父节点没有子节点
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        // 如果插入的父节点有子节点
        data.children.push(newChild)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });       
      });
      
    },
    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    /**
     * 获取最基础的树数据
     */
    getTableData () {
      // 搜索
      this.loadingStart()
      this.treeData = treeData
      this.loadingEnd()
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
     * 新增一个class
     */
    appendOne (name = '') {
      return new Promise ((resolve, reject) => {
        this.loadingStart()
        this.$http.post('class', {
          name
        })
          .then(res => {
            this.loadingEnd()
            this.messageData(res)
            resolve()
          })
      })
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
    handleAppendTop () {
      console.log('handleAppendTop')
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
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
  }
}
</style>
