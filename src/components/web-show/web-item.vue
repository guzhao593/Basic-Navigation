<template>
  <a
    :href="isEditor ? getUrl(web.url) : null" 
    target="blank"
    class="web-link"
    :class="{editor: !isEditor}"
  >
    <span>{{web.name}}</span>
    <template v-if="!isEditor">
      <i class="el-icon-edit icon-edit icon" @click="editWeb"></i>
      <i class="el-icon-circle-close icon-close icon" @click="deleteWeb"></i>
    </template>
    <el-dialog
      title="修改"
      :visible.sync="isShowDialog"
      width="30%"
    >
      <el-form label-width="80px">
        <el-form-item label="网站名称：">
          <el-input v-model="web.name"></el-input>
        </el-form-item>
        <el-form-item label="网址：">
          <el-input v-model="web.url"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="undo">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </a>
</template>

<script>
  import { BASE_URL } from 'config/api'
  import req from 'api/web'
  export default {
    name: 'WebItem',
    props: {
      isEditor: Boolean,
      web: Object
    },
    data () {
      return {
        isShowDialog: false
      }
    },
    methods: {
      editWeb () {
        this.isShowDialog = true
        this.$emit('undoDraggable', true)
      },
      deleteWeb () {
        req('deleteWeb', {id: this.web.id})
          .then(data => {
            data === 'ok' && this.$emit('againFetch')
          })
          .catch(err => {
            console.log(err)
          })
      },
      undo () {
        this.isShowDialog = false
        this.$emit('undoDraggable', false)
      },
      submit () {
        this.isShowDialog = false
        this.$emit('undoDraggable', false)
      },
      getUrl (url) {
        return url.includes('http') ? url : `${BASE_URL}\\${url}`
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'style/mixin.scss';
  .web-link{
    display: block;
    color: #337ab7;
    font-size: 12px;
    float: left;
    width: 160px;
    margin: 5px 5px;
    padding: 0 0 0 10px;
    min-height: 30px;
    line-height: 30px;
    text-align: left;
    position: relative;
    @include text-ellipsis;
    &:hover{
      text-decoration: underline;
      color: #FF5E53;
      // background-color: #eff;
    }
    .icon{
      font-size: 16px;
      position: absolute;
      top: 6px;
    }
    .icon-edit{
      right: 25px;
      &:hover{
        color: #2dd62d;
      }
    }
    .icon-close{
      right:5px;
      &:hover{
        color: #f00;
      }
    }
  }
  .editor{
    background-color: #eee;
    width: 115px;
    border:1px dotted #ccc;
    padding-right: 45px;
    &:hover{
      border-color: #666;
      color: #337ab7;
      text-decoration: none;
    }
  }
</style>