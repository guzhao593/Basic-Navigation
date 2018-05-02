<template>
  <el-container>
    <el-header style="height: 80px">
      <m-header></m-header>
    </el-header>
    <el-container>
      <el-aside style="width: 10vw" @scroll.native="getScroll">
        <m-menu :edit-top="editTop"></m-menu>
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
        editTop: '0px'
      }
    },
    components: {
      MMenu,
      MHeader,
      MBreadcrumb
    },
    created () {
    },
    methods: {
      getScroll (event) {
        this.editTop = event.target.scrollTop + 'px'
      }
    }
  }
</script>

<style scoped lang="scss">
	@import 'style/var.scss';
  .el-aside{
    min-width: 100px;
    max-width: 200px;
    height: calc(100vh - 80px);
    background-color: #fff;
    border-right: 1px solid #e6e6e6;
    position: relative;
		.edit-bar{
			position: absolute;
			// top: 0;
			left: 0;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			background-color: $main-color;
			opacity: 0.8;
			padding: 5px 0 0;
      z-index: 999;
			.setting{
				margin-bottom: 5px;
			}
		}
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