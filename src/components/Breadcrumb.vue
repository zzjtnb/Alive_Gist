<!--  -->
<template>
	<div class="breadcrumbs">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: item.path }" v-for="item in this.breadcrumbs" v-if="item.title!== this.$route.meta.title">{{item.title}}</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: item.path }" v-for="item in this.breadcrumbs" v-if="item.title!== this.$route.meta.title">{{item.title}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script>
export default {
  data () {
    return {
      breadcrumbs: []
    }
  },
  mounted () {

  },
  created () {
    console.log(this.$route.meta.title)
    let data = {}
    for (const routeInfo of this.$route.matched) {
      // console.log(routeInfo);
      if (typeof routeInfo.meta.title === 'string' && routeInfo.meta.title !== 'home') {
        if (routeInfo.meta.title == this.$route.meta.title) {
          data.title = routeInfo.meta.title,
            this.breadcrumbs.push(data);
        } else {
          data.path = routeInfo.path
          data.title = routeInfo.meta.title,
            this.breadcrumbs.push(data);
        }
      }

    }

  },
  methods: {

  },
  components: {

  },
}
</script>

<style scoped>
.breadcrumbs {
	font-size: 13px;
	text-align: left;
	margin-bottom: 30px;
	margin-top: -30px;
	color: #999;
	padding: 0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.breadcrumbs a {
	color: #999;
}
</style>