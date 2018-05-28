<template>
  <el-container class="page-container">
    <!-- 标题 -->
    <page-title
      title="新建分类"
      sub-title="新建一个 class 标签"
      back-router-title="返回列表"
      back-router-name="manage-class-list"/>
    <!-- 主体 -->
    <el-card>
      <el-form :model="form" :rules="rules" ref="form" label-position="top">
        <el-form-item label="class 名称 (多条使用一个空格分隔)" prop="name">
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
export const router = {}
export default {
  mixins: [
    pageMixin
  ],
  data () {
    return {
      form: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 发送数据
     */
    sendData () {
      this.loadingStart()
      this.$http.post('class', {
        name: this.form.name
      })
        .then(res => {
          this.loadingEnd()
          this.messageData(res)
          this.form.name = ''
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
