<template>
  <div class="modal-box" @click="mask">
    <div class="modal modal-in" @click.stop="">
      <header class="modal-header">
        <slot name="header">
          <h2>这是Modal弹框的标题</h2>
          <div type="button" class="btn-close" @click="close">x</div>
        </slot>
      </header>
      <div class="modal-con">
        <slot name="con">
          这是Modal弹框的主体
        </slot>
      </div>
      <footer class="modal-footer">
        <slot name="footer">
          <div type="button" class="btn-cancel" @click="close">取消</div>
          <div type="button" class="btn-ok" @click="ok">确定</div>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data () {
    return {}
  },
  methods: {
    close () {
      this.$emit('close')
    },
    ok () {
      this.$emit('ok')
    },
    mask () {
      this.close()
    }
  }
}
</script>

<style lang="less">
  .modal-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.3);
    .modal {
      position: absolute;
      width: 80%;
      background: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 20px;
      overflow: hidden;
    }
    .modal-header {
      position: relative;
      padding: 20px;
      font-size: 16px;
      border-bottom: 1px solid #ccc;
      .btn-close {
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 20px;
        width: 40px;
      }
    }
    .modal-con {
      padding: 20px 0;
      min-height: 200px;
    }
    .modal-footer {
      /*padding: 10px 0 0;*/
      border-top: 1px solid #ccc;
      font-size: 0;
      .btn-cancel {
        display: inline-block;
        background: #eaeaea;
        color: #9c9c9c;
        width: 50%;
        height: 60px;
        font-size: 16px;
        line-height: 60px;
      }
      .btn-ok {
        display: inline-block;
        background: #3876e0;
        color: #fff;
        width: 50%;
        height: 60px;
        font-size: 16px;
        line-height: 60px;
      }
    }
  }

</style>
