<template>
  <div class="b-header">
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
    <b-search class="b-search"></b-search>
  </div>
</template>

<script>
import BSearch from './b-search.vue'
export default {
  name: 'BHeader',
  components: {
    BSearch
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
  .b-header{
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
    .b-search{
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
        border-radius: 3px;
        &:hover{
          color: $button-color;
        }
      }
    }
  }
  
</style>