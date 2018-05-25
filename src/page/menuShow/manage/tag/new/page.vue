<template>
  <el-container class="page-container">
    <!-- 标题 -->
    <page-title
      title="新建 Tag"
      sub-title="新建一个 tag 标签"
      back-router-title="返回列表"
      back-router-name="manage-tag-list"/>
    <!-- 主体 -->
    <el-card>
      <div>
        <el-tag
          v-for="(name, index) in nameArray"
          :key="index"
          type="info"
          class="mr-10">
          {{name}}
        </el-tag>
      </div>
      <el-form :model="form" :rules="rules" ref="form" label-position="top">
        <el-form-item label="tag 名称 (多条使用英文逗号分隔)" prop="name">
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
  computed: {
    nameArray () {
      return this.form.name === '' ? [] : this.form.name.split(',').filter(name => name !== '')
    }
  },
  methods: {
    /**
     * 发送数据
     */
    sendData () {
      this.loadingStart()
      this.$http.post('tag', {
        names: this.nameArray
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
