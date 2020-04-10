<template>
	<div class="site">
		<Header msg="Welcome to Your Vue.js App" />
		<!-- <div class="header-gap"></div> -->
		<Main />
		<Sidebar v-if="showSide" />
	</div>
</template>

<script>
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import Sidebar from './components/Sidebar.vue'
import { mapGetters } from "vuex";
export default {
  name: 'Layout',

  computed: {
    ...mapGetters(["showSide"])
  },
  components: {
    Header,
    Main,
    Sidebar
  }
}
</script>
<style  scoped>
.site {
	position: relative;
	overflow: hidden;
}
.header-gap {
	height: 80px;
}
</style>
