<template>
  <div class="box">
    <div id="all-class"></div>
    <div id="one-class"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import req from 'api/web'
export default {
  name: 'echarts',
  data () {
    return {
      allClass: null,
      oneClass: null,
      webData: [],
      select: 'vue',
      selectIndex: 0
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      this.webData = await req('getWebsite').then(data => {
        return data.reduce((pre, cur, key) => {
          const index = pre.findIndex(item => item.name === cur.class)
          index > -1 ? pre[index].value++ : pre.push({name: cur.class, value: 1})
          return pre
        }, [])
      })
      this.setAllClass(this.webData)
      this.setOneClass(this.select)
    },
    setAllClass (webData) {
      webData[this.selectIndex].selected = true
      this.allClass = echarts.init(document.getElementById('all-class'))
      this.allClass.setOption({
        title: {
          text: '收藏网址'
        },
        series: [{
          selectedMode: 'single',
          name: '网址分类',
          type: 'pie',
          radius: '70%',
          data: webData
        }]
      })
      this.allClass.on('click', (params) => {
        this.allClass.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: this.selectIndex
        })
        this.allClass.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: params.dataIndex
        })
        this.selectIndex = params.dataIndex
        this.setOneClass(params.name, params.color)
      })
    },
    setOneClass (select, color = '#c23531') {
      this.oneClass = echarts.init(document.getElementById('one-class'))
      this.oneClass.setOption({
        title: {
          text: select
        },
        legend: {
          data: ['网址数量']
        },
        xAxis: {
          data: [select]
        },
        yAxis: {},
        series: [{
          name: select,
          type: 'bar',
          data: [this.webData.filter(item => item.name === select)[0].value]
        }],
        color: [color]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .box{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    #all-class{
      width: 600px;
      height: 450px;
    }
    #one-class{
      flex: 1;
      height: 450px;
    }
  }
</style>
