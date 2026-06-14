// ============================================================
// 组合式函数 (Composable) - 数据请求
// ============================================================
// 演示如何封装异步数据获取逻辑
// 包含加载状态、错误处理等常见模式
// ============================================================

import { ref, watch, isRef } from 'vue'

/**
 * useFetch - 封装 fetch 请求的组合式函数
 * 
 * @param {string|Ref<string>} url - 请求的 URL，可以是响应式引用
 * @returns {Object} 包含 data、error、loading 的对象
 * 
 * 特点：
 * 1. 自动处理加载状态和错误
 * 2. 支持 ref 作为 URL 参数（URL 变化时自动重新请求）
 * 3. 使用 shallowRef 避免深层响应式转换（提升大数据性能）
 */
export function useFetch(url) {
  // 响应式数据
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  // 执行请求的函数
  async function doFetch() {
    // 重置状态
    data.value = null
    error.value = null
    loading.value = true

    try {
      // isRef 检查是否为 ref 对象，如果是则取 .value
      const urlValue = isRef(url) ? url.value : url
      
      // 模拟 API 请求（实际项目中替换为真实的 fetch）
      // const response = await fetch(urlValue)
      // data.value = await response.json()
      
      // 这里使用模拟数据来演示
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // 模拟不同 URL 返回不同数据
      if (urlValue.includes('users')) {
        data.value = [
          { id: 1, name: '张三', role: '前端开发' },
          { id: 2, name: '李四', role: '后端开发' },
          { id: 3, name: '王五', role: 'UI设计' },
        ]
      } else if (urlValue.includes('posts')) {
        data.value = [
          { id: 1, title: 'Vue 3 响应式原理', author: '张三' },
          { id: 2, title: '组合式 API 最佳实践', author: '李四' },
          { id: 3, title: 'Pinia 状态管理指南', author: '王五' },
        ]
      } else {
        data.value = { message: '数据加载成功', timestamp: Date.now() }
      }
    } catch (err) {
      // 捕获错误并存入 error
      error.value = err
    } finally {
      // 无论成功失败，都关闭加载状态
      loading.value = false
    }
  }

  // 如果 url 是 ref，则监听其变化自动重新请求
  if (isRef(url)) {
    watch(url, doFetch, { immediate: true })
  } else {
    // 非 ref 直接执行一次
    doFetch()
  }

  // 返回响应式数据和方法
  return { data, error, loading, refresh: doFetch }
}