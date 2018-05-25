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
          <el-button type="primary" @click="submitForm">创建</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>

<script>
export const router = {}
export default {
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
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
