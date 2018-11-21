import router, { constantRouterMap, getExternalLink, objectMerge } from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { isExternal } from '@/utils/'
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

function hasPermission(roles, permissionRoles) {
  return true
}

/**
 * alwaysShow
 * @returns {Array}
 */
function getDefaultRouters() {
  const routers = []
  constantRouterMap.forEach(r => {
    if (r.alwaysShow) {
      routers.push(r)
    } else {
      if (r.children) {
        const child = r.children.filter(c => c.alwaysShow)
        if (child && child.length > 0) {
          r.children = child
          routers.push(r)
        }
      }
    }
  })
  return routers
}

/**
 * 默认菜单的深度为两级
 * @param menus
 * @returns {Array}
 */
function getRouters(menus) {
  const routers = getDefaultRouters()
  if (menus && menus.length > 0) {
    menus.forEach(menu => {
      if (menu.url && isExternal(menu.url)) {
        routers.push(getExternalLink(menu))
      } else {
        // constantRouterMap.filter(router => )
        // objectMerge()
        // if(menus.name==)
        const temp = {}
        constantRouterMap.forEach(router => {
          if (menus.name === router.name) {
            // temp
          } else {
            if (router.children) {
              // ttt
            }
          }
        })
        if (menu.children) {
          // ttt
        }
      }
    })
  }
  return routers
}

const whiteList = ['/login', '/auth-redirect']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
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
          // console.log(menus)
          const routers = getRouters(menus)
          console.log(routers)
          store.dispatch('setRoutes', routers).then(() => {
            // router.addRoutes(routers) // 动态添加可访问路由表

            // 判断访问的页面是否存在路由表中
            // hasPermission("", "")
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
        // store.dispatch('GetUserInfo').then(res => { // 拉取user_info
        //   const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
        //   store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
        //
        //
        //   })
        // }).catch((err) => {
        //   store.dispatch('FedLogOut').then(() => {
        //     Message.error(err || 'Verification failed, please login again')
        //     next({ path: '/' })
        //   })
        // })
      } else {
        // 判断访问的页面是否存在路由表中
        next()
      }
    }
  } else {
    /* has no token*/
    // to.anonymousAuthorize  允许匿名访问

    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
