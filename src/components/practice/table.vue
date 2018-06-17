<template>
 <b-table
  :table="table"
  @handleSizeChange="handleSizeChange"
 >
  <template slot-scope="tableScope">
    <el-table
      :data="tableScope.data"
      :height="tableScope.height"
      border
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column
        v-for="(item, key) in tableScope.column"
        :key="key"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        showOverflowTooltip
      >
      </el-table-column>
      <b-table-operator :table="tableScope"></b-table-operator>
    </el-table>
  </template>
 </b-table>
</template>

<script>
import {cloneData} from 'util'
import req from 'api/web'
import BTable from 'components/common/b-table/index.vue'
import BTableOperator from 'components/common/b-table-operator/index.vue'
export default {
  name: 'Table',
  components: {
    BTable,
    BTableOperator
  },
  data () {
    return {
      table: {
        column: [
          {prop: 'id', label: 'ID', width: '50'},
          {prop: 'class', label: '网址分类', width: '150'},
          {prop: 'name', label: '网址名称', width: '150'},
          {prop: 'orderNo', label: '排序序列', width: '100'},
          {prop: 'subclass', label: '网址子类', width: '100'},
          {prop: 'url', label: '网址地址', width: '200'}
        ],
        setting: {
          operator: [
            {
              text: '修改'
            },
            {
              text: '删除'
            }
          ],
          toolbar: [
            {
              text: '添加',
              type: 'primary',
              func (param) {
                console.log(param)
              }
            },
            {
              text: '删除',
              type: 'danger',
              func (param) {
                console.log(param)
              }
            }
          ],
          export: {
            text: '导出',
            type: 'success'
          }
        },
        data: [],
        info: {
          pageIndex: 1,
          pageSize: 8,
          total: 0
        }
      }
    }
  },
  created () {
    this.fetch(this.table.info)
  },
  methods: {
    handleSizeChange (info) {
      this.fetch(info)
    },
    fetch (options) {
      req('getWebsite', options).then(res => {
        this.table.data = res.data
        this.table.info = res.info
        this.newTableData = cloneData(res.data)
      })
    },
    handleSelectionChange (selected) {
      console.log(selected)
    }
  }
}
</script>
