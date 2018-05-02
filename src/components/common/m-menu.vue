<template>
	<el-menu
	model="vertical"
	:default-active="$route.fullPath"
	>
		<draggable
			v-model="menuData"
			element="div"
		>
			<el-menu-item
				v-for="(name, idx) in menuData"
				:key="idx"
				:index="'/' + name.className"
				style="padding-left: 28px"
			>
				<router-link :to="'/' + name.className" tag="div">
					{{name.className}}
				</router-link>
			</el-menu-item>
		</draggable>
		<transition>
			<div class="edit-bar" :style="{top: editTop}">
				<i class="el-icon-plus setting add" @click="handlerAdd()"></i>
				<i class="el-icon-setting setting edit" @click="handlerEdit()"></i>
			</div>
		</transition>
  </el-menu>
</template>

<script>
	// import req from 'api/web'
	import draggable from 'vuedraggable'
	export default {
	  name: 'MMenu',
	  components: {
	    draggable
	  },
	  props: {
	    editTop: String
	  },
	  data () {
	    return {
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
	  }
	}
</script>

<style lang="scss" scoped>
	@import 'style/var.scss';
	.el-menu{
		border-right: none;
		position: relative;
		&:hover .edit-bar{
			display: flex;
		}
		.edit-bar{
			transition: all .3s;
			position: absolute;
			left: 0;
			display: none;
			flex-direction: column;
			justify-content: space-between;
			background-color: #ccc;
			opacity: 1;
			padding: 5px 3px 0 5px;
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
	.el-menu-item{
		font-size: 12px;
		height: 45px;
		line-height: 45px;
	}
</style>