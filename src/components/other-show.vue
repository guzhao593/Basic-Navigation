<template>
  <div>1111111111111111122</div>
</template>

<script>
  export default {
    name: 'OtherShow',
    data () {
      return {}
    },
    watch: {
      '$route' (to, from) {
        console.log('to', to, 'from', from)
      }
    },
    beforeRouteUpdate (to, from, next) {
      console.log(to, from, next)
      next()
    }
  }
</script>

<style lang="scss" scoped></style>