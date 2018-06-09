<template>
  <grid-layout
    :layout="layout"
    :col-num="12"
    :row-height="30"
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
        {{item.i}}
    </grid-item>
  </grid-layout>
</template>

<script>
  import { GridLayout, GridItem } from 'vue-grid-layout'
  export default {
    name: 'NewsCrawler',
    components: {
      GridLayout,
      GridItem
    },
    data () {
      return {
        layout: [
          {'x': 0, 'y': 0, 'w': 4, 'h': 6, 'i': '0'},
          {'x': 4, 'y': 0, 'w': 4, 'h': 6, 'i': '1'},
          {'x': 8, 'y': 0, 'w': 4, 'h': 6, 'i': '2'},
          {'x': 0, 'y': 4, 'w': 4, 'h': 6, 'i': '3'},
          {'x': 4, 'y': 4, 'w': 4, 'h': 6, 'i': '4'},
          {'x': 8, 'y': 4, 'w': 4, 'h': 6, 'i': '5'}
        ]
      }
    },
    methods: {
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
    }
    /deep/ .vue-grid-placeholder{
      background-color: #fff;
      opacity: 0;
    }
  }
</style>