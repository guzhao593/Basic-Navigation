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
    <m-dialog
      v-if="isShowDialog"
      :dialog-visible.sync="isShowDialog"
      :title="title"
      :toolbar="toolbar"
    >
      <el-form label-width="100px" :model="dialogForm">
        <el-form-item label="网站名称：">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="网址：">
          <el-input v-model="dialogForm.url"></el-input>
        </el-form-item>
        <el-form-item label="分类：">
          <m-select
            v-model="dialogForm.class"
            :options="$store.state.menu.menuData"
            :property="menuProperty"
          ></m-select>
        </el-form-item>
      </el-form>
    </m-dialog>
  </div>
</template>

<script>
  import req from 'api/web'
  import draggable from 'vuedraggable'
  import WebItem from './web-item.vue'
  import MDialog from 'components/common/m-dialog.vue'
  import MSelect from 'components/common/m-select.vue'
  export default {
    name: 'WebShow',
    components: {
      draggable,
      WebItem,
      MSelect,
      MDialog
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
        ],
        menuProperty: {
          label: 'className',
          value: 'className'
        }
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