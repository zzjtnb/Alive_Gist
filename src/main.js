import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import util from './utils/util'
import 'normalize.css'
import 'material-design-icons/iconfont/material-icons.css'
// 按需引入
import {
  Form, FormItem, Card, Button, Input, MessageBox, Message, Loading, Tag, Row, Col, Breadcrumb, BreadcrumbItem, Upload, Dialog, Pagination, ColorPicker, Table, TableColumn, Popover, Switch,
} from 'element-ui'
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Card);
Vue.use(Button);
Vue.use(Input);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Upload);
Vue.use(Dialog);
/**
 * Message不要用使用use引入,这样会在页面加载后没有进行任何操作，但是会自动弹出一次空的通知框
 * Vue.use(Message);
 */
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.use(Loading.directive);
Vue.use(Tag);
Vue.use(Row);
Vue.use(Col);
Vue.use(Pagination);
Vue.use(ColorPicker);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Popover);
Vue.use(Switch);
/**
 * fastClick的300ms延迟
 */
import FastClick from 'fastclick'; // 引入插件
FastClick.attach(document.body); // 使用 fastclick

Vue.prototype.$util = util;
Vue.config.productionTip = false

/**
 * mavonEditor
 */
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
Vue.use(mavonEditor);

Vue.prototype.$reload = function (context) {
  let NewPage = '/empty'
  context.$router.push(NewPage)
  context.$nextTick(() => (context.$router.go(-1)))
}

Vue.prototype.$markdown = function (value) {
  return mavonEditor.markdownIt.render(value)
}
/**
 * 设置title
 */
Vue.prototype.$setTitle = function (title) {
  if (title) {
    document.title = store.state.configuration.htmlTitle + ' - ' + title
  } else {
    document.title = store.state.configuration.htmlTitle
  }
}
/**
 * 分享文章
 */
Vue.prototype.$share = function (message) {
  if (!message) {
    message = window.location
  } else {
    // let arr = (window.location + '').split('#')
    // message = arr[0] + '#' + message
    message = window.location.origin + message
  }
  if (util.copy(message)) {
    Vue.prototype.$confirm('链接已复制,去分享给好友吧!!', '分享', {
      showCancelButton: false,
      showClose: false,
      type: 'success'
    })
  } else {
    Vue.prototype.$confirm('链接复制失败,可能因为浏览器不兼容', '分享', {
      showCancelButton: false,
      showClose: false,
      type: 'warning'
    })
  }
}
//为文章详情添加代码高亮
Vue.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
