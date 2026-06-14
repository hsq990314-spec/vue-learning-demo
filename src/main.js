// ============================================================
// 应用入口文件 main.js
// ============================================================
// 职责：
// 1. 创建 Vue 应用实例
// 2. 安装插件（Router、Pinia）
// 3. 挂载到 DOM
// ============================================================

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

// 创建 Vue 应用实例
const app = createApp(App)

// 安装 Pinia 状态管理插件
// Pinia 是 Vue 3 官方推荐的状态管理库
app.use(createPinia())

// 安装 Vue Router 路由插件
// Router 实现单页应用（SPA）的页面切换
app.use(router)

// 挂载应用到 #app 元素
app.mount('#app')