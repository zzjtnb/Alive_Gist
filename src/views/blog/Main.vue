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
									<div class="tools">
										<el-button @click="$share('/blog/details/'+item.id)" style="padding: 3px 0" type="text" icon="el-icon-share">分享</el-button>
										<el-button @click="editBlog(index)" style="padding: 3px 0" type="text" icon="el-icon-edit" v-if="token">编辑</el-button>
										<el-button @click="deleteGists(index)" style="padding: 3px 0" type="text" icon="el-icon-delete" v-if="token">删除</el-button>
									</div>
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
import {getGist, deleteGist} from "@/api/gist";
export default {
	data() {
		return {
			value: true,
			blogs: [],
		};
	},
	computed: {
		...mapGetters(["token", "Mobile", "Query"]),
	},
	created() {
		if (this.Mobile) {
			this.$store.dispatch("SetQueryPageSize", 5);
		}
		this.getGistList();
	},
	mounted() {},
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
		editBlog(index) {
			if (!this.token) {
				this.$message({
					message: "请绑定有效的Token",
					type: "warning",
				});
				return;
			}
			this.$router.push("/blog/edit/" + this.blogs[index].id);
		},
		deleteGists(index) {
			console.log(index);
			this.$confirm("是否永久删除该博客?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(() => {
				let blog = this.blogs[index];
				deleteGist(blog.id).then(result => {
					console.log(result);
					this.$message({
						message: "删除成功",
						type: "success",
					});
					this.blogs.splice(index, 1);
				});
			});
		},
		handleSizeChange(val) {
			// console.log(`每页 ${val} 条`);
			this.$store.dispatch("SetQueryPageSize", val);
			this.$store.dispatch("SetQueryPageNumber", 1);
			this.getGistList();
		},
		handleCurrentChange(val) {
			// console.log(`当前页: ${val}`);
			this.$store.dispatch("SetQueryPageNumber", val);
			this.getGistList();
		},
	},
};
</script>

<style scoped>
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
.icon {
	width: 1rem;
	height: 1rem;
}
.container {
	position: relative;
	margin: 0 auto;
	padding: 0 15px;
	min-height: 1px;
	max-width: 1090pt;
}
.entry-header {
	display: flex;
	word-break: break-word;
	justify-content: space-between;
}

.entry-title {
	font-size: 1rem;
}

.tools {
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

article,
aside,
footer,
header,
nav,
section {
	display: block;
}
.entry-wrapper {
	width: 100%;
}
.entry-excerpt {
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
	font-weight: 700;
	letter-spacing: 0.2px;
	margin-top: 10px;
	text-transform: uppercase;
}
.entry-footer a {
	position: relative;
	margin-right: 5px;
	color: #aaaaaa;
	border-radius: 15px;
	font-weight: 500;
	background: rgb(246, 246, 246);
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
@media (max-width: 750px) {
	.entry-title {
		font-size: 14px;
		width: 100%;
	}
}
</style>

