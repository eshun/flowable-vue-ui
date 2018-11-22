import store from '@/store'
import { childToParent } from './index'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(to) {
  if (to && to.path) {
    const permission_routers = store.getters && store.getters.permission_routers
    // const routers = childToParent(permission_routers)
    //
    // const hasPermission = routers.some(router => router.path === to.path)
    //
    // console.log(hasPermission,routers,to)
    // if (hasPermission) {
    //   return true
    // }
  }
  return false
}
