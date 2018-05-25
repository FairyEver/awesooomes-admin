<template>
  <div>
    <h1 class="mt-0">
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
    }
  }
}
</script>

<style lang="scss" scoped>
.sub-title {
  font-size: 12px;
  opacity: .3;
}
</style>
