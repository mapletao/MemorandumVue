<template>
  <div class="page home-note">
    <Header :title="title">
      <button slot="right" class="page-header-right" @click="setEditStatus(true)" v-if="!editStatus">编辑</button>
    </Header>
    <!--@click="setShowModal(true)"-->
    <div class="page-con">
      <div class="form-item">
        联系电话:
        <input type="text" v-model="note.mobile" v-if="editStatus" class="form-input"/>
        <span v-if="!editStatus">{{note.mobile}}</span>
      </div>
      <div class="form-item">
        访问人:
        <input type="text" v-model="note.name" v-if="editStatus" class="form-input"/>
        <span v-if="!editStatus">{{note.name}}</span>
      </div>
      <div class="form-item">
        备注：
        <textarea v-model="note.remark" v-if="editStatus" class="form-input"></textarea>
        <span v-if="!editStatus">{{note.remark}}</span>
      </div>
      <footer class="page-footer">
        <button @click="setEditStatus(false)" v-if="editStatus">取消</button>
        <button @click="saveOk()" v-if="editStatus">保存</button>
        <button @click="setShowModal(true)" v-if="!editStatus">删除</button>
      </footer>
    </div>
    <MyModal v-if="showModal" @close="close" @ok="del"></MyModal>
  </div>
</template>

<script>
import Header from '../components/common/Header'
import MyModal from '../components/common/MyModal'
import {getNote} from '../services/notes/notes'
export default {
  name: 'Note',
  data () {
    return {
      title: null,
      showModal: false,
      id: null,
      note: {},
      editStatus: false
    }
  },
  created () {
    this.id = this.$route.params.id
    this.init()
  },
  methods: {
    setShowModal (val) {
      this.showModal = val
    },
    setEditStatus (val) {
      this.editStatus = Boolean(val)
    },
    setNote (val) {
      this.note = val
    },
    setTitle (val) {
      this.title = val
    },
    init () {
      if (this.id < 1) {
        this.setTitle('添加笔记')
        this.setEditStatus(true)
      } else {
        this.setTitle('笔记详情')
        this.setEditStatus(false)
        this.getNote()
      }
    },
    close () {
      this.setShowModal(false)
    },
    del (val) {},
    saveOk () {},
    getNote () {
      getNote(this.id)
        .then(res => {
          this.setNote(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  components: {Header, MyModal}
}
</script>

<style lang="less">
.home-note {
  .page-header-right {
    width: 100px;
    color: #2155d8;
  }
  .form-item {
    margin: 0 20px 20px;
    text-align: left;
    .form-input {
      border: 1px solid #ddd;
      vertical-align: text-top;
    }
  }
}
</style>
