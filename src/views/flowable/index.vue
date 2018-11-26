<template>
  <div class="app-container">
    <iframe
      :src="src"
      frameborder="0"
      width="100%"
      height="100%"></iframe>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          src: ''
        }
      },
      watch: {
        $route() {
          this.getSrc()
        }
      },
      created() {
        this.getSrc()
      },
      methods: {
        getSrc() {
          let meta = this.$route.meta
          if (meta && meta.root) {
            this.src='/static/flowable-'+meta.root+'/index.html'
            if (meta.page) {
              this.src += '#/' + meta.page
            }
          }
        }
      }
    }
</script>

<style scoped>

</style>
