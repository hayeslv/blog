/*
 * @Author: Lvhz
 * @Date: 2021-09-03 11:07:30
 * @Description: 图表组件
 */
import Layout from '@/layout'

const componentsRouter = {
  path: '/chart-comp',
  component: Layout,
  name: 'ChartComp',
  meta: {
    title: '图表组件',
    icon: 'chart'
  },
  children: [
    {
      path: 'column',
      component: () => import('@/views/Chart/Column'),
      name: 'Column',
      meta: { title: '柱状图' }
    },
    {
      path: 'css-effect',
      component: () => import('@/views/Component/CSSEffect'),
      name: 'UploadBigFile1',
      meta: { title: 'css样式' }
    },
  ]
}

export default componentsRouter