
import Layout from '@/views/layout/Layout'

const taskRouter = {
  path: '/flowable-task',
  component: Layout,
  name: 'flowable-task',
  redirect: '/flowable-task/index',
  children: [
    {
      path: 'myToDo',
      component: () => import('@/views/dashboard/index'),
      name: 'myToDo',
      alwaysShow: true,
      meta: { title: 'myToDo', icon: 'myToDo' }
    },
    {
      path: 'waitMeDo',
      component: () => import('@/views/flowable/index'),
      name: 'waitMeDo',
      meta: { title: 'waitMeDo', icon: 'waitMeDo' }
    },
    {
      path: 'taskAll',
      component: () => import('@/views/flowable/index'),
      name: 'taskAll',
      meta: { title: 'taskAll', icon: 'taskAll' }
    }
  ]
}
export default taskRouter
