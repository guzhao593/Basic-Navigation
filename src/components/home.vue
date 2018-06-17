<template>
  <el-container>
    <el-header style="height: 60px">
      <b-header @collapseToggle="collapseToggle"></b-header>
    </el-header>
    <el-container>
      <el-aside  :style="{width: collapseWidth}" @scroll.native="getScroll">
        <b-menu :edit-top="editTop"></b-menu>
      </el-aside>
      <el-main>
        <b-breadcrumb></b-breadcrumb>
        <div class="show-box">
          <router-view :key="$route.fullPath"></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import BMenu from 'components/common/b-menu/b-menu.vue'
  import BHeader from 'components/common/b-header.vue'
  import BBreadcrumb from 'components/common/b-breadcrumb.vue'
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
      BHeader,
      BBreadcrumb
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
    transition: all .5s;
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
    .show-box{
      margin: 0px 20px;
      height: calc(100vh - 140px);
      overflow: auto;
    }
  }
</style>