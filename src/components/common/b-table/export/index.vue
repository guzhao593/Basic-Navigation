<template>
  <b-dialog
    :dialogVisible="dialogVisible"
    title="导出"
    :toolbar="toolbar"
    width="25vw"
  >
    <el-form label-width="100px">
      <el-form-item label="文件名:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="文件格式:">
        <b-select v-model="form.fileType" :options="fileOptions"></b-select>
      </el-form-item>
      <el-form-item label="选择数据:">
        <b-select v-model="form.dataType" :options="dataOptions"></b-select>
      </el-form-item>
    </el-form>
  </b-dialog>
</template>

<script>
  import BDialog from 'components/common/b-dialog.vue'
  import BSelect from 'components/common/b-select.vue'
  import XLSX from 'xlsx'
  export default {
    name: 'Export',
    components: {
      BDialog,
      BSelect
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      column: Array,
      data: Array,
      selectData: Array,
      exportConfig: Object
    },
    data () {
      return {
        toolbar: [
          {
            type: 'plane',
            name: '取消',
            func: () => {
              this.close()
            }
          },
          {
            type: 'primary',
            name: '确定',
            func: () => {
              this.export()
            }
          }
        ],
        form: {
          name: '导出Excel表',
          fileType: 'xlsx',
          dataType: 'page'
        },
        dataOptions: [
          { label: '当页数据', value: 'page' },
          { label: '选择数据', value: 'select' },
          { label: '所有数据', value: 'all' }
        ],
        fileOptions: [
          {label: 'xlsx', value: 'xlsx'},
          {label: 'xls', value: 'xls'},
          {label: 'txt', value: 'txt'},
          {label: 'csv', value: 'csv'}
        ],
        dialogVisible: this.value
      }
    },
    computed: {
      columnName () {
        return this.column.map(item => item.prop)
      }
    },
    methods: {
      close () {
        this.dialogVisible = false
        this.$emit('input', false)
      },
      export () {
        this.form.dataType === 'page' && this.exportExcel(this.data)
        this.form.dataType === 'select' && this.exportExcel(this.selectData)
        this.form.dataType === 'all' && this.exportAll()
        this.close()
      },
      exportAll () {
        const { req, reqApi } = this.exportConfig
        req(reqApi, {pageSize: -1}).then(({data}) => {
          this.exportExcel(data)
        })
      },
      exportExcel (data) {
        let ws = XLSX.utils.json_to_sheet(data, {header: this.columnName})
        ws['!cols'] = []
        this.column.forEach((item, key) => {
          ws[`${String.fromCharCode('A'.charCodeAt() + key)}1`].v = item.label
          ws['!cols'].push({wpx: item.width})
        })
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, this.form.name)
        XLSX.writeFile(wb, `${this.form.name}.${this.form.fileType}`)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
