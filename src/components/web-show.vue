<template>
  <div>{{$route.params.className}}</div>
</template>

<script>
  export default {
    name: 'WebShow',
    data () {
      return {}
    },
    created () {

    },
    watch: {
      '$route' (to, from) {
        console.log('to', to)
        console.log('from', to)
      }
    },
    beforeRouteUpdate (to, from, next) {
      console.log(to, from, next)
      next()
    }
  }
</script>

<style lang="scss" scoped></style>