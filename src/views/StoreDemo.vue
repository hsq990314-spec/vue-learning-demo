<!-- ============================================================
     状态管理演示页面
     ============================================================
     演示 Pinia 状态管理的核心功能：
     - defineStore：定义 Store
     - State：状态
     - Getters：计算属性
     - Actions：操作
     - StoreToRefs：解构保持响应性
     ============================================================ -->

<template>
  <div class="demo-page">
    <h1>📦 状态管理 (Pinia)</h1>
    <p class="desc">Pinia 是 Vue 3 官方推荐的状态管理库，替代 Vuex。</p>

    <!-- Counter Store -->
    <section class="demo-section">
      <h2>1. Counter Store - 基础用法</h2>
      <p class="tip">演示 State、Getters、Actions 三大核心概念。</p>
      <div class="demo-box">
        <div class="result">
          <p>计数: <strong>{{ counter.count }}</strong></p>
          <p>双倍值 (Getter): <strong>{{ counter.doubleCount }}</strong></p>
          <p>是否为偶数 (Getter): <strong>{{ counter.isEven ? '是' : '否' }}</strong></p>
        </div>
        <div class="actions">
          <button @click="counter.increment()">+1 (Action)</button>
          <button @click="counter.decrement()">-1 (Action)</button>
          <button @click="counter.incrementBy(5)">+5 (带参数Action)</button>
          <button @click="counter.reset()">重置 (Action)</button>
        </div>
        <div class="code-block">
          <pre><code>// stores/counter.js - 定义 Store
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // State - 响应式状态
  const count = ref(0)
  
  // Getters - 计算属性
  const doubleCount = computed(() => count.value * 2)
  const isEven = computed(() => count.value % 2 === 0)
  
  // Actions - 操作方法
  function increment() { count.value++ }
  function decrement() { count.value-- }
  function incrementBy(n) { count.value += n }
  function reset() { count.value = 0 }
  
  return { count, doubleCount, isEven, increment, decrement, incrementBy, reset }
})

// 组件中使用
const counter = useCounterStore()
counter.count        // 访问 state
counter.doubleCount  // 访问 getter
counter.increment()  // 调用 action</code></pre>
        </div>
      </div>
    </section>

    <!-- User Store -->
    <section class="demo-section">
      <h2>2. User Store - 异步 Action</h2>
      <p class="tip">Pinia 的 Action 支持异步操作，如 API 请求。</p>
      <div class="demo-box">
        <div class="result">
          <p>登录状态: <strong>{{ userStore.isLoggedIn ? '已登录' : '未登录' }}</strong></p>
          <p>用户名: <strong>{{ userStore.currentUser?.name || '无' }}</strong></p>
          <p>角色: <strong>{{ userStore.currentUser?.role || '无' }}</strong></p>
          <p v-if="userStore.loading" class="loading">加载中...</p>
        </div>
        <div class="actions">
          <button @click="userStore.login({ name: '管理员', role: 'admin' })">登录</button>
          <button @click="userStore.login({ name: '普通用户', role: 'user' })">普通用户登录</button>
          <button @click="userStore.logout()">登出</button>
        </div>
        <div class="code-block">
          <pre><code>// 异步 Action 示例
async login(userData) {
  this.loading = true
  try {
    // 模拟 API 请求
    await new Promise(resolve => setTimeout(resolve, 1000))
    this.currentUser = userData
    this.isLoggedIn = true
  } finally {
    this.loading = false
  }
}</code></pre>
        </div>
      </div>
    </section>

    <!-- storeToRefs -->
    <section class="demo-section">
      <h2>3. storeToRefs - 解构 Store</h2>
      <p class="tip">直接解构 Store 会丢失响应性！必须使用 storeToRefs()。</p>
      <div class="demo-box">
        <div class="result">
          <p>解构的 count: <strong>{{ count }}</strong></p>
          <p>解构的 doubleCount: <strong>{{ doubleCount }}</strong></p>
        </div>
        <div class="code-block">
          <pre><code>import { storeToRefs } from 'pinia'

const counter = useCounterStore()

// ❌ 直接解构会丢失响应性
const { count, doubleCount } = counter  // 不是响应式的！

// ✅ 使用 storeToRefs 保持响应性
const { count, doubleCount } = storeToRefs(counter)

// ⚠️ Action 不需要 storeToRefs，直接解构即可
const { increment, decrement } = counter  // Action 直接解构 OK</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useCounterStore } from '../stores/counter'
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'

// 使用 Store
const counter = useCounterStore()
const userStore = useUserStore()

// 使用 storeToRefs 解构 Store，保持响应性
const { count, doubleCount } = storeToRefs(counter)
</script>

<style scoped>
.demo-page { max-width: 900px; margin: 0 auto; padding: 20px; }
.demo-page > h1 { text-align: center; margin-bottom: 8px; }
.desc { text-align: center; color: #64748b; margin-bottom: 32px; }
.demo-section { margin-bottom: 32px; padding: 24px; background: white; border-radius: 12px; border: 1px solid #e2e8f0; }
.demo-section h2 { margin: 0 0 8px; color: #1e293b; }
.tip { color: #64748b; font-size: 0.9rem; margin-bottom: 16px; padding: 8px 12px; background: #f0f9ff; border-radius: 6px; border-left: 3px solid #3b82f6; }
.demo-box { display: flex; flex-direction: column; gap: 16px; }
.result { padding: 16px; background: #f8fafc; border-radius: 8px; }
.result p { margin: 4px 0; }
.loading { color: #f59e0b; }
.actions { display: flex; gap: 8px; flex-wrap: wrap; }
.actions button { padding: 8px 16px; border: 1px solid #e2e8f0; border-radius: 6px; background: white; cursor: pointer; transition: all 0.2s; }
.actions button:hover { background: #667eea; color: white; border-color: #667eea; }
.code-block { background: #1e293b; border-radius: 8px; padding: 16px; overflow-x: auto; }
.code-block pre { margin: 0; }
.code-block code { color: #e2e8f0; font-family: 'Fira Code', 'Consolas', monospace; font-size: 0.85rem; line-height: 1.6; }
</style>