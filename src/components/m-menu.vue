<template>
  <el-menu
	model="vertical"
  >
	<el-menu-item
	  v-for="(name, idx) of menuData"
	  :key="idx"
	  index="idx"
	>
	  <router-link to="/">
		{{name.name}}
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
			class: 'javascript'
		}).then(data => {
			console.log(data, 'data')
		}).catch(err => {
			console.log(err, 'err')
		})
        this.menuData =  Array(20).fill({name: '首页'})
      }
    } 
</script>