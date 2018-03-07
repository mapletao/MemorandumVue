<template>
  <div class="page-header">
    <slot name="left"></slot>
    <h2>{{title}}</h2>
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

<style scoped>

</style>
