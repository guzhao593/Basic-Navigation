<template>
  <el-select
    v-model="selectValue"
    @change="handleChange"
  >
    <el-option
      v-for="(item, idx) of options"
      :key="idx"
      :label="item[property.label]"
      :value="item[property.value]"
    ></el-option>
  </el-select>
</template>

<script>
  export default {
    name: 'BSelect',
    props: {
      options: {
        type: Array,
        default () {
          return [{}]
        }
      },
      property: {
        type: Object,
        default () {
          return {
            label: 'label',
            value: 'value'
          }
        }
      },
      value: String
    },
    data () {
      return {
        selectValue: this.value
      }
    },
    methods: {
      handleChange (value) {
        this.$emit('input', value)
        this.$emit('change', value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-select{
    width: 100%;
  }
</style>
