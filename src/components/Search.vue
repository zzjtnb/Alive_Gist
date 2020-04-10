<!--  -->
<template>
	<div class="bgcolor-fff lazyloaded section">
		<div class="container">
			<main class="site-main">
				<el-row :gutter="24" class="row posts-wrapper" style="width: auto;">
					<el-col :xs="24" :lg="12" v-for="(item,index) in blogs" :key="index">
						<article class="post post-list">
							<div class="entry-wrapper">
								<header class="entry-header">
									<h2 class="entry-title" @click="goDetails(item.id)">
										<a>{{item.title}}</a>
									</h2>
								</header>
								<div class="entry-excerpt u-text-format">
									<p>{{item.description}}</p>
								</div>
								<div class="entry-footer">
									<a>
										<svg class="icon">
											<use xlink:href="#shijian" />
										</svg>
										最近更新:
										{{item.updateTime}}
									</a>
								</div>
							</div>
						</article>
					</el-col>
				</el-row>
				<div style="text-align: center">
					<el-pagination @size-change="handleSizeChange" @current-change="getGistList" :current-page.sync="Query.page" :page-sizes="[10,20, 30, 40]" :page-size="Query.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="Query.pageNumber*Query.pageSize" :hide-on-single-page="value" v-if="Query.pageNumber*Query.pageSize!=0&&!Mobile"></el-pagination>
					<el-pagination small @size-change="handleSizeChange" @current-change="getGistList" :current-page.sync="Query.page" :page-sizes="[5,10, 15, 20]" :page-size="Query.pageSize" layout="prev, pager, next,sizes" :total="Query.pageNumber*Query.pageSize" :hide-on-single-page="value" v-if="Query.pageNumber*Query.pageSize!=0&&Mobile"></el-pagination>
				</div>
			</main>
		</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
import {getGist} from "@/api/gist";
export default {
	data() {
		return {
			pageIndex: 1,
			flag: true,
		};
	},
	created() {
		this.getGistList();
	},
	mounted() {},
	computed: {
		...mapGetters(["token", , "Query", "SearchValue"]),
	},
	methods: {
		getGistList(datas) {
			this.blogs = [];
			let data = {
				page: this.Query.page,
				per_page: this.Query.pageSize,
			};
			getGist(data).then(response => {
				let result = response.data;
				let pageNumber = this.$util.parseHeaders(response.headers);
				if (pageNumber) {
					this.$store.dispatch("SetQueryPageNumber", pageNumber);
				}
				for (let i = 0; i < result.length; i++) {
					for (let key in result[i].files) {
						let data = {};
						data["title"] = key;
						data["url"] = result[i].files[key];
						data["description"] = result[i]["description"];
						data["id"] = result[i]["id"];
						data["createTime"] = this.$util.utcToLocal(result[i]["created_at"]);
						data["updateTime"] = this.$util.utcToLocal(result[i]["updated_at"]);
						data["hide"] = false;
						this.blogs.push(data);
						break;
					}
				}
			});
		},
		goDetails(id) {
			this.$router.push("/blog/details/" + id);
		},
	},
	components: {},
};
</script>

<style scoped>
/* 全站文章特色图版封面缩放效果 */

.entry-media a-img {
	max-width: 100%;
	-webkit-transition: all 444ms ease-in-out;
	-moz-transition: all 444ms ease-in-out;
	transition: all 444ms ease-in-out;
	-ms-flex-negative: 0;
	flex-shrink: 0;
}

.entry-media a:hover img,
.entry-media a:hover .entry-media a-img {
	-webkit-transform: scale(1.05);
	-moz-transform: scale(1.05);
	-ms-transform: scale(1.05);
	transform: scale(1.05);
}
/* 显示收藏 */
.post-grid:hover .entry-star,
.post-list:hover .entry-star {
	z-index: 99;
	visibility: visible;
	opacity: 1;
	transition: all 0.2s;
}
/* Hover卡片上移黑色盒子阴影 */
.post-list:hover,
.category-box:hover,
.vip-cell:hover {
	-webkit-box-shadow: 0 34px 20px -24px rgba(136, 161, 206, 0.3);
	box-shadow: 10px 6px 16px -5px rgba(0, 0, 0, 0.3);
	-webkit-transform: translateY(-5px);
	transform: translateY(-5px);
	-ms-transform: translateY(-5px);
}

/**
文章部分
 */
.icos {
	width: 0.7rem;
	height: 1rem;
}
.container {
	min-height: 1px;
	padding-left: 15px;
	padding-right: 15px;
	position: relative;
}
.entry-header .entry-meta {
	align-items: center;
	color: #aaa;
	display: flex;
	flex-wrap: wrap;
	font-size: 11px;
	letter-spacing: 0.2px;
	margin-bottom: 5px;
	text-transform: uppercase;
	text-align: center;
}
.entry-meta svg {
	float: left;
}
.entry-meta label {
	float: left;
	background: #00b1ff;
	color: #606266;
	padding: 0px 4px;
	margin-right: 10px;
	font-size: 12px;
	display: inline-block;
	max-width: 100%;
	border-radius: 6px;
}
.entry-title {
	clear: both;
}

.container {
	margin: 0 auto;
	max-width: 1090pt;
}

.entry-header .entry-title {
	/* font-weight: normal; */
	margin-bottom: 0.65rem;
	margin-top: 0.65rem;
	font-size: 0.975rem;
	display: inline;
	padding-right: 50px;
}
.tools {
	text-align: right;
	display: inline;
}
/**
文章部分
 */

.posts-wrapper,
.navbar .menu-item-mega > .sub-menu {
	display: flex;
	flex-wrap: wrap;
	margin-left: -15px;
	margin-right: -15px;
}
.post-list {
	display: flex;
	margin-bottom: 30px;
	position: relative;
	padding: 10px;
	background: #ffffff;
	border-radius: 4px;
}
.post-list,
.category-box,
.vip-cell {
	transition: box-shadow 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), -webkit-box-shadow 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), -webkit-transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
	transform: translate(0, 0);
}
.entry-media {
	margin-bottom: 10px;
	position: relative;
}
.post-list .entry-media {
	flex-shrink: 0;
	margin-bottom: 0;
	margin-right: 20px;
	width: 220px;
}
.entry-media .placeholder {
	background-color: #ffffff;
	height: 0;
	overflow: hidden;
	padding-bottom: 75%;
	/* border-radius: 4px 4px 0 0; */
}
.entry-media a::before {
	bottom: 0;
	content: "";
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	z-index: 1;
	opacity: 0.33;
	-webkit-transition: all 1s ease 0s;
	-moz-transition: all 1s ease 0s;
	-o-transition: all 1s ease 0s;
	transition: all 1s ease 0s;
}
img {
	display: block;
	height: auto;
	max-width: 100%;
	vertical-align: middle;
}
.lazyloaded {
	opacity: 1;
	transition: opacity 1s cubic-bezier(0.77, 0, 0.175, 1);
}
.entry-media img {
	margin: 0 auto;
	width: 100%;
	overflow: hidden;
	max-width: 100%;
	height: 165px;
	-webkit-transition: all 444ms ease-in-out;
	-moz-transition: all 444ms ease-in-out;
	transition: all 444ms ease-in-out;
	-ms-flex-negative: 0;
	flex-shrink: 0;
}

.entry-star {
	display: block;
	border-radius: 50%;
	font-size: 15px;
	height: 25px;
	right: 10px;
	line-height: 25px;
	position: absolute;
	text-align: center;
	top: 10px;
	width: 25px;
	opacity: 0;
	visibility: hidden;
	background-color: #ffc107;
}
.ripro-star {
	color: #ffffff;
	border-color: #ffffff;
}
.entry-media a::before {
	bottom: 0;
	content: "";
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	z-index: 1;
	opacity: 0.33;
	-webkit-transition: all 1s ease 0s;
	-moz-transition: all 1s ease 0s;
	-o-transition: all 1s ease 0s;
	transition: all 1s ease 0s;
}
.entry-format {
	background-color: rgba(0, 0, 0, 0.4);
	border-radius: 50%;
	color: #fff;
	font-size: 15px;
	height: 25px;
	left: 10px;
	line-height: 25px;
	position: absolute;
	text-align: center;
	top: 10px;
	width: 25px;
}
article,
aside,
footer,
header,
nav,
section {
	display: block;
}
.entry-header {
	word-break: break-word;
}
.entry-excerpt {
	font-size: 13px;
	margin-top: 10px;
	color: #aaa;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	white-space: normal;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	margin-bottom: 10px;
}
.entry-footer {
	display: flex;
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.2px;
	margin-top: 10px;
	text-transform: uppercase;
}
.entry-footer a {
	position: relative;
	margin-right: 5px;
	color: #aaaaaa;
	padding: 4px 6px;
	border-radius: 4px;
	font-weight: 500;
	background: rgb(246, 246, 246);
	line-height: 1;
}
img {
	display: block;
	height: auto;
	max-width: 100%;
	vertical-align: middle;
}
/* button */
.infinite-scroll-action {
	display: flex;
	justify-content: center;
}

.button,
.navigation .nav-next a,
.navigation .nav-previous a,
button[type="submit"],
input[type="submit"] {
	display: inline-block;
	padding: 9pt 20px;
	outline: 0;
	border: none;
	border-radius: 4px;
	background-color: #34495e;
	color: #fff;
	text-align: center;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: 500;
	font-size: 11px;
	font-family: Lato, sans-serif;
	line-height: 1;
	cursor: pointer;
}

.infinite-scroll-button {
	padding: 1pc;
	min-width: 200px;
	background: linear-gradient(-125deg, #2f49fd 0, #0295f9 100%);
	box-shadow: 0 8px 10px rgba(32, 160, 255, 0.3);
}

.button:hover {
	opacity: 0.8;
	transition: all 0.3s ease-in-out;
	transform: scale(0.95);
}

.post-grid {
	margin-bottom: 30px;
	border: 1px solid #eee;
	border-radius: 4px;
	background-color: #fff;
	transition: box-shadow 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), -webkit-box-shadow 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), -webkit-transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
	transform: translate(0, 0);
}

.post-grid:hover {
	box-shadow: 0 34px 20px -24px rgba(136, 161, 206, 0.3);
	transform: translateY(-5px);
	-ms-transform: translateY(-5px);
}

.lazyloaded {
	opacity: 1;
	transition: opacity 1s cubic-bezier(0.77, 0, 0.175, 1);
}
.section {
	padding-bottom: 40px;
	background: url("/images/main/bg-2.png");
}
.bgcolor-fff {
	background-color: #fff;
}
@media (max-width: 767px) {
	.post-list .entry-media {
		width: 120px;
	}
	.entry-footer {
		display: none;
	}
	.entry-media .placeholder {
		padding-bottom: 100%;
	}
}
</style>
