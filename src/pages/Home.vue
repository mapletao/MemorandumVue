<template>
  <div class="page home-page">
    <Header :title="'我的备忘录'">
    </Header>
    <div class="page-con">
      <div class="calendar-header">
        <span @click="prevMonth()" class="header-left">&lt;</span>
        {{this.currentYear}} {{this.currentMonth}}
        <span @click="nextMonth()" class="header-right">&gt;</span>
      </div>
      <ul class="calendar-con">
        <li v-for="item in weeks" :key="item" class="calendar-item">
          <span>{{item}}</span>
        </li>
        <template v-for="list in days">
          <li v-for="item in list" :key="item" class="calendar-item"
              @click="selectedDate(item)" v-bind:class="{'active': isSelected(item)}">
            <span>{{item}}</span>
          </li>
        </template>
      </ul>
      <ul class="note-con">
        <router-link :to="'note/'+item.id" tag="li" v-for="item in notes" :key="item.name">
          mobile:{{item.mobile}}
          name:{{item.name}}
          remark: {{item.remark}}
        </router-link>
        <router-link :to="'note/0'" tag="li" class="add-note" >+</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '../components/common/Header'
import {getNotes} from '../services/notes/notes'
import Modal from '../components/common/MyModal'

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
      notes: [],
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
      this.getNotes()
    },
    getNotes () {
      getNotes().then(res => {
        this.setNotes(res)
      })
    },
    setNotes (val) {
      this.notes = val
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
        this.getNotes()
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
      const day = (y % 400 === 0 || (y % 100 !== 0 && y % 4 === 0)) ? 29 : 28
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
  components: {Header, Modal}
}
</script>

<style lang="less">

  @import '../assets/css/theme.less';
  .home-page {
    .calendar-header {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      font-size: @fontSize14;
    }
    .calendar-con {
      list-style: none;
      font-size: 0;
      @width: 100%/7;
      .calendar-item {
        display: inline-block;
        position: relative;
        font-size: @fontSize14;
        width: @width;
        height:0;
        padding-bottom: @width;
        overflow: hidden;
        >span {
          .center()
        }
        &.active {
          @width: 60px;
          @borderColor: #5458e4;
          > span {
            z-index: 1;
            color: #fff;
          }
          .angle() {
            width: 0;
            height: 0;
            position: absolute;
            border-left: @width*2/3 solid transparent;
            border-right: @width*2/3 solid transparent;
          }
          &:after {
            content: '';
            .center();
            .angle();
            top: 40%;
            border-bottom: @width solid @borderColor;
          }
          &:before {
            content: '';
            .center();
            .angle();
            top: 60%;
            border-top: @width solid @borderColor;
          }
        }
      }
    }
    .note-con {
      font-size: @fontSize14;
      padding: 0 10px;
      >li {
        margin: 10px 0;
        background: #ccc;
      }
      .add-note {
        border: 1px dotted #ddd;
        font-size: 20px;
        text-align: center;
        background: none;
      }
    }
  }
</style>
