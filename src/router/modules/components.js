/*
 * @Author: Lvhz
 * @Date: 2021-09-01 14:23:57
 * @Description: Description
 */
import Layout from '@/layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  name: 'ComponentDemo',
  meta: {
    title: '组件',
    icon: 'component'
  },
  children: [
    {
      path: 'upload-big-file',
      component: () => import('@/views/Component/UploadBigFile'),
      name: 'UploadBigFile',
      meta: { title: '大文件上传' }
    },
    {
      path: 'css-effect',
      component: () => import('@/views/Component/CSSEffect'),
      name: 'CssEffect',
      meta: { title: 'css样式' }
    },
    {
      path: 'elec-signature',
      component: () => import('@/views/Component/Signature'),
      name: 'Signature',
      meta: { title: '电子签名' }
    },
  ]
}

export default componentsRouter