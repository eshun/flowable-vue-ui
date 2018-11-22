import router, { asyncRouterMap, constantRouterMap, getExternalLink } from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { isExternal, childToParent } from '@/utils/'
import { getToken } from '@/utils/auth' // getToken from cookie
import checkPermission from '@/utils/permission' // getToken from cookie
import { getI18nTitle } from '@/utils/i18n'

NProgress.configure({ showSpinner: false })// NProgress Configuration

/**
 * 默认菜单的深度为两级
 * @param menus
 * @returns {Array}
 */
function getRouters(menus) {
  let allMenus = []
  const routers = []
  if (store.getters.allMenus.length === 0) {
    allMenus = constantRouterMap
    if (asyncRouterMap) {
      allMenus = allMenus.concat(asyncRouterMap)
    }
    store.dispatch('setAllMenus', allMenus)
  }
  allMenus = childToParent(allMenus)
  if (menus && menus.length > 0) {

    menus.forEach(menu => {
      if (menu.url && isExternal(menu.url)) {
        routers.push(getExternalLink(menu))
      } else {
        const temp = allMenus.filter(r => r.name === menu.name)
        if (menu.children) {
          menu.children.forEach(c => {
            temp.children = temp.children.concat(allMenus.filter(r => r.name === c.name))
          })
        }
        if (temp.length > 0) {
          const router = temp[0]
          if (router.parent) {
            const parent = router.parent
            delete router.parent
            const index = routers.findIndex(r => r.path === parent.path)
            if (index > -1) {
              if (routers[index].children) {
                routers[index].children.push(router)
              } else {
                routers[index].children = [router]
              }
            } else {
              routers.push({
                ...parent,
                children: [router]
              })
            }
          } else {
            routers.push(router)
          }
        }
      }
    })
  }
  return routers
}

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (!store.getters.appTitle) {
    store.dispatch('setAppTitle', document.title)
  }
  if (to.meta && to.meta.title) {
    document.title = getI18nTitle(to.meta.title) + '-' + store.getters.appTitle
  }
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.menus.length === 0) { // 判断当前用户是否已拉取菜单
        store.dispatch('getUserMenu').then(res => { // 拉取user_menu
          const menus = res.data // menu
          // 将返回的菜单转为路由表
          const routers = getRouters(menus)
          // console.log(routers)
          store.dispatch('setRoutes', routers).then(() => {
            router.addRoutes(routers) // 动态添加可访问路由表

            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      }
    }
  }
  /* has no token*/
  if (to.meta.anonymousAuthorize) { // 匿名访问
    next()
  } else {
    next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
