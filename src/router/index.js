import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
import modelerRouter from './modules/flowable-modeler'
import idmRouter from './modules/flowable-idm'

/**
 * name 值唯一
 * alwaysShow: true          菜单栏默认显示
 * anonymousAuthorize: true  允许匿名访问
 */
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hide: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    hide: true,
    component: () => import('@/views/login/index'),
    meta: { name: 'login', anonymousAuthorize: true }
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    meta: { title: 'auth-redirect', anonymousAuthorize: true }
  },
  {
    path: '/404',
    name: '404',
    hide: true,
    component: () => import('@/views/errorPage/404'),
    meta: { title: '404', anonymousAuthorize: true }
  },
  {
    path: '/401',
    name: '401',
    hide: true,
    component: () => import('@/views/errorPage/401'),
    meta: { title: '401', anonymousAuthorize: true }
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        alwaysShow: true,
        meta: { title: 'dashboard', icon: 'dashboard' }
      }
    ]
  },

  modelerRouter,

  idmRouter,

  {
    path: '*',
    redirect: '/404',
    hide: true
  }
]

/**
 * 外部链接路由
 * @param menu
 * @returns {{path: string, component, children: *[]}}
 */
export function getExternalLink(menu) {
  return {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: menu.url,
        name: menu.name,
        meta: { title: menu.name, icon: menu.icon || 'link' }
      }
    ]
  }
}

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = []
