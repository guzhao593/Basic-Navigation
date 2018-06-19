<template>
  <b-dialog
    :dialogVisible="dialogVisible"
    :title="title"
    :toolbar="toolbar"
    @close="cance"
  >
    <el-form label-width="100px" :model="dialogForm">
      <el-form-item label="网站名称:">
        <el-input v-model="dialogForm.name"></el-input>
      </el-form-item>
      <el-form-item label="网址：">
        <el-input v-model="dialogForm.url"></el-input>
      </el-form-item>
      <el-form-item label="分类：">
        <b-select
          v-model="dialogForm.class"
          :options="classOptions"
          :property="menuProperty"
        ></b-select>
      </el-form-item>
    </el-form>
  </b-dialog>
</template>

<script>
  import BDialog from 'components/common/b-dialog.vue'
  import BSelect from 'components/common/b-select.vue'
  import req from 'api/web'

  export default {
    name: 'TableDialog',
    components: {
      BDialog,
      BSelect
    },
    props: {
      title: String,
      dialogForm: Object,
      value: Boolean
    },
    data () {
      return {
        toolbar: [
          {
            type: 'plane',
            name: '取消',
            func: () => {
              this.cance()
            }
          },
          {
            type: 'primary',
            name: '确定',
            func: () => {
              this.submit()
            }
          }
        ],
        dialogVisible: this.value,
        menuProperty: {
          label: 'className',
          value: 'className'
        }
      }
    },
    computed: {
      classOptions () {
        return this.$store.state.menu.menuData.find(item => item.route === '/website').children
      }
    },
    methods: {
      cance () {
        this.dialogVisible = false
        this.$emit('input', false)
      },
      submit () {
        this.title.includes('新增')
          ? this.reqFunc('addWebsite', '添加')
          : this.reqFunc('updateWebsite', '修改')
      },
      reqFunc (reqAddress, status) {
        req(reqAddress, this.dialogForm)
          .then((res) => {
            if (res.affectedRows) {
              this.$message({type: 'success', message: `${status}成功`})
              this.$emit('fetch')
              this.cance()
            } else {
              this.$message({type: 'error', message: `${status}失败`})
            }
          })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

