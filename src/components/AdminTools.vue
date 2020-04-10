<!--  -->
<template>
	<div>
		<el-button @click="$share('/blog/details/'+id)" style="padding: 3px 0" type="text" icon="el-icon-share">分享</el-button>
		<el-button @click="editBlog()" style="padding: 3px 0" type="text" icon="el-icon-edit" v-if="token">编辑</el-button>
		<el-button @click="deleteGists()" style="padding: 3px 0" type="text" icon="el-icon-delete" v-if="token">删除</el-button>
		<el-button style=" padding: 3px 0" type="text" icon="el-icon-more-outline" @click="more">更多博客</el-button>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
import {deleteGist} from "@/api/gist";
export default {
	data() {
		return {
			id: this.$route.params.id,
		};
	},
	mounted() {},
	computed: {
		...mapGetters(["token", "Mobile", "Query"]),
	},
	methods: {
		editBlog() {
			if (!this.token) {
				this.$message({
					message: "请绑定有效的Token",
					type: "warning",
				});
				return;
			}
			this.$router.push("/blog/edit/" + this.id);
		},
		deleteGists() {
			this.$confirm("是否永久删除该博客?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(() => {
				deleteGist(this.id).then(result => {
					this.$message({
						message: "删除成功",
						type: "success",
					});
					this.$router.push("/");
				});
			});
		},
		more() {
			this.$router.push("/");
		},
	},
};
</script>

<style scoped>
</style>

