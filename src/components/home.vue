<template>
  <el-container>
    <el-header style="height: 80px"></el-header>
    <el-container>
      <el-aside style="width: 10vw">
        <m-menu></m-menu>
      </el-aside>
      <el-main>
        <m-breadcrumb></m-breadcrumb>
        <router-view></router-view>
        <!-- <web-show></web-show> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import MMenu from 'components/common/m-menu.vue'
  import MBreadcrumb from 'components/common/m-breadcrumb.vue'
  import { clone, cloneData, maxLetterNumber } from 'util/index.js'
  export default {
    name: 'home',
    data () {
      return {
      }
    },
    components: {
      MMenu,
      MBreadcrumb
    },
    created () {
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
    background: #666;
  }
  .el-main{
    height: calc(100vh - 80px);
    padding: 5px 10px;
  }
</style>