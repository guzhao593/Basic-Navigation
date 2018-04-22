<template>
  <el-container>
    <el-header style="height: 80px"></el-header>
    <el-container>
      <el-aside style="width: 20vw">
        <m-menu></m-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
        <!-- <web-show></web-show> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import MMenu from 'components/m-menu.vue'
  export default {
    name: 'home',
    data () {
      return {
      }
    },
    components: {
      MMenu
    }
  }
</script>

<style scoped lang="scss">
  .el-aside{
    min-width: 200px;
    max-width: 250px;
    height: calc(100vh - 80px);
    background: #d3dce6;
  }
  .el-header{
    height: 120px;
    background: #666;
  }
  .el-main{
    height: calc(100vh - 80px);
  }
</style>