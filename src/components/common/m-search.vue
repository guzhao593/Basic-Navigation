<template>
  <el-form>
    <el-form-item style="width: 35vw">
      <el-input type="text" v-model="word" @keydown.enter.native="submit">
        <i 
          v-if="word !== ''"
          slot="suffix" 
          class="el-input__icon el-icon-error"
          @click="clear" 
        ></i>
        <el-select v-model="searchClass" slot="prepend">
          <el-option
            v-for="(item, idx) of searchClassOptions"
            :key="idx"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button slot="append" @click="submit">搜索</el-button>
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>
  import req from 'api'

  export default {
    name: 'MSearch',
    props: {
      searchClass: {
        type: String,
        default: 'baidu'
      }
    },
    data () {
      return {
        searchClassOptions: [
          {
            label: '百度',
            value: 'baidu'
          },
          {
            label: '站内',
            value: 'inside'
          }
        ],
        word: ''
      }
    },
    methods: {
      submit () {
        if (this.searchClass === 'baidu') {
          console.log(1111)
          window.open(`http://baidu.com/s?word=${this.word}`)
        } else {
          req('')
        }
      },
      clear () {
        this.word = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'style/var.scss';
  .el-form-item{
    margin-bottom: 0px;
    /deep/ .el-input__inner{
      height: 30px;
      line-height: 30px;
      border-color: #dcdfe6 !important;
    }
    /deep/ .el-select .el-input{
      width: 80px;
      .el-input__inner{
        border: 0 none;
      }
    }
    .el-input__icon{
      line-height: 30px;
      font-size: 12px;
      &:hover{
        color: $main-color;
      }
    }
  }
</style>
