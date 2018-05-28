<template>
  <div class="b-table">
    <slot
      :data="table.data"
      :column="table.column"
    >
    </slot>
    <el-pagination
      v-if="showPageBar"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[8, 10, 20, 30]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'BTable',
    components: {},
    props: {
      table: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        showPageBar: this.table.showPageBar || true,
        pageSize: this.getPageInfo('pageSize') || 8,
        pageIndex: this.getPageInfo('pageIndex') || 1
      }
    },
    methods: {
      getPageInfo (key) {
        const { info } = this.table
        return info && info[key]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
