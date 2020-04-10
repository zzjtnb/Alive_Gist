<template>
	<div class="notNetwork">
		<div style="height:10%"></div>
		<div class="logo" @click="playMusic">
			<img src="/images/notNetwork/QaLXP.jpeg" :class="{ Rotation: isRotation }" />
		</div>
		<br />
		<br />
		<div class="container css-jump">
			<span>断</span>
			<span>网</span>
			<span>了</span>
			<span>.</span>
			<span>.</span>
			<span>.</span>
		</div>

		<div class="box bg-1 clearfix">
			<button class="button button--antiman button--round-l button--text-medium" @click="onRefresh">
				<span>点击刷新</span>
			</button>
		</div>

		<div class="body_buttom">
			<audio loop="loop" autoplay="true" id="music">
				<source src="music/yycz.mp3" type="audio/mpeg" />
			</audio>
		</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
	name: "NotNetwork",
	data() {
		return {
			isRotation: false,
		};
	},
	computed: {
		...mapGetters(["networkSuccess"]),
	},
	created() {
		if (this.networkSuccess) {
			window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
		}
	},
	mounted() {},
	methods: {
		onRefresh() {
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
		playMusic() {
			var audio = document.getElementById("music");
			if (audio.paused) {
				audio.play(); //audio.play();// 播放
				this.isRotation = true;
			} else {
				this.isRotation = false;
				audio.pause(); // 暂停
			}
		},
	},
};
</script>

<style scoped>
.notNetwork {
	background: url("/images/notNetwork/bg.jpg") no-repeat center center fixed;
	background-size: cover;
	width: 100%;
	height: 100%;
	text-align: center;
}
.container {
	text-align: center;
	padding: 4rem;
	font-size: 30px;
	color: #17a2b8;
}

.logo {
	width: 10rem;
	height: 10rem;
	margin: 0 auto;
	border-radius: 200px;
	border: 5px solid;
	box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
	transition: 1s all;
	text-align: center;
}

.logo img {
	background: #fff;
	border-radius: 200px;
}

.logo:hover {
	transform: rotate(360deg);
	box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.3);
}
@keyframes rotation {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

.Rotation {
	transform: rotate(360deg);
	animation: rotation 3s linear infinite;
}
.body_buttom {
	width: 100%;
	height: 290px;
	position: fixed;
	bottom: 0px;
	background: rgba(255, 255, 255, 0.3);
}

.button--antiman {
	background: none;
	border: none;
	height: 60px;
}

.button--antiman > span {
	padding-left: 0.35em;
}
.button--antiman::before,
.button--antiman::after {
	content: "";
	z-index: -1;
	border-radius: inherit;
	pointer-events: none;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	transition: transform 0.3s, opacity 0.3s;
	transition: transform 0.3s, opacity 0.3s;
	transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
}
.button--antiman:before {
	border: 1px solid #37474f;
	opacity: 0;
	transform: scale3d(1.2, 1.2, 1);
	transform: scale3d(1.2, 1.2, 1);
}

.button--antiman:after {
	background: rgba(255, 255, 255, 0.7);
}
.button--antiman:hover {
	color: #3f51b5;
}
.button--antiman:hover::before {
	opacity: 1;
	transform: scale3d(1, 1, 1);
	transform: scale3d(1, 1, 1);
}
.button--antiman:hover::after {
	opacity: 0;
	transform: scale3d(0.8, 0.8, 1);
	transform: scale3d(0.8, 0.8, 1);
}
.box {
	padding: 0.5em 0;
	display: flex;
	display: -ms-flexbox;
	display: flex;
	flex-wrap: wrap;
	-ms-flex-wrap: wrap;
	flex-wrap: wrap;
	justify-content: center;
	justify-content: center;
}
.button--round-l {
	border-radius: 40px;
}
.button {
	outline: none;
	min-width: 150px;
	max-width: 250px;
	display: block;
	margin: 1rem;
	border: none;
	background: none;
	color: inherit;
	position: relative;
	z-index: 1;
}
/* 跳动文字 */

.css-jump span {
	position: relative;
	top: 20px;
	display: inline-block;

	animation: bounce 0.3s ease infinite alternate;

	font-family: ‘Titan One’, cursive;
	font-size: 3rem;
	color: #fff;
	text-shadow: 0 1px 0 #409eff, 0 2px 0 #409eff, 0 3px 0 #409eff, 0 4px 0 #409eff, 0 5px 0 #409eff, 0 6px 0 transparent, 0 7px 0 transparent, 0 8px 0 transparent, 0 9px 0 transparent, 0 10px 10px rgba(0, 0, 0, 0.4);
}

.css-jump span:nth-child(2) {
	animation-delay: 0.1s;
}

.css-jump span:nth-child(3) {
	animation-delay: 0.2s;
}

.css-jump span:nth-child(4) {
	animation-delay: 0.3s;
}

.css-jump span:nth-child(5) {
	animation-delay: 0.4s;
}

.css-jump span:nth-child(6) {
	animation-delay: 0.5s;
}

.css-jump span:nth-child(7) {
	animation-delay: 0.6s;
}

/* 动画 */
@keyframes bounce {
	100% {
		top: -20px;
		text-shadow: 0 1px 0 #409eff, 0 2px 0 #409eff, 0 3px 0 #409eff, 0 4px 0 #409eff, 0 5px 0 #409eff, 0 6px 0 #409eff, 0 7px 0 #ccc, 0 8px 0 #409eff, 0 9px 0 #409eff, 0 50px 25px rgba(0, 0, 0, 0.2);
	}
}
</style>