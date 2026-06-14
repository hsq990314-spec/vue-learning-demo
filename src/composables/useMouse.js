// ============================================================
// 组合式函数 (Composable) - 鼠标位置追踪
// ============================================================
// 组合式函数是 Vue 3 组合式 API 的核心模式之一。
// 它是一个函数，封装了有状态的逻辑，并返回可在组件中复用的响应式数据。
//
// 命名约定：以 "use" 开头，如 useMouse、useFetch、useLocalStorage
// ============================================================

import { ref, onMounted, onUnmounted } from 'vue'

/**
 * useMouse - 追踪鼠标位置的组合式函数
 * 
 * @returns {Object} 包含鼠标 x、y 坐标的响应式引用
 * 
 * 使用示例：
 * ```js
 * const { x, y } = useMouse()
 * // 在模板中：{{ x }}, {{ y }}
 * ```
 */
export function useMouse() {
  // 使用 ref 创建响应式变量
  const x = ref(0)
  const y = ref(0)

  // 鼠标移动事件处理函数
  function update(event) {
    x.value = event.clientX
    y.value = event.clientY
  }

  // onMounted - 组件挂载后注册事件监听
  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  // onUnmounted - 组件卸载时移除事件监听
  // 这很重要！如果不移除，会导致内存泄漏
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  // 返回响应式数据，供组件使用
  return { x, y }
}