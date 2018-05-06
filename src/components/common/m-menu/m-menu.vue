<template>
	<el-menu
	model="vertical"
	:default-active="$route.fullPath"
	>
		<draggable
			v-model="menuData"
			element="div"
  	>
			<menu-item 
				v-for="(item, key) in menuData"
				:key="key"
				:is-editor="isEditor" 
				:menuData="item" 
				:level="0"
			></menu-item>
		</draggable>
		<transition>
			<div class="edit-bar" :style="{top: editTop}">
				<i class="el-icon-setting setting edit" @click="handlerEdit()"></i>
			</div>
		</transition>
  </el-menu>
</template>

<script>
	import draggable from 'vuedraggable'
	import MenuItem from './menu-item.vue'
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
	      this.isEditor = !this.isEditor
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
	// .el-menu-item{
	// 	font-size: 12px;
	// 	height: 45px;
	// 	line-height: 45px;
	// }
	// .web-link{
	// 	display: block;
	// 	color: #337ab7;
	// 	font-size: 12px;
	// 	float: left;
	// 	width: 100%;
	// 	// margin: 5px 5px;
	// 	padding: 0;
	// 	min-height: 45px;
	// 	line-height: 45px;
	// 	text-align: left;
	// 	position: relative;
	// 	@include text-ellipsis;
	// 	&:hover{
	// 		text-decoration: underline;
	// 		color: #FF5E53;
	// 		.icon-container{
	// 			right: 5px;
	// 		}
	// 	}
	// 	.icon-container{
	// 		transition: all 0.3s;
	// 		position: absolute;
	// 		top: 0;
	// 		right: -35px;
	// 		width: 55px;
	// 		height: 45px;
	// 		display: flex;
	// 		flex-direction: row;
	// 		justify-content: space-between;
	// 		align-items: center;
	// 		.icon{
	// 			font-size: 16px;
	// 		}
	// 		.icon-edit{
	// 			&:hover{
	// 				color: #1417da;
	// 			}
	// 		}
	// 		.icon-add{
	// 			&:hover{
	// 				color: #ca18bb;
	// 			}
	// 		}
	// 		.icon-close{
	// 			&:hover{
	// 				color: #f00;
	// 			}
	// 		}
	// 	}
	// }
	// .editor{
	// 	// background-color: #eee;
	// 	width: 100%;
	// 	// border:1px dotted #ccc;
	// 	border-bottom: 0 none;
	// 	padding-right: 40px;
	// 	&:hover{
	// 		color: #337ab7;
	// 		background: #ddd;
	// 		text-decoration: none;
	// 	}
	// }
	// .web-add{
	// 	font-size: 30px;
	// 	color: #337ab7;
	// 	text-align: center;
	// }
</style>