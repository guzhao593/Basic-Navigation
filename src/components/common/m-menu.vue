<template>
		<el-menu
		model="vertical"
		:default-active="$route.path"
  	>
			<draggable
				v-model="menuData"
				element="div"
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
				<el-menu-item :index="'ueditor'">
					<router-link to="/ueditor" tag="div">ueditor</router-link>
				</el-menu-item>
			</draggable>
  </el-menu>
</template>

<script>
	import req from 'api/web'
	import draggable from 'vuedraggable'
	export default {
		name: 'MMenu',
		components: {
			draggable
		},
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
	.el-menu{
		border-right: none;
	}
	.el-menu-item{
		font-size: 12px;
		height: 45px;
		line-height: 45px;
	}
</style>