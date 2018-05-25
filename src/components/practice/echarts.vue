<template>
  <div id="echarts"  style="width: 600px;height:400px;"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'echarts',
  data () {
    return {
      echarts: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.echarts = echarts.init(document.getElementById('echarts'))
      this.echarts.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    }
  }
}
</script>
