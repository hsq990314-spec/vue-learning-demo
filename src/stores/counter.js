// ============================================================
// Pinia 状态管理 - 计数器 Store
// ============================================================
// Pinia 是 Vue 3 的官方状态管理库，是 Vuex 的继任者。
// 与 Vuex 相比，Pinia 的 API 更简洁，支持 TypeScript，且去除了 mutations。
// 
// Pinia Store 的三个核心概念：
// 1. state - 状态/数据（相当于组件中的 data）
// 2. getters - 计算属性（相当于组件中的 computed）
// 3. actions - 方法（相当于组件中的 methods，支持异步操作）
// ============================================================

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// ============================================================
// 方式一：选项式 API (Options API) 风格定义 Store
// ============================================================
// 这种风格与 Vuex 非常相似，适合从 Vuex 迁移的项目

export const useCounterStore = defineStore('counter', {
  // --------------------------------------------------
  // state：定义状态
  // 必须是一个返回初始状态的函数（避免跨实例共享状态）
  // --------------------------------------------------
  state: () => ({
    // 基础计数器值
    count: 0,
    // 计数器修改历史记录
    history: [],
  }),

  // --------------------------------------------------
  // getters：定义计算属性
  // 类似于 computed，有缓存机制，依赖不变时不会重新计算
  // --------------------------------------------------
  getters: {
    // 双倍计数 - 简单的 getter
    doubleCount: (state) => state.count * 2,

    // 判断计数是否为偶数
    isEven: (state) => state.count % 2 === 0,

    // 使用 this 访问其他 getter 的写法
    // 注意：使用 this 时不能用箭头函数
    doublePlusOne() {
      return this.doubleCount + 1
    },

    // 获取历史记录数量
    historyCount: (state) => state.history.length,
  },

  // --------------------------------------------------
  // actions：定义方法
  // 可以是异步的，用于修改 state 或执行业务逻辑
  // --------------------------------------------------
  actions: {
    // 增加计数
    increment() {
      this.count++
      this.history.push(`+1 → ${this.count}`)
    },

    // 减少计数
    decrement() {
      this.count--
      this.history.push(`-1 → ${this.count}`)
    },

    // 增加指定数量
    incrementBy(amount) {
      this.count += amount
      this.history.push(`+${amount} → ${this.count}`)
    },

    // 重置计数器
    reset() {
      this.count = 0
      this.history.push('重置 → 0')
    },

    // 异步 action - 模拟异步操作
    async incrementAsync() {
      // 模拟网络请求延迟
      return new Promise((resolve) => {
        setTimeout(() => {
          this.increment()
          resolve(this.count)
        }, 1000)
      })
    },
  },
})

// ============================================================
// 方式二：组合式 API (Composition API) 风格定义 Store
// ============================================================
// 使用 ref/reactive 定义状态，computed 定义 getter，函数定义 action
// 这种风格更灵活，适合复杂的逻辑复用

export const useCounterSetupStore = defineStore('counterSetup', () => {
  // --- state ---
  // 使用 ref 定义响应式状态
  const count = ref(0)
  const history = ref([])

  // --- getters ---
  // 使用 computed 定义计算属性
  const doubleCount = computed(() => count.value * 2)
  const isEven = computed(() => count.value % 2 === 0)

  // --- actions ---
  // 普通函数即为 action
  function increment() {
    count.value++
    history.value.push(`+1 → ${count.value}`)
  }

  function decrement() {
    count.value--
    history.value.push(`-1 → ${count.value}`)
  }

  function incrementBy(amount) {
    count.value += amount
    history.value.push(`+${amount} → ${count.value}`)
  }

  function reset() {
    count.value = 0
    history.value.push('重置 → 0')
  }

  // 异步 action
  async function incrementAsync() {
    return new Promise((resolve) => {
      setTimeout(() => {
        increment()
        resolve(count.value)
      }, 1000)
    })
  }

  // 必须返回所有需要在组件中使用的状态和方法
  return {
    count,
    history,
    doubleCount,
    isEven,
    increment,
    decrement,
    incrementBy,
    reset,
    incrementAsync,
  }
})