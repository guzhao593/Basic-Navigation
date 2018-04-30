<template>
  <el-container>
    <el-header style="height: 80px">
      <m-header></m-header>
    </el-header>
    <el-container>
      <el-aside style="width: 10vw">
        <m-menu></m-menu>
      </el-aside>
      <el-main>
        <m-breadcrumb></m-breadcrumb>
        <router-view :key="$route.fullPath"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import MMenu from 'components/common/m-menu.vue'
  import MHeader from 'components/common/m-header.vue'
  import MBreadcrumb from 'components/common/m-breadcrumb.vue'
  export default {
    name: 'home',
    data () {
      return {
      }
    },
    components: {
      MMenu,
      MHeader,
      MBreadcrumb
    },
    created () {
      console.log(this.$route)
    }
  }
</script>

<style scoped lang="scss">
  .el-aside{
    min-width: 100px;
    max-width: 200px;
    height: calc(100vh - 80px);
    background-color: #fff;
    border-right: 1px solid #e6e6e6;
  }
  .el-header{
    height: 120px;
    background: #000;
  }
  .el-main{
    height: calc(100vh - 80px);
    padding: 5px 10px;
  }
</style>