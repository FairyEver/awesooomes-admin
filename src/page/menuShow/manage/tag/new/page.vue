<template>
  <el-container class="page-container">
    <!-- 标题 -->
    <page-title title="新建 Tag" sub-title="新建一个 tag 标签"/>
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
    sendData () {
      this.loadingStart()
      this.$http.post('tag', {
        name: this.form.name
      })
        .then(res => {
          this.loadingEnd()
          this.messageData(res)
          this.form.name = ''
        })
    },
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
