<template>
  <div class="web-show">
    <i class="el-icon-plus setting add" @click="handlerAdd()"></i>
    <i class="el-icon-setting setting edit" @click="handlerEdit()"></i>
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
      @start="moveStart"
      @end="moveEnd"
    >
      <transition-group>
        <web-item 
          v-for="(web, index) of webData"
          :key="index"
          :web="web"
          :isEditor="isEditor"
          @againFetch="fetch($route.params)" 
          @edit="edit"
        >
        </web-item>
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
        isEditor: true,
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
        req('web', {class: className}).then(data => {
          this.webData = data
        })
      },
      edit (dialogForm) {
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
        this.dialogForm = {class: this.$route.params.className}
      },
      moveEnd (item) {
        console.log('End', item)
      },
      moveStart (item) {
        console.log('move', item)
      },
      undo () {
        this.isShowDialog = false
      },
      submit () {
        this.isAdd = false
        this.isShowDialog = false
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
    .setting{
      position: absolute;
      top: -26px;
      font-size: 18px;
      color: #FF5E53;
      transition: 0.5s all;
      &:hover{
        color: rgb(86, 29, 151);
        cursor: pointer;
        // transform: rotate(180deg);
      }
    }
    .edit{
      right: 10px;
    }
    .add{
      right: 40px;
    }
  }
  
</style>