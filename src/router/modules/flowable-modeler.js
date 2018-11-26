
import Layout from '@/views/layout/Layout'

const modelerRouter = {
  path: '/flowable-modeler',
  component: Layout,
  name: 'flowable-modeler',
  redirect: '/flowable-modeler/processes',
  children: [
    {
      path: 'processes',
      component: () => import('@/views/flowable/index'),
      name: 'processes',
      alwaysShow: true,
      meta: { title: 'processes', icon: 'tree', root: 'modeler', page: 'processes' }
    },
    {
      path: 'casemodels',
      component: () => import('@/views/flowable/index'),
      name: 'casemodels',
      alwaysShow: true,
      meta: { title: 'casemodels', icon: 'example', root: 'modeler', page: 'casemodels' }
    },
    {
      path: 'forms',
      component: () => import('@/views/flowable/index'),
      name: 'forms',
      alwaysShow: true,
      meta: { title: 'forms', icon: 'form', root: 'modeler', page: 'forms' }
    },
    {
      path: 'decision-tables',
      component: () => import('@/views/flowable/index'),
      name: 'decision-tables',
      alwaysShow: true,
      meta: { title: 'decision-tables', icon: 'guide', root: 'modeler', page: 'decision-tables' }
    },
    {
      path: 'apps',
      component: () => import('@/views/flowable/index'),
      name: 'apps',
      alwaysShow: true,
      meta: { title: 'apps', icon: 'star', root: 'modeler', page: 'apps' }
    }
  ]
}
export default modelerRouter
