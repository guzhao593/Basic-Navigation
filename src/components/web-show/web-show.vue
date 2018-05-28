<template>
  <div class="web-show">
    <div class="setting">
      <i 
        class="edit" 
        :class="{
          'el-icon-setting': !isEditor,
          'el-icon-circle-check-outline': isEditor
        }"
        @click="handlerEdit"
      ></i>
    </div>
    
    <draggable
      v-model="webData"
      element="div"
      :options="{
        disabled: isEditor, // 设置是否可拖动
        chosenClass: 'choose', // 选择元素的class类名
        ghostClass: 'ghost', // 占位元素的class类名
        animation: 150, // 动画效果
        dragClass: 'drag' // 拖动元素的class类名
      }"
      @end="moveEnd"
    >
      <transition-group>
        <web-item 
          v-for="(web, index) of webData"
          :key="index"
          :web="web"
          :isEditor="!isEditor"
          @againFetch="fetch($route.params)" 
          @edit="edit"
        >
        </web-item>
        <div 
          v-if="isEditor"
          key="addWebsite" 
          class="addWebsite"
          @click="handlerAdd"
        >
          <i class="icon el-icon-plus"></i>
        </div>
      </transition-group>
    </draggable>
    <web-dialog
      v-if="isShowDialog"
      :isShowDialog.sync="isShowDialog"
      :dialogForm="dialogForm"
      :title="title"
      :toolbar="toolbar"
    ></web-dialog>
  </div>
</template>

<script>
  import req from 'api/web'
  import { selectSort } from 'util/sortMethods'
  import draggable from 'vuedraggable'
  import WebItem from './web-item.vue'
  import MDialog from 'components/common/m-dialog.vue'
  import MSelect from 'components/common/m-select.vue'
  import WebDialog from './web-dialog.vue'
  export default {
    name: 'WebShow',
    components: {
      draggable,
      WebItem,
      MSelect,
      MDialog,
      WebDialog
    },
    data () {
      return {
        webData: [],
        title: '',
        isEditor: false,
        isAdd: false,
        isShowDialog: false,
        dialogForm: {},
        toolbar: [
          {
            type: 'plain',
            name: '取消',
            func: () => this.undo()
          },
          {
            type: 'primary',
            name: '确定',
            func: () => this.submit()
          }
        ]
      }
    },
    created () {
      this.fetch(this.$route.params)
    },
    methods: {
      fetch ({className}) {
        req('getWebsite', {class: className}).then(data => {
          this.webData = selectSort(data, 'orderNo')
        })
      },
      edit (dialogForm) {
        this.isAdd = false
        this.isShowDialog = true
        this.title = '修改网址'
        this.dialogForm = dialogForm
      },
      handlerEdit () {
        this.isEditor = !this.isEditor
      },
      handlerAdd () {
        this.isAdd = true
        this.isShowDialog = true
        this.title = '添加网址'
        this.dialogForm = {class: this.$route.params.className, orderNo: this.webData.length}
      },
      moveEnd ({oldIndex, newIndex}) {
        req('updateWebsiteOrderNO', {webData: this.webData})
          .then(data => {
            if (data) {
              this.fetch(this.$route.params)
            }
          })
      },
      undo () {
        this.isShowDialog = false
      },
      submit () {
        if (this.isAdd) {
          this.reqFunc('addWebsite', '添加')
        } else {
          this.reqFunc('updateWebsite', '修改')
        }
      },
      reqFunc (reqAddress, status) {
        req(reqAddress, this.dialogForm)
          .then((res) => {
            if (res.affectedRows) {
              this.$message({type: 'success', message: `${status}成功`})
              this.threeElementOpration()
            } else {
              this.$message({type: 'error', message: `${status}失败`})
            }
          })
          .catch()
        this.isAdd = false
        this.isShowDialog = false
      },
      threeElementOpration () {
        this.dialogForm.class === this.$route.params.className ? this.fetch(this.$route.params) : this.$router.push(this.dialogForm.class)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .choose{
    background-color: #ccc;
  }
  .ghost{
    Opacity: 0;
  }
  .drag{
    Opacity: 0.8;
    background-color: #999;
  }
  .web-show {
    position: relative;
    height: calc(100vh - 146px);
    overflow-y: scroll;
    padding: 10px;
    background: #fff;
    box-sizing: border-box;
    border-radius: 5px;
    border-top-right-radius: 10px;
    box-shadow: 5px 5px 5px #666;
    .setting{
      position: absolute;
      top: 0px;
      right: 0px;
      background: #f09b22;
      border-bottom-left-radius: 10px;
      height: 24px;
      width: 22px;
      font-size: 18px;
      text-align: center;
      color: white;
      transition: 0.5s all;
      &:hover{
        color: #d9ffd0;
        cursor: pointer;
      }
    }
    .edit{
      right: 0px;
    }
    .add{
      right: 40px;
    }
  }
  .addWebsite{
    color: #286090;
    font-size: 20px;
    font-weight: 700;
    float: left;
    width: 160px;
    margin: 6px 5px;
    padding: 0 0 0 10px;
    min-height: 30px;
    line-height: 30px;
    text-align: center;
    position: relative;
    background-color: #eee;
    border:1px dotted #ccc;
    &:hover{
      border-color: #666;
      color: #337ab7;
      text-decoration: none;
    }
  }
</style>