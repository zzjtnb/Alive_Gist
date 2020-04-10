<!--  -->
<template>
	<div>
		<div class="open-oauth text-center">
			<a href="https://www.microeco.net/oauth/qq" class="btn btn-qq">
				<svg class="icon">
					<use xlink:href="#qq" />
				</svg>
			</a>
			<a href="https://www.microeco.net/oauth/qq" class="btn btn-qq">
				<svg class="icon">
					<use xlink:href="#weixin" />
				</svg>
			</a>
			<a href="https://www.microeco.net/oauth/qq" class="btn btn-qq">
				<svg class="icon">
					<use xlink:href="#GitHub" />
				</svg>
			</a>
		</div>
		<div class="or-text">
			<span>or</span>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {};
  },
  mounted () { },
  methods: {},
  components: {}
};
</script>

<style scoped>
.open-oauth .btn svg {
	width: 1.5rem;
	height: 1.5rem;
}
.or-text:after {
	content: "";
	position: absolute;
	top: 9px;
	left: 0;
	background-color: #e5e5e5;
	width: 100%;
	height: 1px;
}
.or-text span {
	background-color: #ffffff;
	display: inline-block;
	padding: 0 8px;
	z-index: 2;
	position: relative;
}
.or-text {
	position: relative;
	text-align: center;
	line-height: 1;
	margin-bottom: 25px;
}

.open-oauth .btn {
	color: #ffffff !important;
	font-size: 14px;
	margin: 0;
	-webkit-border-radius: 50%;
	-moz-border-radius: 2px;
	position: relative;
	display: inline-block;
	margin-right: 10px;
	width: 32px;
	height: 32px;
	text-align: center;
	line-height: 32px;
	cursor: pointer;
	margin-left: 10px;
	padding: 0;
	letter-spacing: 0;
	font-weight: normal;
}
.open-oauth {
	margin-bottom: 20px;
}
</style>
