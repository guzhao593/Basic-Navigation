<template>
  <b-dialog
    :dialog-visible.sync="showDialog"
    :title="title"
    :toolbar="toolbar"
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
  import BSelect from 'components/common/b-select.vue'
  import BDialog from 'components/common/b-dialog.vue'
  export default {
    name: 'WebDialog',
    components: {
      BDialog,
      BSelect
    },
    props: {
      isShowDialog: Boolean,
      dialogForm: Object,
      title: String,
      toolbar: Array
    },
    data () {
      return {
        showDialog: this.isShowDialog,
        menuProperty: {
          label: 'className',
          value: 'className'
        }
      }
    },
    watch: {
      showDialog () {
        this.$emit('update:isShowDialog', this.showDialog)
      }
    },
    computed: {
      classOptions () {
        return this.$store.state.menu.menuData.find(item => item.route === '/website').children
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>