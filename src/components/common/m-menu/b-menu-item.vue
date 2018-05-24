<template>
  <div>
    <div
      v-for="(item, key) of value"
      :key="key"
    >
      <el-submenu 
        v-if="item.children" 
        :index="item.route"
        @mouseover.native="mouseoverMenu(item)" 
        @mouseout.native="mouseoutMenu(item)"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.className}}</span>
          <template v-if="item.route === '/website' && (showEditIcon || showPopover || isEditMenuStatus)">
            <el-popover
              v-model="showPopover"
              placement="bottom-end"
              width="200"
              title="添加网址分类"
            >
              <el-form :model="websiteClass" :rules="rules" ref="websiteForm">
                <el-form-item prop="className" :style="{'margin-bottom': valid ? '12px' : '22px' }">
                  <el-input v-model="websiteClass.className" size="small"></el-input>
                </el-form-item>
              </el-form>
              <el-row style="text-align: right; margin: 0px;">
                <el-button size="small" @click="cancel">取消</el-button>
                <el-button size="small" type="primary" @click="confirm(item)">确定</el-button>
              </el-row>
              <i 
                slot="reference"
                class="icon el-icon-circle-plus-outline"
                @click.stop="addMenu"
              ></i>
            </el-popover>
            <i 
              class="icon el-icon-setting"
              @click.stop="editMenu"
            ></i>
          </template>
        </template>
        <b-menu-item 
          v-model="item.children" 
          class="inter-menu" 
          :editStatus="item.route === '/website' ? isEditMenuStatus : false"
        ></b-menu-item>
      </el-submenu>
      <el-menu-item :index="item.route" v-else>
        <i :class="item.icon"></i>
        <template>
          <span slot="title" v-if="editCurrentStatus && editCurrentMenuClassName === item.selfId">
            <el-input v-model="item.className" size="small" style="width: 63%"></el-input>
          </span>
          <span slot="title" v-else>{{item.className}}</span>
        </template>
        <template v-if="editStatus">
          <i 
            v-if="!editCurrentStatus || editCurrentMenuClassName !== item.selfId"
            class="icon el-icon-edit"
            @click.stop="editCurrentMenu(item)"
          ></i>
          <template v-if="editCurrentStatus && editCurrentMenuClassName === item.selfId">
            <i class="icon el-icon-circle-check-outline" @click.stop="saveEdit(item)"></i>
            <i class="icon el-icon-circle-close-outline" @click.stop="undoEdit(item)"></i>
          </template>
          <i class="icon el-icon-delete" @click.stop="deleteCurrentMenu(item)"></i>
        </template>
      </el-menu-item>
    </div>
  </div>
</template>

<script>
import req from 'api/menu'
export default {
  name: 'BMenuItem',
  props: {
    value: Array,
    editStatus: Boolean
  },
  data () {
    return {
      websiteClass: {
        className: ''
      },
      rules: {
        className: [
          {required: true, message: '分类名称不能为空'}
        ]
      },
      showPopover: false,
      valid: true,
      activeStatus: false,
      editCurrentStatus: false,
      editCurrentMenuClassName: '',
      showEditIcon: false
    }
  },
  computed: {
    isEditMenuStatus () {
      return this.$store.state.menu.isEditMenuStatus
    }
  },
  methods: {
    editMenu () {
      this.$store.commit('menu/CHANGE_EDIT_STATUS')
    },
    addMenu () {
      // 清除校验
      this.$refs.websiteForm[0].clearValidate()
    },
    confirm (item) {
      this.$refs.websiteForm[0].validate(valid => {
        this.valid = valid
        if (valid) {
          this.websiteClass = Object.assign({}, this.websiteClass, {
            orderNumber: item.children.length,
            parentId: item.selfId,
            selfId: Date.now(),
            route: `${item.route}/${this.websiteClass.className}`,
            icon: 'el-icon-star-on',
            redirect: null
          })
          req('addMenu', this.websiteClass)
            .then(res => {
              this.handlerAfterRequest(res, '新增')
            })
            .finally(() => {
              this.showPopover = false
              this.websiteClass.className = ''
            })
        }
      })
    },
    cancel () {
      this.websiteClass.className = ''
      this.valid = true
      this.showPopover = false
    },
    editCurrentMenu (item) {
      this.editCurrentMenuClassName = item.selfId
      this.originMenuClassName = item.className
      this.editCurrentStatus = true
    },
    saveEdit (item) {
      if (item.className === '') {
        this.$message.warning('名称不能为空')
        return
      }

      if (item.className === this.originMenuClassName) return (this.editCurrentStatus = false)

      item.route = `${item.route.slice(0, item.route.lastIndexOf('/'))}/${item.className}`
      req('updateMenu', item)
        .then(res => {
          this.handlerAfterRequest(res, '修改')
        })
      this.editCurrentStatus = false
    },
    undoEdit (item) {
      item.className = this.originMenuClassName
      this.editCurrentStatus = false
    },
    deleteCurrentMenu (item) {
      req('deleteMenu', item)
        .then(res => {
          this.handlerAfterRequest(res, '删除')
        })
    },
    handlerAfterRequest (res, status) {
      if (res.affectedRows) {
        this.$message({type: 'success', message: `${status}成功`})
        this.$store.dispatch('menu/GET_MENU')
      } else {
        this.$message({type: 'error', message: `${status}失败`})
      }
    },
    mouseoverMenu (item) {
      if (item.route === '/website') {
        this.showEditIcon = true
      }
    },
    mouseoutMenu (item) {
      if (item.route === '/website') {
        this.showEditIcon = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-menu .inter-menu{
    border: 0 none;
    max-height: 300px;
    overflow-y: auto;
  }
  /deep/ .el-submenu__title{
    transition: all .5s;
    .icon{
      display: block;
      top: 50%;
      margin-top: -8px;
      font-size: 16px;
      position: absolute;
    }
    .el-icon-setting{
      right: 40px;
      &:hover{
        color: rgb(65, 192, 65);
      }
    }
    .el-icon-circle-plus-outline{
      right: 60px;
      &:hover{
        color: yellow;
      }
    }
  }
  .el-menu-item{
    .icon{
      display: block;
      top: 50%;
      margin-top: -8px;
      font-size: 16px;
      position: absolute;
    }
    .el-icon-edit{
      right: 35px;
    }
    .el-icon-circle-close-outline{
      right: 35px;
    }
    .el-icon-circle-check-outline{
      right: 55px;
    }
    .el-icon-delete{
      right: 15px;
    }
  }
</style>