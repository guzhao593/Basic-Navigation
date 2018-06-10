<template>
  <div class="show-news-box">
    <header :style="{background: bgColor}">{{data.title}}</header>
    <ul style="list-style: 0 none;">
      <li
        v-for="(news, key) in data.data"
        :key="key"
      >
        <span 
          :style="{
            background: key < 3 ? bgColor : '#C0C1C3',
            borderColor: key < 3 ? bgColor : '#C0C1C3'
          }"
        >{{news.order}}</span>
        <a :href="news.href" :title="news.title" target="blank">{{news.title}}</a>
        <span>{{news.searches}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'BShowNews',
  props: {
    data: {
      type: Object
    },
    bgColor: String
  },
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
  .show-news-box{
    header{
      height: 30px;
      line-height: 30px;
      background: #1366CB;
      text-align: center;
      color: #fff;
      border-radius: 5px 5px 0 0;
    }
    li{
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      color: #333;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-family: Arial, 微软雅黑, "hiragino sans gb", simsun;
      border-bottom: 1px dotted #ccc;
      box-sizing: border-box;
      &:last-child{
        border-bottom: 0 none;
      }
      span:nth-child(1){
        margin: 8px 5px;
        width: 14px;
        text-align: center;
        line-height: 12px;
        font-family: simsun;
        font-size: 10px;
        color: #fff;
        box-sizing: border-box;
        background: #C0C1C3;
      }
      &:nth-child(1), &:nth-child(2), &:nth-child(3){
        span:nth-child(1){
          background: #1366CB;
        }
      }
      span:nth-child(3){
        margin-right: 10px;
      }
      a{
        flex: 1;
      }
    }
  }
</style>
