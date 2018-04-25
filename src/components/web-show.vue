<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(item, idx) of breadcrumbData"
        :key="idx"
        :to="getToLink(item, idx)"
      >
      {{item.path ? $route.path.replace('/', '') : item.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <draggable
      v-model="webData"
      element="div"
      :options="{
        disabled: false, // 设置是否可拖动
        chosenClass: 'choose', // 选择元素的class类名
        ghostClass: 'ghost', // 占位元素的class类名
        animation: 150, // 动画效果
        dragClass: 'drag' // 拖动元素的class类名
      }"
      @start="moveStart"
      @end="moveEnd"
      @move="move"
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
        breadcrumbData: []
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.breadcrumbData = to.matched
        vm.fetch(to.params)
      })
    },
    beforeRouteUpdate (to, from, next) {
      this.breadcrumbData = to.matched
      this.fetch(to.params)
      next()
    },
    methods: {
      fetch ({className}) {
        req('web',{class: className}).then(data => {
          this.webData = data
        })
      },
      getUrl (url) {
        return url.includes('http') ? url : `${BASE_URL}\\${url}`
      },
      getToLink (item, idx) {
        if (!item.path) return item.redirect ? item.redirect : '/'
        
        if (idx === this.breadcrumbData.length - 1) return ''

        let path = item.path
        Object.keys(this.$route.params).forEach(param => {
            path = path.replace(`:${param}`, this.$route.params[param])
        })
        return path
      },
      moveStart (item) {
        // console.log('start', item)
      },
      moveEnd (item) {
        console.log('End', item)
      },
      move (item) {
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
</style>