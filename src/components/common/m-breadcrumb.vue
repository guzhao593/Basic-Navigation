<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item
      v-for="(item, idx) of breadcrumbData"
      :key="idx"
      :to="getToLink(item, idx)"
    >
      {{item.path ? $route.path.replace('/', '') : item.name}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: 'MBreadcrumb',
    props: {

    },
    data () {
      return {
        breadcrumbData: this.$route.matched
      }
    },
    methods: {
      getToLink (item, idx) {
        if (!item.path) return item.redirect ? item.redirect : '/'
        
        if (idx === this.breadcrumbData.length - 1) return ''

        let path = item.path
        Object.keys(this.$route.params).forEach(param => {
            path = path.replace(`:${param}`, this.$route.params[param])
        })
        return path
      },
    }
  }
</script>

<style lang="scss" scoped>
  .el-breadcrumb{
    border-bottom: 1px solid #58bc58;
    line-height: 30px;
  }
</style>
