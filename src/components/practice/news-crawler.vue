<template>
  <grid-layout
    :layout="layout"
    :col-num="12"
    :row-height="37"
    :margin="[5, 5]"
  >
    <grid-item 
      v-for="(item, key) in layout"
      :key="key"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      @resized="resizedEvent"
      @moved="movedEvent"
      class="grid-item"
    >
      <b-show-news 
        v-if="newsData.length" 
        :data="newsData[key]"
        :bgColor="bgColor[key]"
      ></b-show-news>
    </grid-item>
  </grid-layout>
</template>

<script>
  import { GridLayout, GridItem } from 'vue-grid-layout'
  import BShowNews from 'components/common/b-show-news'
  import req from 'api/news-crawler'
  export default {
    name: 'NewsCrawler',
    components: {
      GridLayout,
      GridItem,
      BShowNews
    },
    data () {
      return {
        layout: [
          {'x': 0, 'y': 0, 'w': 4, 'h': 8, 'i': '0'},
          {'x': 4, 'y': 0, 'w': 4, 'h': 8, 'i': '1'},
          {'x': 8, 'y': 0, 'w': 4, 'h': 8, 'i': '2'},
          {'x': 0, 'y': 4, 'w': 4, 'h': 8, 'i': '3'},
          {'x': 4, 'y': 4, 'w': 4, 'h': 8, 'i': '4'},
          {'x': 8, 'y': 4, 'w': 4, 'h': 8, 'i': '5'}
        ],
        newsData: [],
        bgColor: ['#DB2162', '#1366CB', '#AE730D', '#ED4138', '#13cb19', '#a613cb']
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        this.fetch()
      },
      fetch (opt) {
        req('getNews').then(data => {
          this.newsData = data
        })
      },
      resizedEvent (i, x, y, h, w) {
        console.log(i, x, y, h, w, 'resizeEvent')
      },
      movedEvent (i, x, y) {
        console.log(i, x, y, 'movedEvent')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .vue-grid-layout{
    .grid-item{
      background-color: #fff;
      border-radius: 5px; 
      border: 1px solid #ccc;
    }
    /deep/ .vue-grid-placeholder{
      background-color: #fff;
      opacity: 0;
    }
  }
</style>