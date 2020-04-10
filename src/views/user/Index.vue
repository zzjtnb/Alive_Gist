<!--  -->
<template>
	<div class="swal2-container swal2-center swal2-fade swal2-shown" style="overflow-y: auto;" id="bigArea">
		<div class="swal2-popup swal2-modal swal2-show" style="width: 340px; padding: 0px; display: flex;">
			<div class="swal2-content">
				<div class="modal-content">
					<div class="modal-body">
						<!-- Nav tabs -->
						<ul class="nav nav-tabs">
							<li :class="{active:loginShow}">
								<a @click="showDialog(loginShow)">登录</a>
							</li>
							<li :class="{active:signupShow}">
								<a @click="showDialog(signupShow)">注册</a>
							</li>
						</ul>
						<div class="tab-content">
							<Login :login="loginShow"></Login>
							<Signup :signup="signupShow"></Signup>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Login from './Login';
import Signup from './Signup';
export default {
  data () {
    return {
      // 控制子组件显示与隐藏的标识，类型为Boolean
      loginShow: true,
      signupShow: false,
    }
  },
  mounted () {
    this.closeUser()
  },
  watch: {

  },
  methods: {
    showDialog (value) {
      this.loginShow = !this.loginShow
      this.signupShow = !this.signupShow
    },
    closeUser () {
      // 点击其他区域时, 隐藏指定区域(User)
      document.addEventListener("click", event => {
        let bigArea = document.querySelector("#bigArea");
        let userArea = document.querySelector(".modal-body");
        let clickArea = event.target;
        if (userArea) {
          if (userArea == clickArea || userArea.contains(clickArea)) {

          } else {
            // //获取回跳的redirect地址
            // const redirect = this.$route.query.redirect
            // /**
            //  * 如果redirect存在说明当前用户是进入某页面后未登陆自动跳转到登陆页面来的，所以登陆完成后得再次回跳到该地址.否则跳转到默认的页面，首页或者其他页面
            //  */
            // console.log(redirect)
            // this.$router.push(redirect ? redirect : '/')
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
            bigArea.style.display = "none"
          }
        }
      });
    }
  },
  components: {
    Login,
    Signup
  },
}
</script>

<style>
/**登录注册页面公共样式start */
.btn--block:hover {
	/* 缩放 */
	transform: scale(0.95);
	box-shadow: 0 0px 0px rgba(32, 160, 255, 0.3);
	color: #fff !important;
}
.btn:hover {
	opacity: 0.8;
	-webkit-transition: all 0.3s ease-in-out;
	-moz-transition: all 0.3s ease-in-out;
	transition: all 0.3s ease-in-out;
}
.btn--secondary {
	background-color: #2196f3;
	color: #ffffff;
}
button,
html [type="button"],
[type="reset"],
[type="submit"] {
	-webkit-appearance: button;
}
.button,
.btn--primary {
	background: linear-gradient(-125deg, #0295f9 0%, #2f49fd 100%);
	-webkit-box-shadow: 0 8px 10px rgba(32, 160, 255, 0.3);
	box-shadow: 0 8px 10px rgba(32, 160, 255, 0.3);
}
.btn--block {
	width: 100% !important;
}
.btn--primary {
	background-color: #34495e;
	color: #ffffff;
}
.btn {
	border: none;
	border-radius: 4px;
	cursor: pointer;
	display: inline-block;
	font-size: 11px;
	font-weight: 600;
	letter-spacing: 1px;
	line-height: 36px;
	outline: none;
	/* padding: 0 18px; */
	text-align: center;
	text-transform: uppercase;
	position: relative;
}
.button:hover,
input[type="submit"]:hover,
button[type="submit"]:hover,
.navigation .nav-previous a:hover,
.navigation .nav-next a:hover {
	opacity: 0.8;
	-webkit-transition: all 0.3s ease-in-out;
	-moz-transition: all 0.3s ease-in-out;
	transition: all 0.3s ease-in-out;
}
input[type="text"]:focus,
input[type="password"]:focus,
input[type="email"]:focus,
input[type="search"]:focus,
input[type="number"]:focus,
input[type="tel"]:focus,
textarea:focus,
textarea {
	height: 100%;
	line-height: 1;
	padding: 9px 12px;
	resize: vertical;
	border: 1px solid #409eff;
	border-radius: 4px;
	max-height: 80px;
}
input[type="text"],
input[type="password"],
input[type="email"],
input[type="search"],
input[type="number"],
input[type="tel"],
textarea {
	border: 0;
	border-radius: 0;
	font-family: Lato, sans-serif;
	line-height: 36px;
	margin-bottom: 10px;
	padding: 0 12px;
	transition: border-color cubic-bezier(0.77, 0, 0.175, 1);
	width: 100%;
	border: 1px solid #f1f1f1;
}
select,
.form-control,
textarea.form-control {
	font-family: "Poppins", sans-serif;
	background-color: #f8f8f8;
	border: 1px solid #eeeeee;
	font-size: 14px;
	color: #aaaaaa;
	line-height: 42px;
	margin-bottom: 0;
	box-shadow: none;
	-moz-box-shadow: none;
	-webkit-box-shadow: none;
	padding: 0 18px;
	-webkit-border-radius: 3px;
	-moz-border-radius: 3px;
	border-radius: 3px;
}
.form-group {
	margin-bottom: 15px;
	position: relative;
}
.mb-0 {
	margin-bottom: 0 !important;
}
.fade.in {
	opacity: 1;
}
.text-center {
	text-align: center;
}
[class^="swal2"] {
	-webkit-tap-highlight-color: transparent;
}

/**登录注册页面公共样式end */
.tab-content {
	padding: 20px;
	border-radius: 4px;
	background-color: #fff;
}
.nav-tabs > li.active > a,
.nav-tabs > li.active > a:focus,
.nav-tabs > li.active > a:hover,
.nav-tabs > li > a:focus,
.nav-tabs > li > a:active,
.nav-tabs > li > a:hover {
	background-color: transparent;
	border: none;
	opacity: 1;
}
.nav-tabs > li.active > a:after {
	content: "";
	position: absolute;
	left: 50%;
	bottom: 0;
	margin-left: -5px;
	border: 10px solid transparent;
	border-bottom: 10px solid #ffffff;
}
.nav-tabs > li > a {
	opacity: 0.3;
	padding: 0px 10px;
	border: none;
	font-size: 15px;
	font-weight: 500;
	text-transform: capitalize;
	font-weight: 600;
}
.nav-tabs > li {
	float: none;
	display: inline-block;
}
.nav-tabs {
	border-bottom: none;
	text-align: center;
	padding-left: 0;
	padding: 10px;
	list-style: none;
	margin: 0;
}
.modal-body {
	position: relative;
	padding: 15px;
}
.modal-content {
	border: none;
	box-shadow: none;
	position: relative;
	background-color: transparent;
}
.swal2-content a {
	color: #007fff;
}
.swal2-content {
	z-index: 1;
	justify-content: center;
	margin: 0;
	padding: 0;
	color: #545454;
	font-size: 1.125em;
	font-weight: 300;
	line-height: normal;
	text-align: center;
	word-wrap: break-word;
}
.swal2-show {
	-webkit-animation: swal2-show 0.3s;
	animation: swal2-show 0.3s;
}

.swal2-popup {
	display: none;
	position: relative;
	box-sizing: border-box;
	flex-direction: column;
	justify-content: center;
	width: 26em;
	max-width: 100%;
	padding: 1.25em;
	border: none;
	border-radius: 0.3125em;
	background: #fff;
	font-family: inherit;
	font-size: 1rem;
	box-shadow: 0 10px 50px -5px rgba(6, 39, 67, 0.12);
}
.swal2-container {
	display: flex;
	position: fixed;
	z-index: 4;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 0.625em;
	overflow-x: hidden;
	background-color: transparent;
	-webkit-overflow-scrolling: touch;
}

.swal2-container.swal2-center {
	align-items: center;
}
.swal2-container.swal2-fade {
	transition: background-color 0.1s;
}
.swal2-container.swal2-shown {
	background-color: rgba(52, 73, 94, 0.9);
}
</style>