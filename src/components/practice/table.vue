<template>
 <b-table
  :table="table"
 >
  <template slot-scope="tableScope">
    <el-table
      :data="tableScope.data"
    >
      <el-table-column
        v-for="(item, key) in tableScope.column"
        :key="key"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
      </el-table-column>
    </el-table>
  </template>
 </b-table>
</template>

<script>
import Sortable from 'sortablejs'
import {cloneData} from 'util'
import req from 'api/web'
import BTable from 'components/common/b-table/index.vue'
export default {
  name: 'Table',
  components: {
    BTable
  },
  data () {
    return {
      table: {
        column: [
          {prop: 'id', label: 'ID', width: '50'},
          {prop: 'class', label: '网址分类', width: '150'},
          {prop: 'name', label: '网址名称', width: '150'},
          {prop: 'orderNo', label: '排序序列', width: '150'},
          {prop: 'subClass', label: '网址子类', width: '150'},
          {prop: 'url', label: '网址地址', width: '250'}
        ],
        data: [],
        info: null
      }
    }
  },
  created () {
    req('getWebsite').then(data => {
      this.table.data = data
      this.newTableData = cloneData(data)
    })
    this.$nextTick(() => {
      this.setSort()
    })
  },
  methods: {
    handleCurrentChange (row) {
    },
    setSort () {
      const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        animation: 150,
        scroll: true,
        sort: true,
        handle: '',
        setData: function (dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = this.tableData.splice(evt.oldIndex, 1)[0]
          this.tableData.splice(evt.newIndex, 0, targetRow)
        }
      })
    }
  }
}
</script>
