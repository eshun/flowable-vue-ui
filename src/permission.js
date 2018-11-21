import router, { asyncRouterMap, constantRouterMap, getExternalLink } from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { isExternal } from '@/utils/'
import { getToken } from '@/utils/auth' // getToken from cookie
import { generateTitle } from '@/utils/i18n'

NProgress.configure({ showSpinner: false })// NProgress Configuration

function hasPermission(roles, permissionRoles) {
  return true
}

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

  if (menus && menus.length > 0) {
    menus.forEach(menu => {
      if (menu.url && isExternal(menu.url)) {
        routers.push(getExternalLink(menu))
      } else {
        // if (menu.children) {
        //   // ttt
        //   const temp = allMenus.filter(r => r.name === menu.name)
        //   let tempChilds = []
        //   if (temp && temp.length === 1) {
        //     menu.children.forEach(c => {
        //       const child = temp[0].children.filter(r => r.name === c.name)
        //       tempChilds = tempChilds.concat(child)
        //     })
        //     temp[0].children = tempChilds
        //     routers.push(temp[0])
        //   }
        // } else {
        //   allMenus.forEach(r => {
        //     if (r.children && r.children.length > 0) {
        //       const temp = r.children.filter(c => c.name === menu.name)
        //       if (temp) {
        //         routers.push({
        //           r,
        //           children: temp[0]
        //         })
        //       }
        //     }
        //   })
        // }
      }
    })
  }

  console.log(menus, routers)
  return routers
}

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (!store.getters.appTitle) {
    store.dispatch('setAppTitle', document.title)
  }
  if (to.meta && to.meta.title) {
    // document.title = generateTitle(to.meta.title) + '-' + store.getters.appTitle
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
            router.addRoutes(asyncRouterMap) // 动态添加可访问路由表

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
      } else {
        // 判断访问的页面是否存在路由表中
        next()
      }
    }
  } else {
    /* has no token*/
    if (to.meta.anonymousAuthorize) { // 匿名访问
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
