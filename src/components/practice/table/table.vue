<template>
  <div>
    <b-table
      ref="bTable"
      :table="table"
      @handleSizeChange="handleSizeChange"
    >
    <template slot-scope="tableScope">
      <el-table
        v-loading="loading"
        :data="tableScope.data"
        :height="tableScope.height"
        border
        stripe
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
    <table-dialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      :title="title"
      :dialog-form="dialogForm"
      @fetch="fetch({pageIndex: 1, pageSize: table.info.pageSize})"
    ></table-dialog>
  </div>
</template>

<script>
import {cloneData} from 'util'
import req from 'api/web'
import BTable from 'components/common/b-table/index.vue'
import BTableOperator from 'components/common/b-table-operator/index.vue'
import TableDialog from './table-dialog.vue'
export default {
  name: 'Table',
  components: {
    BTable,
    BTableOperator,
    TableDialog
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
              text: '修改',
              func: (row) => {
                this.edit(row)
              }
            },
            {
              text: '删除',
              func: (row) => {
                this.delete(row)
              }
            }
          ],
          toolbar: [
            {
              text: '添加',
              type: 'primary',
              func: this.add
            },
            {
              text: '删除',
              type: 'danger',
              func: (vm) => {
                this.delete()
              }
            }
          ],
          export: {
            text: '导出',
            type: 'success',
            req,
            reqApi: 'getWebsite'
          }
        },
        data: [],
        info: {
          pageIndex: 1,
          pageSize: 8,
          total: 0
        }
      },
      loading: false,
      dialogForm: {},
      dialogVisible: false
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
      this.loading = true
      req('getWebsite', options)
        .then(res => {
          this.table.data = res.data
          this.table.info = res.info
          this.newTableData = cloneData(res.data)
        })
        .finally(() => (this.loading = false))
    },
    add () {
      this.dialogForm = {}
      this.title = '新增网址'
      this.dialogVisible = true
    },
    edit (row) {
      this.dialogForm = row
      this.title = '修改网址'
      this.dialogVisible = true
    },
    delete (row) {
      let deleteData = row ? [row] : this.$refs.bTable.selectData
      if (!deleteData.length) return this.$message({message: '请选择要删除的数据', type: 'warning'})
      this.$confirm('确定要删除这些数据吗?')
        .then(() => {
          req('deleteWeb', {id: JSON.stringify(deleteData.map(item => item.id))})
            .then(data => {
              if (data.affectedRows) {
                this.$message({type: 'success', message: '删除成功'})
                this.fetch({pageIndex: 1, pageSize: this.table.info.pageSize})
              } else {
                this.$message({type: 'error', message: '删除失败'})
              }
            })
            .catch(err => {
              console.log(err)
            })
        })
    }
  }
}
</script>
