<template>
  <div>
    <span
      v-for="(web, index) of webData"
      :key="index"
    >
      <a :href="getUrl(web.url)" target="blank">
        {{web.name}}
      </a>
    </span>
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

<style lang="scss" scoped></style>