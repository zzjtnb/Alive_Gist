import Vue from 'vue'
import store from '../store/index'
import VueRouter from 'vue-router'
import Layout from '../views/layout/Layout'

Vue.use(VueRouter)

export const constantRouterMap = [
  {
    path: '/blog',
    redirect: '/blog/main',
    component: Layout,
    meta: {
      title: '个人博客',
      submenu: true
    },
    children: [
      {
        path: '/blog/main',
        component: () => import('../views/blog/Main.vue'),
        meta: {
          title: '博客列表',
        }
      },
      {
        path: '/blog/details/:id',
        component: () => import('../views/blog/Details.vue'),
        meta: {
          title: '博客详情',
        }
      },
      {
        path: '/blog/edit/:id',
        component: () => import('../views/blog/Edit.vue'),
        meta: {
          title: '编辑博客',
        }
      },
      {
        path: '/blog/add',
        component: () => import('../views/blog/Add.vue'),
        meta: {
          title: '发表博客',
          LoginRequired: true,
        }
      },
    ]
  },
  {
    path: '/worshipheroes',
    component: Layout,
    meta: {
      title: '祭拜英烈',
    },
    children: [
      {
        path: '/worshipheroes',
        component: () => import('../views/WorshipHeroes.vue'),
      }
    ]
  },
  // {
  //   path: '/managelabels',
  //   component: Layout,
  //   LoginRequired: true,
  //   meta: {
  //     title: '管理标签',
  //   },
  //   children: [
  //     {
  //       path: '/managelabels',
  //       component: () => import('../views/Labels/manageLabels.vue'),
  //       meta: {
  //         LoginRequired: true,
  //       }
  //     }
  //   ]
  // },
  {
    path: '/record',
    component: Layout,
    LoginRequired: true,
    meta: {
      title: '记录',
    },
    children: [
      {
        path: '/record',
        component: () => import('../components/Record.vue'),

      }
    ]
  },
  {
    path: '/search',
    redirect: '/search',
    component: Layout,
    show: true,
    meta: {
      title: '搜索结果',
    },
    children: [
      {
        path: '/search',
        component: () => import('../components/Search.vue'),
      }
    ]
  },
  {
    path: '/login',
    redirect: '/user',
    component: Layout,
    show: true,
    children: [
      {
        path: '/user',
        component: () => import(/* webpackChunkName: "about" */ '../views/user/Index.vue'),
      },
    ]
  },
  {
    path: '/notnetwork',
    name: 'NotNetwork',
    component: () => import('../components/NotNetwork.vue'),
  },
  {
    path: '/refresh',
    name: 'refresh',
    component: () => import('../components/Refresh.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../components/404.vue')
  },
  {
    path: '/',
    redirect: '/blog/main'
  },
  {
    path: '*',
    redirect: '/404'
  },

]

const router = new VueRouter({
  mode: 'history',
  routes: constantRouterMap,
})
// 拦截登录，token验证
router.beforeEach((to, from, next) => {
  let token = store.state.token.token
  Vue.prototype.$setTitle(to.meta.title)
  let login = router.options.routes
  if (!token) {
    next()
    if (!to.meta.LoginRequired) {
      next()
    } else {
      next(router.back())
    }
  } else {
    for (const key in login) {
      if (login.hasOwnProperty(key)) {
        const element = login[key];
        if (element.LoginRequired !== undefined) {
          element.LoginRequired = false
        }
      }
    }
    next()
  }
  // if (token) {
  //   for (const key in login) {
  //     if (login.hasOwnProperty(key)) {
  //       const element = login[key];
  //       if (element.LoginRequired !== undefined) {
  //         element.LoginRequired = false
  //       }
  //     }
  //   }
  //   next()
  // } else {
  //   if (!to.meta.LoginRequired) {
  //     next()
  //   } else {
  //     next(router.back())
  //   }
  // }

})
export default router
