// 每个模块都应该有自己的接口文件去统一管理api
import { GET, PATCH } from '@/utils/request'
import store from '../store/index'
let githubUsername = store.state.configuration.githubUsername
// 导入接口域名列表
import base from './base';
export const getRecode = (params) => GET(`${base.github}/gists/a193f478c74560badd46cb3e0864802f`, params)
export const editRecode = (data, headers) => PATCH(`${base.github}/gists/a193f478c74560badd46cb3e0864802f`, data, headers)
