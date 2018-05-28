<template>
  <el-breadcrumb  separator="/">
    <el-breadcrumb-item
      v-for="(item, idx) of breadcrumbData"
      :key="idx"
      :to="getToLink(item, idx)"
    >
      {{item.name === 'web' ? $route.params.className : item.name}}
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
      }
    },
    computed: {
      breadcrumbData () {
        return this.$route.matched
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-breadcrumb{
    padding: 12px 10px 12px 20px;
    margin-bottom: 20px;
    list-style: none;
    border-radius: 0;
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
    background: #fff;
    line-height: 20px;
    font-size: 12px;
    /deep/ .el-breadcrumb__inner.is-link{
      font-weight: normal;
      color: #337ab7;
      &:hover{
        text-decoration: underline;
        color: #23527c;
      }
    }
  }
</style>
