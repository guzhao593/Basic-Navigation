<template>
  <div>
    <a 
      v-for="(web, index) of webData"
      :key="index"
      :href="getUrl(web.url)" 
      target="blank"
      class="web-link"
    >
      {{web.name}}
    </a>
  </div>
</template>

<script>
  import req from 'api/web'
  import { BASE_URL } from 'config/api'
  export default {
    name: 'WebShow',
    data () {
      return {
        webData: []
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.fetch(to.params)
      })
    },
    beforeRouteUpdate (to, from, next) {
      this.fetch(to.params)
      next()
    },
    methods: {
      fetch ({className}) {
        req('web',{class: className}).then(data => {
          this.webData = data
        })
      },
      getUrl (url) {
        return url.includes('http') ? url : `${BASE_URL}\\${url}`
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'style/mixin.scss';
  .web-link{
    display: block;
    color: #337ab7;
    font-size: 14px;
    float: left;
    width: 140px;
    padding: 0 10px;
    min-height: 45px;
    line-height: 45px;
    text-align: center;
    @include text-ellipsis;
    &:hover{
      text-decoration: underline;
      color: #FF5E53;
      // background-color: #eff;
    }
  }
</style>