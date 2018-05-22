<template>
  <div class="m-header">
    <h3>Basic Navigation</h3>
    <div class="collapse-toggle">
      <i 
        class="icon el-icon-caret-left"
        :class="{
          'el-icon-caret-left': isCollapse,
          'el-icon-caret-right': !isCollapse
        }" 
        @click="collapseToggle"
      ></i>
    </div>
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
    return {
      isCollapse: false
    }
  },
  methods: {
    collapseToggle () {
      this.isCollapse = !this.isCollapse
      this.$emit('collapseToggle')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'style/var.scss';
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
    .collapse-toggle{
      text-align: center;
      .icon{
        line-height: 60px;
        font-size: 45px;
        color: #868686;
        &:hover{
          color: $button-color;
        }
      }
    }
  }
  
</style>