<template>
  <div class="page home-page">
    <Header :title="'我的备忘录'">
      <a slot="left" @click="prevMonth()">&lt;</a>
      <a slot="right" @click="nextMonth()">&gt;</a>
    </Header>
    <div class="page-con">
      <h2>{{this.currentYear}} {{this.currentMonth}}</h2>
      <ul class="calendar-con">
        <li v-for="item in weeks" :key="item" class="calendar-item">{{item}}</li>
        <template v-for="list in days">
          <li v-for="item in list" :key="item" class="calendar-item"
              @click="selectedDate(item)" v-bind:class="{'active': isSelected(item)}">
            <span>{{item}}</span>
          </li>
        </template>
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
      currentDay: null,
      selectYear: null,
      selectMonth: null,
      currentMonth: null,
      currentYear: null,
      days: []
    }
  },
  created () {
    const now = new Date()
    this.initDays(now)
  },
  methods: {
    isSelected (d) {
      return (this.selectYear === this.currentYear && this.selectMonth === this.currentMonth && +d === this.currentDay)
    },
    selectedDate (d) {
      this.setSelectMonth(this.currentMonth)
      this.setSelectYear(this.currentYear)
      this.setCurrentDay(d)
    },
    setCurrentDay (val) {
      this.currentDay = val
    },
    setSelectYear (y) {
      this.selectYear = y
    },
    setSelectMonth (m) {
      this.selectMonth = m
    },
    setCurrentYear (y) {
      this.currentYear = y
    },
    setCurrentMonth (m) {
      this.currentMonth = m
    },
    initDays (now) {
      const y = now.getFullYear()
      const m = now.getMonth() + 1
      const d = now.getDate()
      const w = now.getDay()
      this.initCurrentDate({y, m})
      const days = this.getDays({y, m, d, w})
      this.setDays(days)
      if (!this.selectYear && !this.selectMonth) {
        this.setSelectMonth(m)
        this.setSelectYear(y)
        this.setCurrentDay(d)
      }
    },
    initCurrentDate ({y, m}) {
      this.setCurrentYear(y)
      this.setCurrentMonth(m)
    },
    setDays (val) {
      this.days = val
    },
    changeDate () {
      const now = new Date(this.currentYear, this.currentMonth - 1)
      this.initDays(now)
    },
    prevMonth () {
      this.currentMonth -= 1
      if (this.currentMonth < 1) {
        this.currentMonth = 12
        this.currentYear -= 1
      }
      this.changeDate()
    },
    nextMonth () {
      this.currentMonth += 1
      if (this.currentMonth > 12) {
        this.currentMonth = 1
        this.currentYear += 1
      }
      this.changeDate()
    },
    getDays ({y, m, d, w}) {
      const days = this.getDay({y, m})
      const j = Math.ceil((days + w) / 7)
      const dayArr = []
      for (let k = 0; k < j; k++) {
        const week = []
        const n = k * 7 - w
        for (let i = 1; i < 8; i++) {
          const x = n + i
          if (x > 0 && x <= days) {
            week.push(x)
          } else {
            week.push(null)
          }
        }
        dayArr.push(week)
      }
      return [...dayArr]
    },
    // 获取一个月的天数
    getDay ({y, m}) {
      const day = 28
      switch (m) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          return 31
        case 2:
          return day
        default:
          return 30
      }
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
    font-size: .4rem;
    width: 100%/7;
    text-align: center;
    &.active {
      background: #ddd;
    }
  }
}
</style>
