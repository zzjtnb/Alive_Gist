import { get, post, put, patch } from '@/utils/request'
import store from '../store/index'
import base from './base';
export default {
  searchIssues: function (params) {
    let githubUsername = store.state.configuration.githubUsername
    return get(`${base.github}/search/issues`, params);
  },
}