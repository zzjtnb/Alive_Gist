import request from '@/utils/request'
import store from '../store/index'
export default {
  //   获取系统设置
  getBlogConfigure: function () {
    let githubUsername = store.state.configuration.githubUsername
    return request({
      url:
        '/repos/' +
        githubUsername +
        '/' +
        // 用xxx.github.io为项目地址时的请求地址
        // githubUsername +
        // '.github.io/contents/static/configuration.json'
        'zzjt-pc/contents/static/configuration.json'
    })
  },
  //   更改系统设置
  editBlogConfigure: function (configure, sha) {
    let content = JSON.stringify(configure)
    let githubUsername = store.state.configuration.githubUsername
    return request({
      url:
        '/repos/' +
        githubUsername +
        '/' +
        // githubUsername +
        // '.github.io/contents/static/configuration.json',
        'zzjt-pc/contents/static/configuration.json',
      method: 'PUT',
      data: {
        message: 'a',
        content: require('js-base64').Base64.encode(content),
        sha: sha
      }
    })
  },
}