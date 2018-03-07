<template>
  <div class="page home-page">
    <Header :title="'我的备忘录'"></Header>
    <div class="page-con">
      <ul class="calendar-con">
        <li v-for="item in weeks" :key="item" class="calendar-item">{{item}}</li>
        <li v-for="item in days" :key="item" class="calendar-item"><span>{{item}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '../components/common/Header'

export default {
  name: 'Home',
  data () {
    return {
      msg: 'hello word',
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
      days: []
    }
  },
  created () {
    this.initDays()
  },
  methods: {
    initDays () {
      const now = new Date()
      console.log(now)
    }
  },
  components: {Header}
}
</script>

<style lang="less">
.calendar-con {
  list-style: none;
  font-size: 0;
  .calendar-item {
    display: inline-block;
    font-size: .7rem;
    width: 100%/7;
    text-align: center;
  }
}
</style>
