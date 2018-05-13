<template>
	<el-menu
	model="vertical"
	:default-active="$route.fullPath"
	>
		<draggable
			v-model="menuData"
			element="div"
			:options="{group: 'menuData'}"
  	>
			<menu-item 
				v-for="(item, key) in menuData"
				:key="key"
				:is-editor="isEditor" 
				:menuData="item"
				:parent="item" 
        @deleteChildren="deleteChildren"
				:level="0"
			></menu-item>
		</draggable>
		<transition>
			<div class="edit-bar" :style="{top: editTop}">
				<i class="el-icon-circle-plus-outline setting add" @click="handlerAdd" v-if="isEditor"></i>
				<i 
					class="setting edit" 
					:class="{'el-icon-setting': !isEditor, 'el-icon-circle-check-outline': isEditor}"
					@click="handlerEdit"
				></i>
			</div>
		</transition>
  </el-menu>
</template>

<script>
	import draggable from 'vuedraggable'
	import MenuItem from './menu-item.vue'
	import { getCurrentMenuAllSelfId } from 'util'
	import req from 'api/menu'
	export default {
	  name: 'MMenu',
	  components: {
	    MenuItem,
	    draggable
	  },
	  props: {
	    editTop: String
	  },
	  data () {
	    return {
	      isEditor: false
	    }
	  },
	  computed: {
	    menuData: {
	      get () {
	        return this.$store.state.menu.menuData
	      },
	      set (newVal) {
	        this.$store.commit('menu/GET_MENU', newVal)
	      }
	    }
	  },
	  created () {
	    this.$store.dispatch('menu/GET_MENU')
	  },
	  methods: {
	    handlerEdit () {
	      if (document.querySelector('.el-menu .el-input')) {
	        return this.$message({type: 'warning', message: '请保存正在编辑的数据！'})
	      }
	      this.isEditor = !this.isEditor
	    },
	    deleteChildren (menu) {
	      req('deleteMenu', {allselfId: getCurrentMenuAllSelfId(menu)})
	        .then(data => {
	          if (data.affectedRows) {
	            this.$message({type: 'success', message: '删除成功'})
	            this.$store.dispatch('menu/GET_MENU')
	          } else {
	            this.$message({type: 'error', message: '删除失败'})
	          }
	        })
	        .catch(error => console.log(error))
	    },
	    handlerAdd () {
	      this.menuData.push({
	        className: '',
	        orderNumber: this.menuData.length + 1,
	        parentId: '',
	        selfId: Date.now(),
	        route: '',
	        redirect: null
	      })
	    }
	  }
	}
</script>

<style lang="scss" scoped>
	@import 'style/var.scss';
	@import 'style/mixin.scss';
	.el-menu{
		border-right: none;
		position: relative;
		.edit-bar{
			transition: all .3s;
			position: absolute;
			left: 0;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			background-color: #ccc;
			opacity: 1;
			padding: 5px 5px 0 5px;
			border-bottom-right-radius: 8px;
			.setting{
				margin-bottom: 5px;
			}
			.add{
				color: $button-color;
			}
			.edit{
				color: #9d00ff;
			}
		}
	}
</style>