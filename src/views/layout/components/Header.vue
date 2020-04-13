<!-- 头部 -->
<template>
	<div>
		<header :class="{ slide_now: headerShow }" class="site_header" ref="siteHeader">
			<div class="container">
				<div class="navbar">
					<div class="logo-wrapper" v-if="!searchShow">
						<a class="site-logo" href>
							<img class="logo regular tap-logo" src="/images/header/logo-light.png" />
						</a>
					</div>
					<div class="sep" v-if="showNav"></div>
					<!-- 导航栏 -->
					<nav v-if="showNav" v-show="!searchShow">
						<ul id="menu" class="nav-list u-plain-list">
							<!-- 主菜单 -->
							<li class="menu-item" v-for="menu in this.$router.options.routes" v-if="menu.meta&&!menu.requiresAuth">
								<router-link :to="menu.path">
									<span>{{ menu.meta.title }}</span>
									<i class="material-icons nav-icon" v-if="menu.meta.submenu&&token">keyboard_arrow_down</i>
								</router-link>
								<!-- 子菜单 -->
								<ul class="sub-menu" v-if="menu.meta.submenu&&token">
									<li class="menu-item" v-for="(submenu, index) in menu.children" v-if="submenu.meta.requiresAuth">
										<router-link :to="submenu.path">{{submenu.meta.title }}</router-link>
									</li>
								</ul>
							</li>
						</ul>
					</nav>
					<div class="actions" v-if="!searchShow">
						<div class="login-btn navbar-button" @click="login()" v-if="!token">
							<i class="material-icons">account_circle</i>
							<a>登录</a>
						</div>
						<div class="login-btn navbar-button" @click="cancellation()" v-else>
							<i class="material-icons">power_settings_new</i>
							<a>注销</a>
						</div>
						<div class="search-open navbar-button" @click="showSearch(true)">
							<i class="material-icons">search</i>
						</div>
						<div class="burger navbar-button" @click="showSideBar(true)" v-if="Mobile">
							<i class="material-icons">menu</i>
						</div>
					</div>
					<div class="main-search" v-if="searchShow">
						<form class="search-form inline">
							<input type="search" class="search-field inline-field" placeholder="输入关键词，回车..." autocomplete="off" value required="required" clearable @keyup.enter="search($event)" />
						</form>
						<div class="search-close navbar-button" @click="showSearch(false)">
							<i class="icon-scale material-icons">close</i>
						</div>
					</div>
				</div>
			</div>
		</header>
	</div>
</template>

<script>
import SearchApi from "@/api/search";
import {mapGetters} from "vuex";
export default {
	data() {
		return {
			timer: null, // 定时器名称
			showNav: false,
			screenWidth: document.body.clientWidth,
			list: [],
			headerShow: false,
			searchShow: false,
		};
	},
	computed: {
		...mapGetters(["Mobile", "token", "mini", "Query"]),
	},
	created() {
		if (this.Mobile) {
			this.showNav = false;
		} else {
			this.showNav = true;
		}
	},
	watch: {
		screenWidth(val) {
			// 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
			this.screenWidth = val;
			let that = this;
			// 为了避免频繁触发resize函数导致页面卡顿，使用定时器
			this.timer = setTimeout(function() {
				// 打印screenWidth变化的值
				// console.log(that.screenWidth)
				if (that.screenWidth > 750) {
					that.showNav = true;
				}
				if (that.screenWidth < 750) {
					that.showNav = false;
				}
			}, 400);
			// 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
			this.$once("hook:beforeDestroy", () => {
				clearInterval(this.timer);
			});
		},
	},
	mounted() {
		/**
		 *  handleScroll为页面滚动的监听回调
		 */
		window.addEventListener("scroll", this.handleScroll);
		/**
		 * 监测窗口大小
		 */
		this.windowSize();
		/**
		 *  数据首次加载完后 → 获取图片（或外层框）宽度，并设置其高度
		 */
		this.$nextTick(() => {
			// 获取图片（或外层框）
			// let imgBox = this.$refs.imgBox
			// 获取其宽度
			// let wImgbox = imgBox[0].getBoundingClientRect().width
			// 设置其高度（以宽度的60%为例）
			// this.imgBox.height = 0.6 * wImgbox + 'px'
		});
	},
	methods: {
		login() {
			this.$router.push("/login");
			// this.$router.push("/blog/details/" + id);
		},
		cancellation() {
			this.$store.dispatch("Cancellation");
		},
		// 通过跳转一个空页面再返回的方式来实现刷新当前页面数据的目的
		onRefresh() {
			this.$router.replace("/refresh");
		},
		search(event) {
			let data = event.target.value;
			this.$store.dispatch("SetSearchValue", data);
			if (this.$route.path == "/search") {
				this.onRefresh();
			} else {
				this.$router.push("/search");
			}
		},
		/**
		 * 监听window的resize事件．在浏览器窗口变化时显示隐藏导航栏．
		 * 网页可见区域宽：document.body.clientWidth
		 * 网页可见区域高：document.body.clientHeight
		 * 网页可见区域宽：document.body.offsetWidth(包括边线的宽)
		 * 网页可见区域高：document.body.offsetHeight(包括边线的宽)
		 */
		windowSize() {
			const that = this;
			window.onresize = () => {
				return (() => {
					window.screenWidth = document.body.clientWidth;
					that.screenWidth = window.screenWidth;
				})();
			};
		},
		showSideBar(value) {
			this.$store.dispatch("ShowSide", value);
		},
		showSearch(value) {
			this.searchShow = value;
			//  this.$router.back();
			// this.$store.dispatch("Mobile", value);
		},
		/**
		 * 判断页面滚动距离：
		 */
		handleScroll() {
			// 监听dom渲染完成
			this.$nextTick(function() {
				let siteHeader = this.$refs.siteHeader;
				// 这里要得到top的距离
				this.offsetTop = siteHeader.offsetTop;
				//和元素自身的高度
				// this.offsetHeight = siteHeader.offsetHeight;
				// console.log("offsetTop:" + this.offsetTop + "," + "offsetHeight:" + this.offsetHeight);
			});
			// 得到页面滚动的距离
			let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			// 判断页面滚动的距离是否大于吸顶元素的位置
			this.headerShow = scrollTop > this.offsetHeight * 2;
			if (this.headerShow) {
				document.getElementsByClassName("site_header")[0].style.position = "fixed";
			} else {
				document.getElementsByClassName("site_header")[0].style.position = "";
			}
		},

		// getScroll () {      window.addEventListener('scroll', () => {
		//     this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
		//     //获取高度值
		//     var height = this.$refs.siteHeader.offsetHeight; //100

		//     //获取元素样式值,element 为元素ref="element"
		//     var heightCss = window.getComputedStyle(this.$refs.element).height; // 100px

		//     //获取元素内联样式值
		//     var heightStyle = this.$refs.element.style.height; // 100px
		//     console.log(st);
		//   }, true)    },
	},
	/**
	 * 在beforeDestroy()生命周期内清除定时器
	 */
	beforeDestroy() {
		clearInterval(this.timer);
		this.timer = null;
	},
	/**
	 * 在destroyed回调中移除监听
	 */
	destroyed() {
		window.removeEventListener("scroll", this.handleScroll);
	},
	components: {},
};
</script>

<style scoped>
.site_header {
	/* position: fixed !important;*/
	/* position: absolute; */
	top: 0;
	right: 0;
	left: 0;
	z-index: 2;
	background-color: #fff;
	box-shadow: 0 0 30px rgba(0, 0, 0, 0.07);
	transition: background-color 0.5s cubic-bezier(0.77, 0, 0.175, 1), box-shadow 0.5s cubic-bezier(0.77, 0, 0.175, 1), transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
	backface-visibility: hidden;
}
.slide_now {
	box-shadow: none;
	transform: translateY(-80px);
}
.container {
	margin: auto;
	max-width: 90pc;
}
.navbar {
	display: flex;
	height: 5pc;
	align-items: center;
}
.logo-wrapper,
.navbar,
.site-logo {
	position: relative;
}
.site-logo {
	float: left;
	overflow: hidden;
	max-height: 50px;
	margin-left: 20%;
}
.site-logo:before {
	position: absolute;
	top: -460px;
	left: -665px;
	width: 200px;
	height: 10px;
	background-color: hsla(0, 0%, 100%, 0.5);
	content: "";
	transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
	animation: searchLights 1s ease-in 1s infinite;
}
@keyframes searchLights {
	0% {
		top: 0;
		left: -75pt;
	}
	to {
		top: 75pt;
		left: 90pt;
	}
}
.logo:not(.text) {
	transition: opacity 0.5s cubic-bezier(0.77, 0, 0.175, 1);
}
.logo {
	margin-right: 9pt;
	height: auto;
	max-width: 50px;
}
.sep {
	display: flex;
	margin: 0 20px;
	width: 1px;
	height: 100%;
}
.sep:after {
	margin: auto;
	width: 100%;
	height: 50%;
	background-color: #e6e6e6;
	content: "";
	transition: background-color 0.5s cubic-bezier(0.77, 0, 0.175, 1);
}
.u-plain-list {
	margin: 0;
	padding: 0;
	list-style-type: none;
}
.menu-item {
	position: relative;
	display: inline-block;
}
.nav-icon {
	font-size: 9pt;
}
.nav-list > .menu-item > a {
	margin: 0 9pt;
	font-size: 14px;
	line-height: 81px;
	transition: color 0.5s cubic-bezier(0.77, 0, 0.175, 1);
}
.menu-item > a {
	display: block;
	text-transform: uppercase;
	letter-spacing: 0.2px;
	font-weight: 700;
}
.menu-item.menu-item-has-children > a:after {
	margin-left: 5px;
	color: #aaa;
	content: "";
	font-weight: 400;
	font-size: 13px;
	font-family: Material Design Icons;
	transition: color 0.5s cubic-bezier(0.77, 0, 0.175, 1);
}
.menu-item:hover > .sub-menu {
	visibility: visible;
	opacity: 1;
	transform: translateY(0);
}
.sub-menu {
	position: absolute;
	top: 100%;
	z-index: 2;
	visibility: hidden;
	margin: -1px 0 0 -18px;
	padding: 20px 0;
	min-width: 220px;
	background-color: #fff;
	box-shadow: 0 0 30px rgba(0, 0, 0, 0.07);
	list-style-type: none;
	opacity: 0;
	transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);
	transform: translateY(5px);
}
.sub-menu .menu-item {
	display: block;
}
.sub-menu .menu-item > a {
	display: flex;
	padding: 9px 30px;
	font-size: 11px;
	line-height: 18px;
	transition: transform 0.3s cubic-bezier(0.77, 0, 0.175, 1);
	transition: transform 0.3s cubic-bezier(0.77, 0, 0.175, 1), -webkit-transform 0.3s cubic-bezier(0.77, 0, 0.175, 1);
	align-items: center;
}
.sub-menu .menu-item > a:hover {
	opacity: 1;
	transform: translateX(5px);
}
.actions {
	display: flex;
	flex-grow: 1;
	justify-content: flex-end;
}
.navbar-button {
	display: flex;
	margin-right: 10px;
	width: 30px;
	height: 30px;
	border: 0;
	border-radius: 50%;
	background-color: #f6f6f6;
	color: #34495e;
	font-size: 1pc;
	cursor: pointer;
	align-items: center;
	justify-content: center;
	transition: transform 0.4s ease-out;
}

.main-search .search-close {
	position: absolute;
	top: 50%;
	right: 0;
	margin-top: -15px;
	font-size: 15px;
}
.main-search .search-close:hover {
	box-shadow: 0 0 10px #fff;
	transform: rotateZ(360deg);
	-webkit-transform: rotateZ(360deg);
}
.login-btn {
	display: flex;
	margin-right: 10px;
	width: 5pc;
	height: 30px;
	border: 0;
	border-radius: 4px;
	background-color: #f6f6f6;
	color: #fff;
	color: #34495e;
	font-size: 14px;
	cursor: pointer;
	align-items: center;
	justify-content: center;
}
.main-search {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
}
.main-search .search-form {
	height: 100%;
}
form.inline {
	position: relative;
}
form.inline .inline-field {
	margin-bottom: 0;
	/* padding-right: 20px; */
	width: 95%;
	outline: 0;
	text-overflow: ellipsis;
	transition: border-color cubic-bezier(0.77, 0, 0.175, 1);
}
input[type="search"]::-webkit-search-cancel-button {
	display: none;
}
.main-search .search-field {
	margin: 0;
	height: 100%;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 20px;
}
.main-search .search-field,
form.inline button[type="submit"] {
	padding: 0;
	border: 0;
	background-color: transparent;
	text-align: center;
}
form.inline button[type="submit"] {
	position: absolute;
	top: 50%;
	right: 0;
	margin-top: -15px;
	width: 30px;
	height: 30px;
	color: #1a1a1a;
	font-size: 1pc;
	line-height: 30px;
}

.navbar-button {
	border: 1px solid #f7f7ff;
	background-color: #f7f7ff;
	background-image: none;
	color: #1890ff;
}

.navbar-button:hover {
	box-shadow: 0 0 0 rgba(32, 160, 255, 0.3);
	transform: scale(0.95);
}

.button:hover {
	color: #fff !important;
}

.burger:hover,
.button:hover {
	box-shadow: 0 0 0 rgba(32, 160, 255, 0.3);
	transform: scale(0.95);
}

.hidden {
	display: none;
}
</style>
