<template>
  <div>
    <div
      v-for="(item, key) of value"
      :key="key"
    >
      <el-submenu :index="item.route" v-if="item.children">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.className}}</span>
        </template>
          <b-menu-item v-model="item.children" class="inter-menu"></b-menu-item>
      </el-submenu>
      <el-menu-item :index="item.route" v-else>
        <i :class="item.icon"></i>
        <span slot="title">{{item.className}}</span>
      </el-menu-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BMenuItem',
  props: {
    value: Array
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .el-menu .inter-menu{
    border: 0 none;
    max-height: 300px;
    overflow-y: auto;
  }
</style>