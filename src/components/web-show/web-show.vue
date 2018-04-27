<template>
  <div class="web-show">
    <i class="el-icon-setting setting" @click="handlerEdit()"></i>
    <draggable
      v-model="webData"
      element="div"
      :options="{
        disabled: (isEditor || isDraggable), // 设置是否可拖动
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
          @undoDraggable="undoDraggable"
        >
        </web-item>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
  import req from 'api/web'
  import draggable from 'vuedraggable'
  import WebItem from './web-item.vue'

  export default {
    name: 'WebShow',
    components: {
      draggable,
      WebItem
    },
    data () {
      return {
        webData: [],
        isEditor: true,
        isDraggable: false
      }
    },
    computed: {
      disabledDraggable () {
        console.log(this.isEditor, this.isDraggable)
        return (this.isEditor && this.isDraggable)
      }
    },
    watch: {
      isEditor () {
        console.log(this.isEditor, this.isDraggable)
      },
      isDraggable () {
        console.log(this.isEditor, this.isDraggable)
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
      handlerEdit () {
        this.isEditor = !this.isEditor
      },
      undoDraggable (bool) {
        this.isDraggable = bool
      },
      moveEnd (item) {
        console.log('End', item)
      },
      moveStart (item) {
        console.log('move', item)
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
      right: 10px;
      font-size: 18px;
      color: #FF5E53;
      transition: 0.5s all;
      &:hover{
        color: rgb(86, 29, 151);
        cursor: pointer;
        transform: rotate(180deg) scale(1.2);
      }
    }
  }
  
</style>