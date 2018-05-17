<template>
  <div class="m-header">
    <h3>Basic Navigation</h3>
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
    h3{
      min-height: 60px;
      width: 260px;
      line-height: 60px;
      color: #fff;
      font-size: 24px;
      font-weight: normal;
      background: #F09B22;
      text-indent: .5em;
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