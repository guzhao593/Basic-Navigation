<template>
  <div class="b-table">
    <slot
      :data="table.data"
      :column="table.column"
      :height="362"
    >
    </slot>
    <div class="pagination">
      <el-pagination
        v-if="showPageBar"
        :page-sizes="[8, 10, 20, 30]"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
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
        pageIndex: this.getPageInfo('pageIndex') || 1,
        total: this.getPageInfo('total') || 0
      }
    },
    watch: {
      'table.info' (info) {
        this.total = info.total
      }
    },
    methods: {
      getPageInfo (key) {
        const { info } = this.table
        return info && info[key]
      },
      handleSizeChange (pageSize) {
        this.pageSize = pageSize
        this.$emit('handleSizeChange', {pageSize, pageIndex: this.pageIndex})
      },
      handleCurrentChange (pageIndex) {
        this.pageIndex = pageIndex
        this.$emit('handleSizeChange', {pageSize: this.pageSize, pageIndex})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .b-table{
    .el-table{
      border-radius: 5px;
      border: 1px solid #dedede;
      /deep/ thead tr th{
        padding: 8px 0;
        background-color: #dcdcdc;
        border-color: #cecece;
      }
      /deep/ tbody tr td{
        padding: 8px 0;
      }
    }
    .pagination{
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
          /* 设置滚动条的样式 */
    ::-webkit-scrollbar {
        width: 5px;
        height: 5px
    }

    ::-webkit-scrollbar-button {
        display: none
    }

    ::-webkit-scrollbar-track {
        border-radius: 5px;
        background-color: transparent
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: #ccc;
      &:hover {
        background-color: #ccc;
      }
    }
  }

</style>
