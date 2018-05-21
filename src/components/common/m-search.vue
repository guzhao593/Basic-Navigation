<template>
  <el-form>
    <el-form-item 
      :style="{width: searchWidth}" 
      @mouseover.native="mouseover" 
      @mouseout.native="mouseout"
    >
      <el-input 
        type="text" 
        ref="input"
        v-model="word" 
        :class="{'active': isActive}"
        @keydown.enter.native="submit"
        @focus="focus"
        @blur="blur"
      >
        <i
          slot="prefix"
          class="el-input__icon el-icon-search"
        ></i>
        <i 
          v-if="word !== ''"
          slot="suffix" 
          class="el-input__icon el-icon-error"
          @click="clear"
          @mousedown="mousedown"
          @mouseup="mouseup"
        ></i>
        <!-- <el-select v-model="searchClass" slot="prepend">
          <el-option
            v-for="(item, idx) of searchClassOptions"
            :key="idx"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button slot="append" @click="submit">搜索</el-button> -->
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
        word: '',
        searchWidth: '10vw',
        focusStatus: false,
        isActive: false,
        isClear: false
      }
    },
    methods: {
      submit () {
        if (this.searchClass === 'baidu') {
          window.open(`http://baidu.com/s?word=${this.word}`)
        } else {
          req('')
        }
      },
      clear () {
        this.word = ''
        this.$refs.input.focus()
      },
      focus () {
        this.isActive = true
        this.focusStatus = true
        this.searchWidth = '25vw'
      },
      blur () {
        if (!this.isClear) {
          this.word = ''
          this.focusStatus = false
          this.isActive = this.searchWidth = '10vw'
          this.isActive = false
        }
      },
      mouseover () {
        this.searchWidth = '25vw'
        this.isActive = true
      },
      mouseout () {
        if (!this.isClear && !this.focusStatus) {
          this.searchWidth = '10vw'
          this.isActive = false
        }
      },
      mousedown () {
        this.isClear = true
      },
      mouseup () {
        this.isClear = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'style/var.scss';
  .el-form-item{
    margin-bottom: 0px;
    transition: all .5s;
    /deep/ .el-input__inner{
      height: 26px;
      line-height: 26px;
      border: 1px solid #323232;
      color: #fff;
      font-size: 12px;
      background: rgba(255, 255, 255, 0.12);
      border-radius: 0;
    }
    .el-input__icon{
      line-height: 30px;
      font-size: 12px;
      &:hover{
        color: $main-color;
      }
    }
  }
  .el-form-item .active /deep/ .el-input__inner, .el-input__inner:focus{
    border-color: #F09B22 !important;
  }
</style>
