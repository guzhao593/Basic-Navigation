<template>
  <el-dialog
    :visible.sync="isDialogVisible"
    :title="title"
    :width="width"
    @close="close"
  >
    <slot></slot>
    <span slot="footer" class="dialog-footer">
      <el-button
        v-for="(item, idx) of toolbar"
        :key="idx"
        @click="handlerMethods(item.func)"
        :type="item.type"
        size="small"
      >
        {{item.name}}
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'BDialog',
    props: {
      toolbar: Array,
      title: String,
      dialogVisible: {
        type: Boolean,
        default: false
      },
      width: {
        type: String,
        default: '30vw'
      }
    },
    data () {
      return {
        isDialogVisible: this.dialogVisible
      }
    },
    watch: {
      isDialogVisible (newVal) {
        this.$emit('update:dialogVisible', newVal)
      }
    },
    methods: {
      handlerMethods (func) {
        if (typeof func !== 'function') return false
        func()
      },
      close () {
        this.$emit('close', false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  $bg-color: #eee;
  .el-dialog__wrapper{
    /deep/ .el-dialog{
      border-radius: 8px;
      .el-dialog__header{
        padding: 0px;
        text-align: center;
        line-height: 40px;
        border-radius: 8px 8px 0 0;
        background-color: $bg-color;
        .el-dialog__headerbtn{
          top: 13px;
        }
      }
      .el-dialog__body{
        padding: 20px 20px 0 20px;
      }
      .el-dialog__footer{
        padding: 10px 20px;
        background-color: $bg-color;
        border-radius: 0 0 8px 8px;
        // .el-button{
        //   padding: 7px 15px;
        // }
      }
    }
  }
      
</style>

