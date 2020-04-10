<!--  -->
<template>
	<div class="tab-pane fade in" v-show="signup">
		<form class="mb-0">
			<!-- <userNav /> -->
			<div class="form-group">
				<input type="text" class="form-control" name="user_name" placeholder="输入英文用户名" />
			</div>
			<!-- .form-group end -->
			<div class="form-group">
				<input type="email" class="form-control" name="user_email" placeholder="绑定邮箱" />
			</div>
			<!-- .form-group end -->
			<div class="form-group">
				<input type="password" class="form-control" name="user_pass" placeholder="密码最小长度为6" />
			</div>
			<div class="form-group">
				<input type="password" class="form-control" name="user_pass2" placeholder="再次输入密码" />
			</div>
			<div class="form-group">
				<div class="input-group">
					<input type="text" class="form-control" name="captcha" placeholder="邮箱验证码" />
					<span class="input-group-btn">
						<button class="go-captcha_email btn btn--secondary" type="button">发送验证码</button>
					</span>
				</div>
			</div>
			<button type="button" class="btn btn--primary btn--block">
				<i class="fa fa-bullseye"></i> 立即注册
			</button>
		</form>
		<!-- form  end -->
	</div>
</template>

<script>
import userNav from './userNav';
export default {
  props: {
    signup: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  },
  components: {
    userNav
  },
}
</script>

<style scoped>
.input-group {
	position: relative;
	display: table;
	border-collapse: separate;
}
.input-group .form-control {
	position: relative;
	z-index: 2;
	float: left;
	width: 100%;
	margin-bottom: 0;
}
.input-group-btn {
	display: table-cell;
	width: 1%;
	white-space: nowrap;
	vertical-align: middle;
}
</style>