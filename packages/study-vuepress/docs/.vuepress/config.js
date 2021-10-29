/*
 * @Author: Lvhz
 * @Date: 2021-10-29 16:15:45
 * @Description: Description
 */
module.exports = {
  title: 'dylan\'s blog',
  description: '组件文档',
  // head: [ // 注入到当前页面的 HTML <head> 中的标签
  //   // ['link', { rel: 'icon', href: '../' }] // 增加一个自定义的 favicon(网页标签的图标)
  // ],
  // base: '/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  // actionText: '123123',
  themeConfig: {
    nav:[ // 导航栏配置
      {text: '算法', link: '/algorithm/base-栈' },
      // 显示下拉列表
      {
        text: 'Languages',
        items: [
          { text: 'Chinese', link: '/language/chinese' },
          { text: 'Japanese', link: '/language/japanese' }
        ]
      },
      // 下拉列表显示分组
      {
        text: '高级',
        items: [
          { 
            text: '算法', 
            items: [
              { text: '冒泡', link: '/language/chinese' },
              { text: '快速', link: '/language/japanese' }
            ] 
          },
          { 
            text: '设计模式', 
            items: [
              { text: '工厂', link: '/language/chinese' },
              { text: '单例', link: '/language/chinese'},
            ] 
          },
        ]
      }
    ],
    // sidebar: 'auto', // 侧边栏配置
    sidebar: [
      {
        title: '数据结构',
        collapsable: false,
        children: [
          '/algorithm/base-栈'
        ]
      },
      {
        title: '插件使用',
        collapsable: false,
        children: [
          '/pluginUse/a'
        ]
      }
    ],
    sidebarDepth: 0, // 侧边栏显示2级
  }
}