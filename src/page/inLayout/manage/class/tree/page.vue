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
            <el-input v-model="appendTopName" placeholder="新增顶级分类" prefix-icon="el-icon-plus" :clearable="true" class="w200">
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
              <span @click="() => handleAppend(data)">
                <i class="el-icon-circle-plus-outline"></i> add
              </span>
              <span @click="() => handleRemove(node, data)">
                <i class="el-icon-delete"></i> delete
              </span>
            </span>
          </span>
        </el-tree>
        <el-button type="primary" class="width-full mt-10" @click="handleSave">保存</el-button>
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
      appendTopName: '',
      treeData: [],
      classData: [],
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
    /**
     * 获得所有的 class
     */
    getClassData () {
      return new Promise(async (resolve, reject) => {
        this.$http.get('class-all')
          .then(res => {
            resolve(res.data.data)
          })
          .catch(err => {
            this.handleAjaxError(err)
          })
      })
    },
    /**
     * 获取最基础的树数据
     */
    async getTableData () {
      // 搜索
      this.loadingStart()
      // 先取得所有的分类
      this.classData = await this.getClassData()
      this.$http.get('class-tree')
        .then(res => {
          this.loadingEnd()
          this.messageData(res)
          this.treeData = res.data.data
        })
        .catch(err => {
          this.handleAjaxError(err)
        })
    },
    /**
     * 新增一个 class
     */
    append (name = '') {
      return new Promise((resolve, reject) => {
        this.loadingStart()
        this.$http.post('class', {
          name
        })
          .then(res => {
            this.loadingEnd()
            this.messageData(res)
            resolve(res.data.data)
          })
      })
    },
    /**
     * 删除一个class
     */
    delete (id) {
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
    handleAppend (data) {
      this.$prompt('请输入分类名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '分类名称不能为空'
      }).then(async ({ value: label }) => {
        const id = await this.append(label)
        if (!id) {
          return
        }
        console.log(label)
        // 新的节点信息
        const newChild = {
          id,
          label,
          children: []
        }
        console.log(newChild)
        // 如果插入的父节点没有子节点
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        // 如果插入的父节点有子节点
        data.children.push(newChild)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消插入'
        })
      })
    },
    /**
     * 接收新增顶级菜单事件
     */
    async handleAppendTop () {
      const id = await this.append(this.appendTopName)
      if (!id) {
        return
      }
      // 新的节点信息
      const newChild = {
        id,
        label: this.appendTopName,
        children: []
      }
      this.treeData.push(newChild)
    },
    handleRemove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
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
        .then(() => this.delete(scope.row.id))
        .catch(() => {})
    },
    /**
     * 点击了保存
     */
    handleSave () {
      console.log(JSON.stringify(this.treeData))
      console.log(JSON.stringify(this.dataZip(this.treeData)))
      // [{"i":86,"c":[{"i":90}]},{"i":87,"c":[{"i":89},{"i":91,"c":[{"i":88}]}]},{"i":92,"c":[{"i":93,"c":[{"i":95},{"i":97,"c":[{"i":94}]},{"i":96}]}]}]
    },
    // 压缩数据
    dataZip (data) {
      const arrayZip = (arr) => {
        return arr.map(item => {
          return {
            i: item.id,
            ...(item.children && item.children.length > 0) ? { c: arrayZip(item.children) } : {}
          }
        })
      }
      return arrayZip(data)
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
