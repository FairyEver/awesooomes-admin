<template>
  <el-container class="page-container">
    <!-- 标题 -->
    <page-title
      title="编辑 Tag"
      sub-title="编辑一个已存在的 tag 标签"
      back-router-title="返回列表"
      back-router-name="manage-tag-list"/>
    <!-- 主体 -->
    <el-card>
      <el-form :model="form" :rules="rules" ref="form" label-position="top">
        <el-form-item label="tag 名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" icon="el-icon-check">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>

<script>
import pageMixin from '@/mixin/page.js'
export const router = {
  props: true,
  pathSuffix: '/:id'
}
export default {
  mixins: [
    pageMixin
  ],
  props: {
    id: {
      default: ''
    }
  },
  data () {
    return {
      form: {
        id: '',
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    // 请求数据
    this.searchById()
  },
  methods: {
    /**
     * 通过 id 精确搜索
     */
    searchById () {
      this.loadingStart()
      this.$http.get(`tag/${this.id}`)
        .then(res => {
          this.loadingEnd()
          this.messageData(res)
          this.form.id = res.data.data.list[0].id
          this.form.name = res.data.data.list[0].name
        })
    },
    /**
     * 发送数据
     */
    sendData () {
      this.loadingStart()
      this.$http.put(`tag/${this.form.id}`, {
        name: this.form.name
      })
        .then(res => {
          this.loadingEnd()
          this.messageData(res)
          if (res.data.code === 0) {
            this.$router.push({
              name: 'manage-tag-list'
            })
          }
        })
    },
    /**
     * 表单提交
     */
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.sendData()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
