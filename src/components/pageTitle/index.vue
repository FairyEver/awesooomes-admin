<template>
  <div>
    <h1 class="mt-0">
      <el-button
        v-if="backRouterName"
        size="small"
        @click="handleBack"
        class="btn-back">
        {{backRouterTitle}}
      </el-button>
      {{title}}
      <span class="sub-title" v-if="subTitle">{{subTitle}}</span>
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: 'title'
    },
    subTitle: {
      default: ''
    },
    backRouterTitle: {
      default: '返回'
    },
    backRouterName: {
      default: ''
    }
  },
  methods: {
    handleBack () {
      this.$router.push({
        name: this.backRouterName
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sub-title {
  font-size: 12px;
  opacity: .3;
}
.btn-back {
  padding-left: 8px;
  padding-right: 8px;
}
</style>
