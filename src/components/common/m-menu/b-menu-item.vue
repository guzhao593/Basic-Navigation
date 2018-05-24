<template>
  <el-menu-item :index="item.route">
    <i :class="item.icon"></i>
    <template>
      <span slot="title" v-if="editCurrentStatus">
        <el-input v-model="item.className" size="small" style="width: 63%"></el-input>
      </span>
      <span slot="title" v-else>{{item.className}}</span>
    </template>
    <template v-if="editStatus">
      <i 
        v-if="!editCurrentStatus"
        class="icon el-icon-edit"
        @click.stop="editCurrentMenu(item)"
      ></i>
      <template v-if="editCurrentStatus">
        <i class="icon el-icon-circle-check-outline" @click.stop="saveEdit(item)"></i>
        <i class="icon el-icon-circle-close-outline" @click.stop="undoEdit(item)"></i>
      </template>
      <el-popover
        v-model="showPopover"
        placement="right"
      >
        <div style="text-align: right; margin: 0">
          <span>确认删除吗？</span>
          <el-button size="mini" type="text" @click="showPopover = false">取消</el-button>
          <el-button type="primary" size="mini" @click="deleteCurrentMenu(item)">确定</el-button>
        </div>
        <i slot="reference" class="icon el-icon-delete" @click.stop="showPopover = true"></i>
      </el-popover>
    </template>
  </el-menu-item>
</template>

<script>
import req from 'api/menu'
export default {
  name: 'BMenuItem',
  props: {
    item: Object,
    editStatus: Boolean
  },
  data () {
    return {
      editCurrentStatus: false,
      showPopover: false
    }
  },
  methods: {
    editCurrentMenu (item) {
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
    }
  }
}
</script>

<style lang="scss" scoped>
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
