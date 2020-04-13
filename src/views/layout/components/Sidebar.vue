<!--  -->
<template>
	<div class="off-canvas" :class="{'canvas-opened':showSide}">
		<div class="canvas-close" @click="closeSide(false)">
			<i class="material-icons">close</i>
		</div>
		<div class="logo-wrapper" @click="closeSide(false)">
			<a>
				<img class="logo regular" src="/images/header/logo-light.png" alt="争逐" />
			</a>
		</div>
		<div class="mobile-menu hidden-lg hidden-xl">
			<div class="slicknav_menu">
				<ul class="slicknav_nav">
					<!-- 主菜单 -->
					<li class="menu-item slicknav_parent" v-for="menu in this.$router.options.routes" v-if="menu.meta&&!menu.requiresAuth">
						<router-link :to="menu.path">
							<span @click="closeSide(false)">{{ menu.meta.title }}</span>
							<i class="material-icons nav-icon" :class="{transform:transform}" v-if="menu.meta.submenu&&token" @click="showSubmenu(true)">keyboard_arrow_down</i>
						</router-link>
						<!-- 子菜单 -->
						<ul class="sub-menu" v-if="isShow&&menu.meta.submenu&&token">
							<li class="menu-item sub-menu-item" v-for="(submenu, index) in menu.children" v-if="submenu.meta.requiresAuth" @click="closeSide(false)">
								<router-link :to="submenu.path">{{submenu.meta.title }}</router-link>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
	data() {
		return {
			transform: false,
			isShow: false,
		};
	},
	computed: {
		...mapGetters(["showSide", "token"]),
	},
	mounted() {},
	methods: {
		showSubmenu() {
			this.transform = !this.transform;
			this.isShow = !this.isShow;
			// document.querySelector('.nav-icon').classList.add('transform')
			// console.log(document.querySelector('.nav-icon'))
		},
		closeSide(value) {
			this.$store.dispatch("ShowSide", value);
		},
	},
	components: {},
};
</script>

<style scoped>
.slicknav_nav li.slicknav_parent {
	-ms-flex: 0 0 100%;
	flex: 0 0 100%;
	max-width: 100%;
}
.slicknav_nav .sub-menu .sub-menu-item {
	width: 100%;
	min-height: 1px;
	padding: 0.25rem;
	-ms-flex: 0 0 33.333333%;
	flex: 0 0 100%;
	max-width: 100%;
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
}
.slicknav_item a {
	display: inline;
	outline: none;
	padding: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.menu-item > a {
	align-items: center;
	display: flex;
	font-size: 14px;
	font-weight: 700;
	letter-spacing: 0.2px;
	line-height: 1;
	outline: none;
	padding: 12px 5px;
	justify-content: center;
	border: 1px solid #f4f6f9;
	border-radius: 4px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.slicknav_nav li {
	width: 100%;
	min-height: 1px;
	padding: 0.25rem;
	-ms-flex: 0 0 33.333333%;
	flex: 0 0 50%;
	max-width: 50%;
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
}
.slicknav_menu .slicknav_nav {
	background-color: #fff;
	margin-bottom: 30px;
	padding: 0 20px;
	width: 100%;
	position: relative;
	overflow: hidden;
	display: -ms-flexbox;
	display: flex !important;
	-ms-flex-wrap: wrap;
	flex-wrap: wrap;
	width: 100%;
}
.slicknav_menu .slicknav_nav,
.slicknav_menu .sub-menu {
	list-style-type: none;
	margin: 0;
	padding: 0;
}
.off-canvas .logo {
	padding: 0 20px;
	max-width: 140px;
}
.logo:not(.text) {
	transition: opacity 0.5s cubic-bezier(0.77, 0, 0.175, 1);
}
.logo-wrapper {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
}
.off-canvas .canvas-close {
	position: absolute;
	right: 15px;
	top: 15px;
}
.navbar .navbar-button,
.off-canvas .canvas-close {
	align-items: center;
	border-radius: 50%;
	cursor: pointer;
	display: flex;
	font-size: 16px;
	height: 30px;
	justify-content: center;
	width: 30px;
	margin-right: 10px;
	background-color: #f6f6f6;
	border: 0;
	color: #34495e;
}
.navbar .navbar-button,
.off-canvas .canvas-close {
	background-color: #f7f7ff;
	border: 1px solid #f7f7ff;
	color: #1890ff;
	background-image: none;
	-webkit-animation: none;
	transition: transform 0.4s ease-out;
}
.navbar .navbar-button,
.off-canvas .canvas-close:hover {
	box-shadow: 0 0 10px #fff;
	transform: rotateZ(360deg);
	-webkit-transform: rotateZ(360deg);
}

.off-canvas {
	background-color: #fff;
	height: 100vh;
	overflow-y: scroll;
	padding: 60px 0 15px;
	position: fixed;
	right: 0;
	top: 0;
	-webkit-transform: translateX(320px);
	transform: translateX(320px);
	transition: -webkit-transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
	transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
	transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1), -webkit-transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
	width: 320px;
	z-index: 9999;
	-webkit-overflow-scrolling: touch;
}
.off-canvas.canvas-opened {
	-webkit-transform: translateX(0);
	transform: translateX(0);
	visibility: visible;
}
.nav-icon {
	/* font-size: 9pt; */
	margin-left: 5px;
}
.transform {
	transform: rotateX(180deg);
}
</style>