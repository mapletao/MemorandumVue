<template>
  <div class="page-header">
    <slot name="left"></slot>
    <h2 class="header-title">{{title}}</h2>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['title'],
  data () {
    return {}
  }
}
</script>

<style lang="less">
  .page-header {
    .header-title {
      width: 100%;
    }
  }
</style>
