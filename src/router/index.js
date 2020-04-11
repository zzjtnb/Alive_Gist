import Vue from 'vue'
import store from '../store/index'
import VueRouter from 'vue-router'
import Layout from '../views/layout/Layout'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/blog',
    redirect: '/blog/index',
    component: Layout,
    meta: {
      title: '个人博客',
      submenu: true
    },
    children: [
      {
        path: 'index',
        component: () => import('../views/blog/Main.vue'),
        meta: {
          // title: '博客列表',
        }
      },
      {
        path: 'details/:id',
        component: () => import('../views/blog/Details.vue'),
        meta: {
          title: '博客详情',
        }
      },
      {
        path: 'edit/:id',
        component: () => import('../views/blog/Edit.vue'),
        meta: {
          title: '编辑博客',
        }
      },
      {
        path: 'add',
        component: () => import('../views/blog/Add.vue'),
        meta: {
          title: '发表博客',
          requiresAuth: true,
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
        meta: {
          title: '祭拜英烈',
        },
      }
    ]
  },
  {
    path: '/record',
    component: Layout,
    requiresAuth: true,
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
    children: [
      {
        path: '/search',
        component: () => import(/* webpackChunkName: "about" */ '../components/Search.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/user/Index.vue'),
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
    redirect: '/blog/index'
  },
  {
    path: '*',
    redirect: '/404'
  },

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

/**
 * beforeEach  拦截登录，token验证
 */
router.beforeEach((to, from, next) => {
  let token = store.state.token.token
  Vue.prototype.$setTitle(to.meta.title)
  let login = router.options.routes
  if (!token) {// 判断当前的token是否存在
    if (!to.meta.requiresAuth) {//layout下面的
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    login.forEach(item => {
      if (item.requiresAuth !== undefined) {
        item.requiresAuth = false
      }
    });
    next()
  }
})

export default router
