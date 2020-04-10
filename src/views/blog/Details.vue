<!--  -->
<template>
	<div class="container">
		<article class="article-content">
			<el-card shadow="never" style="min-height: 400px">
				<div slot="header">
					<el-row>
						<el-col :span="12">
							<span>{{blog.title}}</span>
						</el-col>
						<el-col :span="12">
							<div style="text-align: right;">
								<AdminTools></AdminTools>
							</div>
						</el-col>
					</el-row>
				</div>
				<div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
					发布 {{blog.createTime}}
					<br />
					更新 {{blog.updateTime}}
				</div>
				<div class="markdown-body" style="padding-top: 20px">
					<mavon-editor :ishljs="true" codeStyle="agate" v-html="blog.content"></mavon-editor>
				</div>
			</el-card>
		</article>
	</div>
</template>

<script>
import {getSingle} from "@/api/gist";
import {mapGetters} from "vuex";
import AdminTools from "../../components/AdminTools";
export default {
	data() {
		return {
			content: {},
			id: this.$route.params.id,
			blog: {
				id: "",
				title: "",
				content: "",
				description: "",
			},
		};
	},
	created() {
		getSingle(this.id).then(res => {
			let result = res.data;
			for (let key in result.files) {
				this.blog["title"] = key;
				this.blog["content"] = this.$markdown(result.files[key]["content"]);
				this.blog["description"] = result["description"];
				this.blog["createTime"] = this.$util.utcToLocal(result["created_at"]);
				this.blog["updateTime"] = this.$util.utcToLocal(result["updated_at"]);
				// console.log(JSON.stringify(this.blog))
				break;
			}
		});
	},
	mounted() {},
	methods: {},
	computed: {
		...mapGetters(["token"]),
	},
	components: {
		AdminTools,
	},
};
</script>

<style scoped>
.container {
	max-width: 1440px;
	margin: 0 auto;
	height: auto !important;
	padding-top: 60px;
}

.article-content {
	border-radius: 4px;
	background-color: #fff;
	word-wrap: break-word;
	/* padding: 20px; */
}
.v-note-wrapper {
	z-index: 0;
}
</style>