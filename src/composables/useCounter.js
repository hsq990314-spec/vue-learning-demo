// ============================================================
// 组合式函数 (Composable) - 计数器逻辑
// ============================================================
// 演示如何将组件中的可复用逻辑提取为组合式函数
// 与 Pinia Store 不同，组合式函数更轻量，不需要全局注册
// 适合组件级别的状态逻辑复用
// ============================================================

import { ref, computed } from 'vue'

/**
 * useCounter - 计数器逻辑的组合式函数
 * 
 * @param {number} initialValue - 初始值，默认为 0
 * @param {number} step - 步长，默认为 1
 * @returns {Object} 计数器相关的响应式数据和方法
 * 
 * 使用示例：
 * ```js
 * const { count, doubleCount, increment, decrement, reset } = useCounter(10, 2)
 * ```
 */
export function useCounter(initialValue = 0, step = 1) {
  // 计数器的当前值
  const count = ref(initialValue)

  // 计算属性：双倍值
  const doubleCount = computed(() => count.value * 2)

  // 计算属性：是否为偶数
  const isEven = computed(() => count.value % 2 === 0)

  // 计算属性：是否为正数
  const isPositive = computed(() => count.value > 0)

  // 增加
  function increment() {
    count.value += step
  }

  // 减少
  function decrement() {
    count.value -= step
  }

  // 增加指定数量
  function incrementBy(amount) {
    count.value += amount
  }

  // 重置到初始值
  function reset() {
    count.value = initialValue
  }

  // 设置为指定值
  function set(value) {
    count.value = value
  }

  return {
    // 状态
    count,
    // 计算属性
    doubleCount,
    isEven,
    isPositive,
    // 方法
    increment,
    decrement,
    incrementBy,
    reset,
    set,
  }
}