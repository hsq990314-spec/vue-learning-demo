<!-- ============================================================
     首页 - Vue 3 学习指南
     ============================================================
     本页面作为项目的首页，展示所有学习模块的导航入口。
     主要演示的 Vue 功能：
     - 模板语法（插值表达式、v-bind、v-for）
     - 响应式数据（ref）
     - 组件组合
     ============================================================ -->

<template>
  <div class="home">
    <!-- 英雄区域 - 使用 v-bind 动态绑定样式 -->
    <section class="hero" :style="{ background: gradientBg }">
      <h1>🌿 Vue 3 学习指南</h1>
      <p class="subtitle">从基础到进阶，全面掌握 Vue 3 核心功能</p>
      <!-- 使用插值表达式显示响应式数据 -->
      <p class="stats">共 {{ modules.length }} 个学习模块 | Vue {{ vueVersion }}</p>
    </section>

    <!-- 模块导航卡片 - 使用 v-for 列表渲染 -->
    <section class="modules">
      <h2>📚 学习模块</h2>
      <div class="module-grid">
        <!-- 
          v-for 指令：遍历数组渲染列表
          :key 是必须的，帮助 Vue 高效地更新虚拟 DOM
          建议使用唯一标识符作为 key，而不是数组索引
        -->
        <router-link
          v-for="module in modules"
          :key="module.name"
          :to="module.path"
          class="module-card"
          :class="{ 'module-card--highlight': module.highlight }"
        >
          <!-- 动态绑定 class - 对象语法 -->
          <span class="module-icon">{{ module.icon }}</span>
          <h3>{{ module.name }}</h3>
          <p>{{ module.description }}</p>
          <!-- v-if 条件渲染 - 只有 highlight 为 true 才显示 -->
          <span v-if="module.highlight" class="badge">推荐</span>
          <!-- v-show 与 v-if 的区别：v-show 只是 CSS 隐藏，v-if 是 DOM 移除 -->
          <span v-show="module.new" class="badge badge--new">NEW</span>
        </router-link>
      </div>
    </section>

    <!-- 快速入门区域 -->
    <section class="quick-start">
      <h2>🚀 快速入门</h2>
      <div class="code-preview">
        <p>创建一个 Vue 3 应用只需要几行代码：</p>
        <pre><code>{{ quickStartCode }}</code></pre>
      </div>
    </section>

    <!-- Vue 核心概念 -->
    <section class="concepts">
      <h2>💡 核心概念速览</h2>
      <div class="concept-list">
        <div v-for="concept in coreConcepts" :key="concept.title" class="concept-item">
          <strong>{{ concept.title }}</strong>
          <span> - {{ concept.desc }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// ============================================================
// <script setup> 是 Vue 3 的编译期语法糖
// 它让组合式 API 的代码更简洁：
// 1. 自动将顶层变量暴露给模板，无需 return
// 2. 自动注册导入的组件，无需 components 选项
// 3. 更好的 TypeScript 支持
// 4. 更好的运行时性能
// ============================================================

import { ref, computed } from 'vue'
// 获取 Vue 的版本号
import { version } from 'vue'

// --------------------------------------------------
// 响应式数据
// --------------------------------------------------

// ref() 创建响应式引用 - Vue 3 最基本的响应式 API
// 在 JS 中通过 .value 访问值，在模板中自动解包（不需要 .value）
const vueVersion = ref(version)

// 快速入门代码示例
const quickStartCode = ref(`import { createApp } from 'vue'

const app = createApp({
  setup() {
    const message = ref('Hello Vue 3!')
    return { message }
  }
})

app.mount('#app')`)

// --------------------------------------------------
// 学习模块数据
// --------------------------------------------------

// 模块列表 - 演示 v-for 列表渲染
const modules = ref([
  {
    name: '响应式系统',
    path: '/reactivity',
    icon: '⚡',
    description: 'ref、reactive、toRefs 等响应式 API',
    highlight: true,
    new: false,
  },
  {
    name: '计算属性与侦听器',
    path: '/computed-watch',
    icon: '🔍',
    description: 'computed、watch、watchEffect 的使用',
    highlight: true,
    new: false,
  },
  {
    name: '组件通信',
    path: '/component',
    icon: '🔗',
    description: 'props、emit、provide/inject 等通信方式',
    highlight: true,
    new: false,
  },
  {
    name: '自定义指令',
    path: '/directive',
    icon: '🎯',
    description: '自定义指令的注册与使用',
    highlight: false,
    new: false,
  },
  {
    name: '路由功能',
    path: '/router-demo',
    icon: '🗺️',
    description: 'Vue Router 动态路由、嵌套路由、守卫',
    highlight: false,
    new: false,
  },
  {
    name: '状态管理',
    path: '/store',
    icon: '📦',
    description: 'Pinia 状态管理的完整用法',
    highlight: true,
    new: false,
  },
  {
    name: '组合式函数',
    path: '/composable',
    icon: '🧩',
    description: 'Composables 逻辑复用模式',
    highlight: false,
    new: true,
  },
  {
    name: '过渡动画',
    path: '/transition',
    icon: '✨',
    description: 'Transition 过渡与动画效果',
    highlight: false,
    new: true,
  },
  {
    name: '插槽',
    path: '/slot',
    icon: '🪆',
    description: '默认插槽、具名插槽、作用域插槽',
    highlight: false,
    new: true,
  },
])

// --------------------------------------------------
// 计算属性
// --------------------------------------------------

// computed() 创建计算属性 - 有缓存，依赖不变时不会重新计算
const gradientBg = computed(() => {
  return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
})

// Vue 核心概念列表
const coreConcepts = computed(() => [
  { title: '响应式 (Reactivity)', desc: '数据变化自动更新视图，Vue 的核心能力' },
  { title: '组件化 (Components)', desc: '将 UI 拆分为独立、可复用的组件' },
  { title: '声明式渲染', desc: '通过模板语法声明式地将数据渲染到 DOM' },
  { title: '组合式 API', desc: '更灵活的逻辑组织和复用方式' },
  { title: '单向数据流', desc: '父组件向子组件传递数据，子组件通过事件通知父组件' },
  { title: '虚拟 DOM', desc: '轻量级的 JavaScript 对象，高效地更新真实 DOM' },
])
</script>

<style scoped>
/* scoped 属性使样式只作用于当前组件 */
/* Vue 会为组件内的元素添加唯一的 data 属性来实现样式隔离 */

.home {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.hero {
  text-align: center;
  padding: 60px 20px;
  border-radius: 16px;
  color: white;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 8px;
}

.stats {
  font-size: 0.95rem;
  opacity: 0.8;
}

.modules {
  margin-bottom: 40px;
}

.modules h2 {
  text-align: center;
  margin-bottom: 24px;
  font-size: 1.5rem;
}

.module-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.module-card {
  position: relative;
  display: block;
  padding: 24px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  background: white;
}

.module-card:hover {
  border-color: #667eea;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
}

/* 动态 class 绑定的样式 */
.module-card--highlight {
  border-color: #667eea;
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%);
}

.module-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 12px;
}

.module-card h3 {
  margin: 0 0 8px;
  font-size: 1.1rem;
  color: #1a202c;
}

.module-card p {
  margin: 0;
  font-size: 0.9rem;
  color: #64748b;
}

.badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
  background: #667eea;
  color: white;
}

.badge--new {
  background: #f59e0b;
}

.quick-start,
.concepts {
  margin-bottom: 40px;
}

.quick-start h2,
.concepts h2 {
  text-align: center;
  margin-bottom: 24px;
  font-size: 1.5rem;
}

.code-preview {
  background: #1e293b;
  color: #e2e8f0;
  padding: 24px;
  border-radius: 12px;
}

.code-preview p {
  margin: 0 0 12px;
  color: #94a3b8;
}

.code-preview pre {
  margin: 0;
  overflow-x: auto;
}

.code-preview code {
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

.concept-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.concept-item {
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.concept-item strong {
  color: #667eea;
}
</style>