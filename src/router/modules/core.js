/*
 * @Author: Lvhz
 * @Date: 2021-09-01 14:23:57
 * @Description: 手写核心代码
 */
import Layout from '@/layout'

const componentsRouter = {
  path: '/core',
  component: Layout,
  name: 'CoreCode',
  meta: {
    title: '手写',
    icon: 'component'
  },
  children: [
    {
      path: 'promise',
      component: () => import('@/views/Core/Promise'),
      name: 'Promise',
      meta: { title: 'Promise' }
    }
  ]
}

export default componentsRouter