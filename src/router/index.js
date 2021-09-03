/* eslint-disable no-unused-vars */
/*
 * @Author: Lvhz
 * @Date: 2021-08-17 10:32:13
 * @Description: Description
 */
import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout'
/* Router Modules */
import componentsRouter from './modules/components'
import chartRouter from './modules/chart'

// 图表路由
const chartTypeRouteList = [
  {
    path: '/chart/column',
    component: () => import('@views/Chart/Column/index.vue'),
    meta: {
      type: 'chart',
      title: '柱状图',
      icon: 'el-icon-s-data'
    }
  },
  {
    path: '/chart/line',
    component: () => import('@views/Chart/Line/index.vue'),
    meta: {
      type: 'chart',
      title: '折线图',
      icon: 'el-icon-s-marketing'
    }
  },
  {
    path: '/chart/pie',
    component: () => import('@views/Chart/Pie/index.vue'),
    meta: {
      type: 'chart',
      title: '饼图',
      icon: 'el-icon-pie-chart'
    }
  },
  {
    path: '/chart/other',
    component: () => import('@views/Chart/Other/index.vue'),
    meta: {
      type: 'chart',
      title: '其他图'
    }
  }
];

// 规范路由
const standardTypeRouteList = [
  {
    path: '/standard/chart-standard',
    component: () => import('@views/Standard/ChartStandard/index.vue'),
    meta: {
      type: 'standard',
      title: '可视化图表规范',
      icon: 'el-icon-pie-chart'
    }
  }
];

// 组件路由
const componentTypeRouteList = [
  {
    path: '/component/upload',
    component: () => import('@views/Component/Upload'),
    meta: {
      type: 'component',
      title: '文件上传',
      icon: 'el-icon-upload'
    }
  },
  {
    path: '/component/upload-big-file',
    component: () => import('@views/Component/UploadBigFile'),
    meta: {
      type: 'component',
      title: '大文件上传',
      icon: 'el-icon-upload'
    }
  },
  {
    path: '/component/css-effect',
    component: () => import('@views/Component/CSSEffect'),
    meta: {
      type: 'component',
      title: 'CSS效果',
      icon: 'el-icon-lollipop'
    }
  }
];

// 通用路由
export const commonRouteList = [
  {
    path: '/:pathMatch(.*)',
    redirect: '/chart/column'
  }
];

/**
 * constantRoutes
 * 基础路由，不需要任何权限
 * 所有角色都可以访问
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        name: 'Home',
        path: 'home',
        component: () => import('@/views/home'),
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ],
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  componentsRouter,
  chartRouter,
]

export const routes = [
  // ...chartTypeRouteList,
  // ...standardTypeRouteList,
  // ...componentTypeRouteList,
  // ...commonRouteList,
  ...constantRoutes
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
