<template>
  <el-menu
    default-active="/website/javascript"
    background-color="#323232"
    text-color="#fff"
    active-text-color="#ffd04b"
    unique-opened
    router
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
    data () {
      return {}
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
    }
  }
</script>

<style lang="scss" scoped>
  @import 'style/var.scss';
  .el-menu{
    border: 0 none;
  }
</style>