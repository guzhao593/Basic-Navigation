<template>
  <el-menu
	model="vertical"
  >
	<el-menu-item
	  v-for="(name, idx) of menuData"
	  :key="idx"
	  index="idx"
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
			req('web', {
				menu: 'all'
			}).then(data => {
				this.menuData = data
				console.log(data, 'data')
			}).catch(err => {
				console.log(err, 'err')
			})
		}
  } 
</script>