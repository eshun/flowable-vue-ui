import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * name 值唯一
 * hidden: true              隐藏
 * alwaysShow: true          菜单栏默认显示
 * anonymousAuthorize: true  允许匿名访问
 */
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    anonymousAuthorize: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    anonymousAuthorize: true,
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    anonymousAuthorize: true,
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    anonymousAuthorize: true,
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    anonymousAuthorize: true,
    hidden: true
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
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true },
        alwaysShow: true
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'documentation'
      }
    ]
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
