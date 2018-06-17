<template>
  <div class="b-table">
    <nav class="nav">
      <div class="nav-left">
        <el-button
          v-for="(tool, key) in toolbar"
          :key="key"
          :value="tool.text"
          :type="tool.type"
          @click.stop.native="toolbarClick(tool)"
        >
          {{tool.text}}
        </el-button>
      </div>
      <div class="nav-right">
        <slot name="rightToolbar"></slot>
        <slot name="search"></slot>
      </div>
    </nav>
    <slot
      :data="table.data"
      :column="table.column"
      :operator="table.setting.operator"
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
    <export
      v-if="exportDialogVisible"
      v-model="exportDialogVisible"
      :data="table.data"
      :select="selectData"
      :column="table.column"
    ></export>
  </div>
</template>

<script>
  import Export from './export'
  export default {
    name: 'BTable',
    components: {
      Export
    },
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
        total: this.getPageInfo('total') || 0,
        exportDialogVisible: false,
        selectData: []
      }
    },
    computed: {
      toolbar () {
        return this.table.setting.toolbar.concat(this.exportSetting)
      },
      exportSetting () {
        return this.settingMap('export')
      }
    },
    watch: {
      'table.info' (info) {
        this.total = info.total
      }
    },
    mounted () {
      this.bindElTable()
    },
    methods: {
      bindElTable () {
        this.elTable = this.$children.find(
          ({ $options = {} }) => $options._componentTag === 'el-table'
        ) || {}
        this.bindElTableRowClick()
      },
      bindElTableRowClick () {
        this.elTable.$on('row-click', this.toggleRowSelection)
      },
      toggleRowSelection (row, event, column) {
        this.elTable.toggleRowSelection(row)
      },
      getPageInfo (key) {
        const { info } = this.table
        return info && +info[key]
      },
      handleSizeChange (pageSize) {
        this.pageSize = pageSize
        this.$emit('handleSizeChange', {pageSize, pageIndex: this.pageIndex})
      },
      handleCurrentChange (pageIndex) {
        this.pageIndex = pageIndex
        this.$emit('handleSizeChange', {pageSize: this.pageSize, pageIndex})
      },
      toolbarClick ({func}) {
        func && func(this)
      },
      settingMap (type) {
        const settingType = this.table.setting[type]
        if (settingType && Object.keys(settingType).length) {
          return [{
            type: settingType.type,
            text: settingType.text,
            func: this[`${type}Dialog`]
          }]
        }
      },
      exportDialog () {
        this.exportDialogVisible = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .b-table{
    .el-table{
      border-radius: 5px;
      // border: 1px solid #dedede;
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
    nav{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding:0 2px 8px;
      .nav-left, .nav-right{
        display: flex;
        flex-direction: row;
      }
      .nav-left{
        justify-content: flex-start;
      }
      .nav-right{
        justify-content: flex-end;
      }
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
