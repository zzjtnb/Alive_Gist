<!--  -->
<template>
	<div></div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$router.replace(from.fullPath)
    })
  },
  mounted () {

  },
  methods: {
    // 通过跳转一个空页面再返回的方式来实现刷新当前页面数据的目的
    onRefresh () {
      this.$router.replace('/refresh')
    },
    data () {
      if (this.$route.path == '/search') {
        this.onRefresh()
      } else {
        this.$router.push("/search")
      }
    }
  },
  components: {

  },
}
</script>

<style scoped>
</style>