<!--  -->
<template>
	<div class="site-content">
		<transition name="fade">
			<router-view></router-view>
		</transition>
	</div>
	<!-- end sitecoent -->
</template>

<script>
export default {
  data () {
    return {
      isSection: true
    }
  },
  mounted () {


  },
  created () {

  },
  methods: {

  },
  components: {

  },
}
</script>

<style scoped>
.site-content {
	padding-bottom: 0;
	padding-top: 0;
}
@media (max-width: 575px) {
	.container {
		max-width: 460px;
		padding-left: 10px;
		padding-right: 10px;
	}
}
</style>