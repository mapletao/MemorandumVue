<template>
  <div class="page home-page">
    <Header :title="'我的备忘录'"></Header>
    <div class="page-con">
      {{msg}}
    </div>
  </div>
</template>

<script>
import Header from '../components/common/Header'

export default {
  name: 'Home',
  data () {
    return {
      msg: 'hello word'
    }
  },
  created () {},
  components: {Header}
}
</script>

<style>

</style>
