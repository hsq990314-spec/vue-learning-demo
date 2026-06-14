// ============================================================
// 组合式函数 (Composable) - LocalStorage 持久化
// ============================================================
// 演示如何将响应式数据与浏览器 localStorage 同步
// 这是一个非常实用的模式，常用于保存用户偏好设置等
// ============================================================

import { ref, watch } from 'vue'

/**
 * useLocalStorage - 将数据持久化到 localStorage 的组合式函数
 * 
 * @param {string} key - localStorage 的键名
 * @param {*} defaultValue - 默认值（当 localStorage 中没有对应数据时使用）
 * @returns {Ref} 响应式引用，与 localStorage 自动同步
 * 
 * 使用示例：
 * ```js
 * const name = useLocalStorage('user-name', '游客')
 * // name 的值会自动保存到 localStorage
 * // 页面刷新后，name 会从 localStorage 恢复
 * ```
 */
export function useLocalStorage(key, defaultValue) {
  // 尝试从 localStorage 读取已保存的值
  const stored = localStorage.getItem(key)
  
  // 创建响应式引用
  // 如果 localStorage 有值则解析使用，否则使用默认值
  const data = ref(stored ? JSON.parse(stored) : defaultValue)

  // watch 监听 data 的变化，自动保存到 localStorage
  // deep: true 表示深度监听，对象内部属性变化也会触发
  watch(
    data,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true }
  )

  return data
}