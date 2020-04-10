import Vue from 'vue'
import Vuex from 'vuex'
import token from './modules/token'//引入store(仓库)token(初始state对象)
import common from './modules/common'//引入store(仓库)token(初始state对象)
import gist from './modules/gist'//引入store(仓库)token(初始state对象)
import configuration from './modules/configuration'
import getters from './getters'

// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    configuration,
    token,
    common,
    gist
  },
  getters
})
