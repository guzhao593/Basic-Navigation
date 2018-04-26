<template>
  <div class="web-show">
    <i class="el-icon-setting setting" @click="handlerEdit()"></i>
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
        <a
          v-for="(web, index) of webData"
          :key="index"
          :href="getUrl(web.url)" 
          target="blank"
          class="web-link"
        >
          {{web.name}}
        </a>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
  import req from 'api/web'
  import { BASE_URL } from 'config/api'
  import draggable from 'vuedraggable'

  export default {
    name: 'WebShow',
    components: {
      draggable
    },
    data () {
      return {
        webData: [],
        isEditor: true
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
      getUrl (url) {
        return url.includes('http') ? url : `${BASE_URL}\\${url}`
      },
      handlerEdit () {
        this.isEditor = !this.isEditor
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
  @import 'style/mixin.scss';
  .web-link{
    display: block;
    color: #337ab7;
    font-size: 12px;
    float: left;
    width: 160px;
    padding: 0 10px;
    min-height: 45px;
    line-height: 45px;
    text-align: left;
    @include text-ellipsis;
    &:hover{
      text-decoration: underline;
      color: #FF5E53;
      // background-color: #eff;
    }
  }
  .choose{
    background-color: #ccc;
  }
  .ghost{
    Opacity: 0;
  }
  .drag{
    Opacity: 0.5;
    background-color: #ccc;
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