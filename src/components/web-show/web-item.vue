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
  export default {
    name: 'WebItem',
    props: {

    },
    data () {
      return {}
    }
  }
</script>

<style lang="scss" scoped>

</style>