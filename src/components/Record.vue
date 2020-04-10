<!--  -->
<template>
	<div>记录页面</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	mounted() {
		/**
      //可以将json字符串转换成json对象
      JSON.parse(jsonstr);
      //可以将json对象转换成json对符串
      JSON.stringify(jsonobj);
       */
		/**
		 * Object.assign方法用于对象的合并，将源对象（ source ）的所有可枚举属性，复制到目标对象（ target ）
		 */
		// let para = Object.assign({}, res);
		/**
		 * JSON.parse() 方法用于将一个 JSON 字符串转换为对象。。
		 */
		// JSON.parse(res);
		/**
		 * JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。
		 */
		// JSON.stringify(res);
		// var target = { a: 1 };
		// var source1 = { b: 2 };
		// var source2 = { c: 3 };
		// Object.assign(target, source1, source2);
		// target // {a:1, b:2, c:3}
		/**
		 * let para = Object.assign({}, this.editForm);
		 * var ids = this.sels.map(item => item.id).toString();
		 * var ids = this.sels.map(item => item.id).join()//获取所有选中行的id组成的字符串，以逗号分隔
		 */
		// console.log(res)
	},
	methods: {},
	components: {},
};
</script>

<style scoped>
@import "/css/global";
</style>