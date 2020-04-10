const getters = {
    /**
     * search
     */
    SearchValue: state => state.common.searchValue,
    /**
     * Gist
     */
    Query: state => state.gist.query,
    /**
     * 显示隐藏
     */
    networkSuccess: state => state.common.networkSuccess,
    Mobile: state => state.common.Mobile,
    showSide: state => state.common.ShowSideBar,
    token: state => state.token.token,
    /**
     * Record
     */
    xianhua_num: state => state.common.xianhua_num,
    dianzhu_num: state => state.common.dianzhu_num,
    jingjiu_num: state => state.common.jingjiu_num,
    jingli_num: state => state.common.jingli_num,
    jugong_num: state => state.common.jugong_num,
}
export default getters
