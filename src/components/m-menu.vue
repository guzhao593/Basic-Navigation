<template>
  <el-menu
		model="vertical"
		default-active="0"
		
  >
		<el-menu-item
			v-for="(name, idx) in menuData"
			:key="idx"
			:index="idx + ''"
		>
			<router-link :to="'/' + name.className" tag="div">
				{{name.className}}
			</router-link>
		</el-menu-item>
  </el-menu>
</template>

<script>
	import req from 'api/web'
	export default {
	  name: 'MMenu',
    data () {
			return {
				menuData: []
			}
    },
    created () {
			req('menu', {menu: 'all'})
			.then(data => {
				this.menuData = data
			})
			.catch(err => {
				console.log(err, 'err')
			})
		}
  } 
</script>

<style lang="scss" scoped>
	.el-menu-item{
		font-size: 12px;
		height: 45px;
		line-height: 45px;
		// color: #333;
		&:hover{
			// background-color: #FF5E53;
		}
	}
</style>