import { GET } from '@/utils/request'
import store from '../store/index'
import base from './base';
export default {
  searchIssues: function (params) {
    let githubUsername = store.state.configuration.githubUsername
    return GET(`${base.github}/search/issues`, params);
  },
}