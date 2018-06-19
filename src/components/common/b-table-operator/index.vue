<template>
  <el-table-column
    v-if="operatorBtn.length"
    :label="label"
    :width="width"
    :fixed="fixed"
    :align="align"
    :min-width="minWidth"
  >
    <template slot-scope="scope">
      <el-button
        v-for="(btn, key) in operatorBtn"
        :key="key"
        type="text"
        size="small"
        @click.stop.native="handleClickOperator(btn, scope.row)"
      >
        {{btn.text}}
      </el-button>
    </template>
  </el-table-column>
</template>

<script>
  export default {
    name: 'BTableOperator',
    props: {
      table: Object,
      width: {
        type: null,
        default: 'auto'
      },
      minWidth: {
        default: 100
      },
      label: {
        type: String,
        default: '操作'
      },
      fixed: {
        type: String,
        default: 'right'
      },
      align: {
        type: String,
        default: 'center'
      }
    },
    data () {
      return {}
    },
    computed: {
      operatorBtn () {
        return this.table.operator
      }
    },
    methods: {
      handleClickOperator (btn, row) {
        btn.func && btn.func(row)
      }
    }
  }
</script>

<style lang="scss" scoped>
  // operator-column{
  //   padding: 8px 0;
  //   background-color: #dcdcdc;
  //   border-color: #cecece;
  // }

  .el-button--small{
    padding: 0px;
  }
</style>
