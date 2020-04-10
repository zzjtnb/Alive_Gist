<template>
	<div class="network" v-if="!networkSuccess">
		<h3>我没网了!!!</h3>
		<div class="btn" @click="onRefresh">点击刷新</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
	name: "NotNetwork",
	computed: {
		...mapGetters(["networkSuccess"]),
	},
	created() {
		if (this.networkSuccess) {
			// //获取回跳的redirect地址
			// const redirect = this.$route.query.redirect
			// /**
			//  * 如果redirect存在说明当前用户是进入某页面后未登陆自动跳转到登陆页面来的，所以登陆完成后得再次回跳到该地址.否则跳转到默认的页面，首页或者其他页面
			//  */
			// this.$router.push(redirect ? redirect : '/')
			window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
		}
		console.log(this.networkSuccess);
	},
	methods: {
		goBack() {
			window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
		},
		// 通过跳转一个空页面再返回的方式来实现刷新当前页面数据的目的
		onRefresh() {
			console.log(1);
			//获取断网前用户所在路由
			//回退到原路由
			console.log(this.networkSuccess);
			if (!this.networkSuccess) {
				// //获取回跳的redirect地址
				// const redirect = this.$route.query.redirect
				// if (redirect) {
				//   //如果redirect存在说明当前用户是进入某页面后未登陆自动跳转到登陆页面来的，所以登陆完成后得再次回跳到该地址
				//   this.$router.push(redirect)
				// } else {
				//   //否则跳转到默认的页面，首页或者其他页面
				//   this.$router.push('/')
				// }
				window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
			}
		},
	},
};
</script>

<style scoped>
.network {
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: 3000;
	width: 50%;
	height: 200px;
	background: gray;
}
.btn {
	width: 200px;
	background: yellow;
}
</style>