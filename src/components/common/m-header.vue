<template>
  <div class="m-header">
    <h1>基&nbsp;&nbsp;本&nbsp;&nbsp;导&nbsp;&nbsp;航</h1>
    <m-search class="m-search"></m-search>
  </div>
</template>

<script>
import MSearch from './m-search.vue'
export default {
  name: 'MHeader',
  components: {
    MSearch
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .m-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    h1{
      height: 80px;
      line-height: 80px;
      color: #2cb314;
      font-size: 24px;
      font-weight: bold;
      flex: auto;
    }
    .m-search{
      flex: auto;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
  }
  
</style>