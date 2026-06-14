// ============================================================
// Vue Router 路由配置文件
// ============================================================
// Vue Router 是 Vue.js 的官方路由管理器，用于构建单页应用(SPA)。
// 它允许我们定义路由规则，将 URL 路径映射到对应的 Vue 组件。
// ============================================================

import { createRouter, createWebHistory } from 'vue-router'

// 导入各个演示页面组件
// 使用动态导入 (lazy-loading) 来实现路由懒加载
// 懒加载的好处：只有当用户访问该路由时，才会加载对应的组件代码
// 这可以显著减少首屏加载时间，优化性能
import HomeView from '../views/HomeView.vue'

// 创建路由实例
const router = createRouter({
  // createWebHistory() 使用 HTML5 的 History API
  // URL 看起来像普通的路径，例如：/about
  // 另一种选择是 createWebHashHistory()，URL 会带 # 号，例如：/#/about
  history: createWebHistory(import.meta.env.BASE_URL),
  
  // routes 数组定义了所有的路由规则
  routes: [
    {
      // 路由路径 - 当 URL 匹配此路径时，渲染对应的组件
      path: '/',
      // 路由名称 - 可以用 name 来进行路由导航，比路径更灵活
      name: 'home',
      // 路由对应的组件
      component: HomeView,
      // 路由元信息 - 可以附加自定义数据，常用于页面标题、权限控制等
      meta: { 
        title: '首页 - Vue 学习指南',
        description: 'Vue 3 核心功能教学首页'
      }
    },
    {
      path: '/reactivity',
      name: 'reactivity',
      // 路由懒加载 - 使用 import() 动态导入
      // Webpack/Vite 会将懒加载的组件打包成单独的 chunk 文件
      component: () => import('../views/ReactivityDemo.vue'),
      meta: { title: '响应式系统 - Vue 学习指南' }
    },
    {
      path: '/computed-watch',
      name: 'computedWatch',
      component: () => import('../views/ComputedWatchDemo.vue'),
      meta: { title: '计算属性与侦听器 - Vue 学习指南' }
    },
    {
      path: '/component',
      name: 'component',
      component: () => import('../views/ComponentDemo.vue'),
      meta: { title: '组件通信 - Vue 学习指南' }
    },
    {
      path: '/directive',
      name: 'directive',
      component: () => import('../views/DirectiveDemo.vue'),
      meta: { title: '自定义指令 - Vue 学习指南' }
    },
    {
      path: '/router-demo',
      name: 'routerDemo',
      component: () => import('../views/RouterDemo.vue'),
      meta: { title: '路由功能 - Vue 学习指南' }
    },
    {
      path: '/store',
      name: 'store',
      component: () => import('../views/StoreDemo.vue'),
      meta: { title: '状态管理 - Vue 学习指南' }
    },
    {
      path: '/composable',
      name: 'composable',
      component: () => import('../views/ComposableDemo.vue'),
      meta: { title: '组合式函数 - Vue 学习指南' }
    },
    {
      path: '/transition',
      name: 'transition',
      component: () => import('../views/TransitionDemo.vue'),
      meta: { title: '过渡动画 - Vue 学习指南' }
    },
    {
      path: '/slot',
      name: 'slot',
      component: () => import('../views/SlotDemo.vue'),
      meta: { title: '插槽 - Vue 学习指南' }
    },
    {
      // 动态路由参数 - 使用 :id 定义动态段
      // 例如：/user/123 中，id 的值为 123
      path: '/user/:id',
      name: 'user',
      component: () => import('../views/UserView.vue'),
      meta: { title: '用户详情 - Vue 学习指南' },
      // props: true 表示将路由参数作为 props 传递给组件
      // 这是一种推荐的做法，使组件与路由解耦，更易于测试和复用
      props: true
    },
    {
      // 嵌套路由 - 使用 children 定义子路由
      path: '/nested',
      name: 'nested',
      component: () => import('../views/NestedRouteView.vue'),
      meta: { title: '嵌套路由 - Vue 学习指南' },
      children: [
        {
          // 子路由的路径 - 注意不以 / 开头
          // 完整路径为 /nested/profile
          path: 'profile',
          name: 'nestedProfile',
          component: () => import('../views/nested/ProfileView.vue'),
          meta: { title: '个人资料 - 嵌套路由' }
        },
        {
          path: 'settings',
          name: 'nestedSettings',
          component: () => import('../views/nested/SettingsView.vue'),
          meta: { title: '设置 - 嵌套路由' }
        }
      ]
    },
    {
      // 404 路由 - 匹配所有未定义的路径
      // :pathMatch(.*)* 是 Vue Router 4 的写法，匹配任意路径
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFoundView.vue'),
      meta: { title: '页面未找到 - Vue 学习指南' }
    }
  ],

  // 全局滚动行为 - 控制路由切换时的滚动位置
  // to: 目标路由, from: 来源路由, savedPosition: 浏览器前进/后退时的保存位置
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（浏览器前进/后退），则恢复到该位置
    if (savedPosition) {
      return savedPosition
    }
    // 否则滚动到页面顶部
    return { top: 0 }
  }
})

// ============================================================
// 全局路由守卫 (Navigation Guards)
// ============================================================
// 路由守卫允许我们在路由跳转前后执行逻辑
// 常用于：权限验证、数据预加载、页面标题设置等

// 全局前置守卫 - 在每次路由跳转前执行
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 必须调用 next() 来继续导航
  // next() - 允许导航
  // next(false) - 中止导航
  // next('/path') - 重定向到其他路径
  next()
})

// 全局后置钩子 - 在导航完成后执行
// 与守卫不同，后置钩子不会接收 next 函数，也无法改变导航
router.afterEach((to, from) => {
  // 可以在这里做一些分析追踪，例如记录页面访问
  console.log(`路由跳转: ${from.path} -> ${to.path}`)
})

export default router