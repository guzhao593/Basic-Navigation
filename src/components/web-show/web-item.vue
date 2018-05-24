<template>
  <a
    :href="isEditor ? getUrl(web.url) : null" 
    target="blank"
    class="web-link"
    :class="{editor: !isEditor}"
  >
    <slot></slot>
    <span>{{web.name}}</span>
    <template v-if="!isEditor">
      <i class="el-icon-edit icon-edit icon" @click="editWeb"></i>
      <i class="el-icon-circle-close icon-close icon" @click="deleteWeb"></i>
    </template>
  </a>
</template>

<script>
  import { BASE_URL } from 'config/api'
  import req from 'api/web'
  import MDialog from 'components/common/m-dialog.vue'
  export default {
    name: 'WebItem',
    components: {
      MDialog
    },
    props: {
      isEditor: Boolean,
      web: Object
    },
    data () {
      return {
      }
    },
    methods: {
      editWeb () {
        this.$emit('edit', this.web)
      },
      deleteWeb () {
        req('deleteWeb', {id: this.web.id})
          .then(data => {
            if (data.affectedRows) {
              this.$message({type: 'success', message: '删除成功'})
              this.$emit('againFetch')
            } else {
              this.$message({type: 'error', message: '删除失败'})
            }
          })
          .catch(err => {
            console.log(err)
          })
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
    color: #286090;
    font-size: 14px;
    float: left;
    width: 160px;
    margin: 6px 5px;
    padding: 0 0 0 10px;
    min-height: 30px;
    line-height: 30px;
    text-align: left;
    position: relative;
    @include text-ellipsis;
    &:hover{
      color: #F09B22;
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