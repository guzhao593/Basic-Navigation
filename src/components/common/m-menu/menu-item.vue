<template>
    <el-menu-item
      :index="'/' + menuData.className"
      style="padding-left: 0"
    >
      <router-link 
        :to="getToLink()"
        tag="div"
        class="web-link"
        :style="{paddingLeft: (35 + level * 15) +'px'}"
        :class="{editor: isEditor}"
      >
        <span v-if="!isCurrentEdit || !isEditor">{{menuData.className}}</span>
        <el-input v-model="menuData.className" v-else></el-input>
        <div 
          v-if="isEditor" 
          class="icon-container" 
          :class="{
            'icon-edit-box': !isCurrentEdit, 
            'icon-current-edit': isCurrentEdit
          }"
        >
          <template v-if="!isCurrentEdit">
            <i class="el-icon-edit icon-edit icon" @click.prevent="editWeb"></i>
            <i class="el-icon-circle-plus-outline icon-add icon" @click.prevent="addWeb(menuData)"></i>
            <i class="el-icon-remove-outline icon-close icon" @click.prevent="deleteWeb"></i>
          </template>
          <template v-else>
            <i class="el-icon-circle-check icon-check icon" @click.prevent="saveEdit"></i>
            <i class="el-icon-circle-close icon-circle-close icon" @click.prevent="undoEdit"></i>
          </template>
        </div>
        <div v-if="!isEditor && menuData.children" class="icon-container icon-open-box">
          <i 
            class="icon-edit icon el-icon-arrow-down"
            :class="{
              'el-icon-arrow-down': !isOpen,
              'el-icon-arrow-up': isOpen
            }"
            @click.prevent="downWeb"
          ></i>
        </div>
      </router-link>
      <ul v-if="menuData.children" v-show="isOpen || isEditor">
        <menu-item
          v-for="(cel, key) in menuData.children" 
          :key="key"
          :menuData="cel"
          :is-editor="isEditor"
          :level="level + 1"
        ></menu-item>
      </ul>
    </el-menu-item>
</template>

<script>
  import req from 'api/web'
  import draggable from 'vuedraggable'
  import { cloneData } from 'util'
  export default {
    name: 'MenuItem',
    components: {
      draggable
    },
    props: {
      isEditor: Boolean,
      level: Number,
      menuData: Object
    },
    data () {
      return {
        isOpen: false,
        isCurrentEdit: false
      }
    },
    computed: {
      initMenuData () {
        return cloneData(this.menuData)
      }
    },
    methods: {
      getToLink () {
        return this.isEditor ? '' : '/' + this.getFullPah(this.menuData)
      },
      editWeb () {
        this.isCurrentEdit = true
      },
      saveEdit () {
        this.isCurrentEdit = false
      },
      undoEdit () {
        this.menuData.className = this.initMenuData.className
        this.isCurrentEdit = false
      },
      addWeb (item) {
        item.children ? item.children.push({
          className: `new${item.children.length + 1}`,
          id: `${item.children.length + 1}`,
          orderName: `${item.children.length + 1}`,
          fullPath: `${this.getFullPah(item) + '/'}new${item.children.length + 1}`
        }) : this.$set(item, 'children', [{
          className: `new1`,
          id: `1`,
          orderName: `1`,
          fullPath: `${this.getFullPah(item) + '/'}new1`
        }])
      },
      getFullPah (item) {
        return item.fullPath ? item.fullPath : item.className
      },
      downWeb () {
        this.isOpen = !this.isOpen
      },
      deleteWeb () {
        req('deleteWeb', {id: this.menuData.id})
          .then(data => {
            data === 'ok' && this.$emit('againFetch')
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
	@import 'style/var.scss';
	@import 'style/mixin.scss';
	.el-menu-item{
		font-size: 12px;
		height: 100%;
    line-height: 45px;
    padding: 0;
    & * {
     vertical-align: baseline; 
    }
	}
	.web-link{
    box-sizing: border-box;
		display: block;
		color: #337ab7;
		font-size: 12px;
		float: left;
		width: 100%;
		padding: 0;
		min-height: 45px;
		line-height: 45px;
		text-align: left;
		position: relative;
		@include text-ellipsis;
		&:hover{
			text-decoration: underline;
			color: #FF5E53;
			.icon-edit-box{
				right: 5px;
			}
		}
		.icon-container{
			transition: all 0.3s;
			position: absolute;
			top: 0;
			right: -35px;
			width: 55px;
			height: 45px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.icon{
				font-size: 16px;
			}
			.icon-edit{
				&:hover{
					color: #1417da;
				}
			}
			.icon-add{
				&:hover{
					color: #ca18bb;
				}
			}
			.icon-close{
				&:hover{
					color: #f00;
				}
      }
    }
    .icon-current-edit{
      right: -3px;
      width: 40px;
    }
    .icon-open-box{
      right: -25px;
    }
	}
	.editor{
		width: 100%;
		border-bottom: 0 none;
		padding-right: 40px;
		&:hover{
			color: #337ab7;
			background: #ddd;
			text-decoration: none;
		}
	}
	.web-add{
		font-size: 30px;
		color: #337ab7;
		text-align: center;
  }
  /deep/ .el-input__inner{
    height: 30px;
    line-height: 30px;
  }
</style>
