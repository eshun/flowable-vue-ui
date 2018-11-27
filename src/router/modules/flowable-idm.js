
import Layout from '@/views/layout/Layout'

const idmRouter = {
  path: '/flowable-idm',
  component: Layout,
  name: 'flowable-idm',
  redirect: '/flowable-idm/user-mgmt',
  children: [
    {
      path: 'user-mgmt',
      component: () => import('@/views/flowable/index'),
      name: 'user-mgmt',
      meta: { title: 'user-mgmt', icon: 'user', root: 'idm', page: 'user-mgmt' }
    },
    {
      path: 'group-mgmt',
      component: () => import('@/views/flowable/index'),
      name: 'group-mgmt',
      meta: { title: 'group-mgmt', icon: 'peoples', root: 'idm', page: 'group-mgmt' }
    },
    {
      path: 'privilege-mgmt',
      component: () => import('@/views/flowable/index'),
      name: 'privilege-mgmt',
      meta: { title: 'privilege-mgmt', icon: 'lock', root: 'idm', page: 'privilege-mgmt' }
    }
  ]
}
export default idmRouter
