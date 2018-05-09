<template>
    <el-menu-item
      :index="'/' + menuData.className"
      style="padding-left: 0"
    >
      <router-link 
        :to="getToLink()"
        tag="div"
        @click.native="downWeb"
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
            'icon-current-edit': isCurrentEdit,
            'icon-leaf': level > 1
          }"
        >
          <template v-if="!isCurrentEdit">
            <i class="el-icon-edit icon-edit icon" @click.prevent="editWeb"></i>
            <i v-if="level <= 1" class="el-icon-circle-plus-outline icon-add icon" @click.prevent="addWeb(menuData)"></i>
            <i class="el-icon-remove-outline icon-close icon" @click.prevent="deleteWeb(menuData)"></i>
          </template>
          <template v-else>
            <i class="el-icon-circle-check-outline icon-check icon" @click.prevent="saveEdit"></i>
            <i class="el-icon-circle-close-outline icon-circle-close icon" @click.prevent="undoEdit"></i>
          </template>
        </div>
        <div v-if="!isEditor && menuData.children" class="icon-container icon-open-box">
          <i 
            class="icon-edit icon"
            :class="{
              'el-icon-arrow-down': !isOpen && menuData.children && menuData.children.length > 0,
              'el-icon-arrow-up': isOpen && menuData.children && menuData.children.length > 0
            }"
            @click.native="downWeb"
          ></i>
        </div>
      </router-link>
      <ul v-if="menuData.children" v-show="isOpen || isEditor">
        <draggable
          v-model="menuData.children"
			    :options="{group: 'menuData'}"
          element="div"
        >
          <menu-item
            v-for="(cel, key) in menuData.children" 
            :key="key"
            :menuData="cel"
            :is-editor="isEditor"
            :level="level + 1"
            @deleteChildren="deleteChildren"
          ></menu-item>
        </draggable>
      </ul>
    </el-menu-item>
</template>

<script>
  // import req from 'api/web'
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
        isCurrentEdit: false,
        initMenuData: cloneData(this.menuData)
      }
    },
    methods: {
      getToLink () {
        return (this.isEditor || (this.menuData.children && this.menuData.children.length)) ? '' : '/' + this.getFullPah(this.menuData)
      },
      editWeb () {
        this.isCurrentEdit = true
      },
      saveEdit () {
        this.initMenuData.className = this.menuData.className
        this.isCurrentEdit = false
      },
      undoEdit () {
        this.menuData.className = this.initMenuData.className
        this.isCurrentEdit = false
      },
      addWeb (item) {
        if (this.level >= 2) return this.$message({type: 'warning', message: '菜单只能嵌套三层！'})
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
      deleteChildren (child) {
        this.menuData.children.splice(this.menuData.children.findIndex((item) => item.className === child.className), 1)
      },
      deleteWeb (item) {
        if (item.children && item.children.length) {
          this.$confirm('该菜单包含子菜单,确认要一起删除！')
            .then(() => {
              this.$emit('deleteChildren', item)
            })
            .catch(() => false)
        } else {
          this.$emit('deleteChildren', item)
        }
        // req('deleteWeb', {id: this.menuData.id})
        //   .then(data => {
        //     data === 'ok' && this.$emit('againFetch')
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })
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
    padding-right: 60px;
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
      .icon-leaf{
        width: 40px;
        right: -3px;
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
      .icon-check{
        &:hover{
          color: $main-color;
        }
      }
      .icon-circle-close{
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
		padding-right: 60px;
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
  .el-input /deep/ .el-input__inner{
    height: 30px;
    line-height: 30px;
  }
</style>
