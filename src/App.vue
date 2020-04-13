<template>
	<div id="app">
		<transition name="fade">
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
import {mapGetters} from "vuex";
export default {
	name: "home",
	data() {
		return {
			api: process.env.NODE_ENV,
			isMobile: false,
		};
	},
	computed: {
		...mapGetters(["Mobile"]),
	},
	created() {
		// 处理断网的情况
		// eg:请求超时或断网时，更新state的network状态
		// network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
		// 关于断网组件中的刷新重新获取数据，会在断网组件中说明
		if (!window.navigator.onLine) {
			this.$store.dispatch("ChangeNetwork", false);
			this.$router.push("/notnetwork");
		}
		this.$store.dispatch("Init");
	},
	mounted() {
		// js代码中使用环境变量
		// console.log("VUE_APP_API", this.api)
		// console.log(process.env.IS_ANALYZE)
		/* 
    let windowSize = this.$util.getWindowSize()
    if (windowSize.height > windowSize.width * 1.2) {
      console.log("anzhuo ")
      this.$store.dispatch("Mobile", true);
    } else {
      console.log("PC ")
      this.$store.dispatch("Mobile", false);
    } 
    */
		this.isMobiles();
	},
	watch: {},
	methods: {
		isMobiles() {
			if (this.$util.isMobile()) {
				this.$store.dispatch("Mobile", true);
			} else {
				this.$store.dispatch("Mobile", false);
			}
		},
	},
};
</script>
<style>
/* @import "/css/global.css"; */

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}

/* 通用css代码 */
.icon {
	width: 1.5rem;
	height: 1.5rem;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
	transition: -webkit-transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
	transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
	transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1), -webkit-transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
}

html,
body,
#app {
	width: 100%;
	height: 100%;
}
/**
 *文章换行
 */
.markdown-body pre,
.markdown-body pre code {
	white-space: pre-wrap !important;
}
</style>
