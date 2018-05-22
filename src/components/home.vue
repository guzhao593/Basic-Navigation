<template>
  <el-container>
    <el-header style="height: 60px">
      <m-header @collapseToggle="collapseToggle"></m-header>
    </el-header>
    <el-container>
      <el-aside  :style="{width: collapseWidth}" @scroll.native="getScroll">
        <b-menu :edit-top="editTop" :isCollapse="isCollapse"></b-menu>
      </el-aside>
      <el-main>
        <m-breadcrumb></m-breadcrumb>
        <router-view :key="$route.fullPath"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import BMenu from 'components/common/m-menu/b-menu.vue'
  import MHeader from 'components/common/m-header.vue'
  import MBreadcrumb from 'components/common/m-breadcrumb.vue'
  export default {
    name: 'home',
    data () {
      return {
        editTop: '0px',
        isCollapse: false
      }
    },
    components: {
      BMenu,
      MHeader,
      MBreadcrumb
    },
    created () {
    },
    computed: {
      collapseWidth () {
        return this.isCollapse ? '0px' : '260px'
      }
    },
    methods: {
      getScroll (event) {
        this.editTop = event.target.scrollTop + 'px'
      },
      collapseToggle () {
        this.isCollapse = !this.isCollapse
      }
    }
  }
</script>

<style scoped lang="scss">
	@import 'style/var.scss';
  .el-aside{
    max-width: 260px;
    height: calc(100vh - 60px);
    background-color: $main-color;
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
    height: 50px;
    background: #323232;
    padding: 0;
  }
  .el-main{
    height: calc(100vh - 60px);
    padding: 0px;
    background: #EDEDED;
  }
</style>