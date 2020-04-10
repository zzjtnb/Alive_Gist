const common = {
  // 多个 state 的操作 , 使用 mutations 会来触发会比较好维护 , 那么需要执行多个 mutations 就需要用 action 了
  // 通过 store.state 来获取状态对象，以及通过 store.commit 方法触发状态变更
  state: {
    networkSuccess: true,
    Mobile: true,
    ShowSideBar: false,
    xianhua_num: 0,
    dianzhu_num: 0,
    jingjiu_num: 0,
    jingli_num: 0,
    jugong_num: 0,
    searchValue: '',
  },
  // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
  mutations: {
    NOT_NETWORK: (state, value) => {//这里的state对应着上面这个state
      state.networkSuccess = value
    },
    IS_Mobile: (state, value) => {
      state.Mobile = value
    },
    SET_HEROESRECORD: (state, heroseRecord) => {
      state.xianhua_num = heroseRecord.xianhua_num;
      state.dianzhu_num = heroseRecord.dianzhu_num;
      state.jingjiu_num = heroseRecord.jingjiu_num;
      state.jingli_num = heroseRecord.jingli_num;
      state.jugong_num = heroseRecord.jugong_num;
    },
    IsSideBar: (state, value) => {
      state.ShowSideBar = value
    },
    SET_SEARCHVALUE: (state, value) => {
      state.searchValue = value
    }

  },

  /**
    Action 类似于 mutation，不同在于：
      Action 提交的是 mutation，而不是直接变更状态。
      Action 可以包含任意异步操作。
   */
  // dispactch方法调用action,mapAactions方法调用action
  actions: {
    ChangeNetwork ({ commit }, value) {
      commit('NOT_NETWORK', value)
    },
    Mobile ({ commit }, value) {
      commit("IS_Mobile", value)
    },
    ShowSide ({ commit }, value) {
      commit("IsSideBar", value)
    },
    LocalReload ({ commit }, heroseRecord) {
      commit('SET_HEROESRECORD', heroseRecord)
    },
    SetSearchValue ({ commit }, value) {
      commit('SET_SEARCHVALUE', value)
    }
  }
}

export default common