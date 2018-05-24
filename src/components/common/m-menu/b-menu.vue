<template>
  <el-menu
    :default-active="$route.fullPath"
    :collapse="isCollapse"
    background-color="#323232"
    text-color="#fff"
    active-text-color="#ffd04b"
    unique-opened
    :router="!$store.state.menu.isEditMenuStatus"
  >
    <b-menu-item v-model="menuData"></b-menu-item>
  </el-menu>
</template>

<script>
  import BMenuItem from './b-menu-item.vue'
  export default {
    name: 'BMenu',
    components: {
      BMenuItem
    },
    props: {
      isCollapse: Boolean
    },
    data () {
      return {
        isEditStatus: true
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
    border: 0 none;
  }
</style>