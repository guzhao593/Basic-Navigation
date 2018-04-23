<template>
  <el-container>
    <el-header style="height: 80px"></el-header>
    <el-container>
      <el-aside style="width: 10vw">
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
  import { clone, cloneData } from 'util/index.js'
  export default {
    name: 'home',
    data () {
      return {
      }
    },
    components: {
      MMenu
    },
    created () {
      const obj = [111]
      const value = clone(obj)
      console.log('value', value)
      const newValue = cloneData(obj)
      console.log('newvalue', newValue)      
    }
  }
</script>

<style scoped lang="scss">
  .el-aside{
    min-width: 100px;
    max-width: 200px;
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