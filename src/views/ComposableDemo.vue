<!-- ============================================================
     组合式函数演示页面
     ============================================================
     演示自定义 Composables 的用法：
     - useMouse：鼠标位置追踪
     - useCounter：计数器逻辑复用
     - useLocalStorage：本地存储
     - useFetch：数据请求
     ============================================================ -->

<template>
  <div class="demo-page">
    <h1>🧩 组合式函数 (Composables)</h1>
    <p class="desc">Composables 是 Vue 3 中复用有状态逻辑的最佳方式。</p>

    <!-- useMouse -->
    <section class="demo-section">
      <h2>1. useMouse - 鼠标位置追踪</h2>
      <p class="tip">将鼠标事件监听逻辑封装为可复用的组合式函数。</p>
      <div class="demo-box">
        <div class="result">
          <p>鼠标 X: <strong>{{ mouse.x }}</strong></p>
          <p>鼠标 Y: <strong>{{ mouse.y }}</strong></p>
          <p>鼠标在页面内: <strong>{{ mouse.inside ? '是' : '否' }}</strong></p>
        </div>
        <div class="code-block">
          <pre><code>// composables/useMouse.js
export function useMouse() {
  const x = ref(0)
  const y = ref(0)
  const inside = ref(false)

  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y, inside }
}

// 组件中使用
const { x, y } = useMouse()</code></pre>
        </div>
      </div>
    </section>

    <!-- useCounter -->
    <section class="demo-section">
      <h2>2. useCounter - 计数器逻辑复用</h2>
      <p class="tip">将计数器逻辑提取为独立函数，可在多个组件中复用。</p>
      <div class="demo-box">
        <div class="result">
          <p>计数器 A: <strong>{{ counterA.count }}</strong></p>
          <p>计数器 B: <strong>{{ counterB.count }}</strong> (初始值10)</p>
        </div>
        <div class="actions">
          <button @click="counterA.increment()">A +1</button>
          <button @click="counterA.decrement()">A -1</button>
          <button @click="counterB.increment()">B +1</button>
          <button @click="counterB.decrement()">B -1</button>
          <button @click="counterA.reset(); counterB.reset()">全部重置</button>
        </div>
        <div class="code-block">
          <pre><code>// composables/useCounter.js
export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  return { count, increment, decrement, reset }
}

// 两个独立的计数器实例
const counterA = useCounter()      // 默认从 0 开始
const counterB = useCounter(10)    // 从 10 开始</code></pre>
        </div>
      </div>
    </section>

    <!-- useLocalStorage -->
    <section class="demo-section">
      <h2>3. useLocalStorage - 本地存储同步</h2>
      <p class="tip">将 ref 的值自动同步到 localStorage，页面刷新后数据不丢失。</p>
      <div class="demo-box">
        <div class="result">
          <input v-model="savedName" placeholder="输入名字（自动保存）" />
          <p>保存的名字: <strong>{{ savedName }}</strong></p>
          <p style="font-size:0.8rem;color:#94a3b8;">刷新页面后数据仍然存在！</p>
        </div>
        <div class="code-block">
          <pre><code>// composables/useLocalStorage.js
export function useLocalStorage(key, defaultValue) {
  const data = ref(localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : defaultValue)

  watch(data, (val) => {
    localStorage.setItem(key, JSON.stringify(val))
  })

  return data
}

// 使用
const savedName = useLocalStorage('user-name', '')</code></pre>
        </div>
      </div>
    </section>

    <!-- useFetch -->
    <section class="demo-section">
      <h2>4. useFetch - 数据请求封装</h2>
      <p class="tip">封装 fetch 请求，自动管理 loading 和 error 状态。</p>
      <div class="demo-box">
        <div class="result">
          <div class="actions">
            <button @click="fetchData">获取数据</button>
          </div>
          <p v-if="data.loading">⏳ 加载中...</p>
          <p v-else-if="data.error">❌ 错误: {{ data.error }}</p>
          <div v-else-if="data.data">
            <p>✅ 数据获取成功！</p>
            <pre class="json-display">{{ JSON.stringify(data.data, null, 2).slice(0, 200) }}...</pre>
          </div>
        </div>
        <div class="code-block">
          <pre><code>// composables/useFetch.js
export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  async function fetchData() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(url)
      data.value = await res.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, fetchData }
}</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useMouse } from '../composables/useMouse'
import { useCounter } from '../composables/useCounter'
import { useLocalStorage } from '../composables/useLocalStorage'
import { useFetch } from '../composables/useFetch'

// 使用各种组合式函数
const mouse = useMouse()
const counterA = useCounter(0)
const counterB = useCounter(10)
const savedName = useLocalStorage('vue-demo-name', '')
const { data, fetchData } = useFetch('https://jsonplaceholder.typicode.com/users')
</script>

<style scoped>
.demo-page { max-width: 900px; margin: 0 auto; padding: 20px; }
.demo-page > h1 { text-align: center; margin-bottom: 8px; }
.desc { text-align: center; color: #64748b; margin-bottom: 32px; }
.demo-section { margin-bottom: 32px; padding: 24px; background: transparent; border-radius: 12px; border: 1px solid #e2e8f0; }
.demo-section h2 { margin: 0 0 8px; color: #1e293b; }
.tip { color: #64748b; font-size: 0.9rem; margin-bottom: 16px; padding: 8px 12px; background: #f0f9ff; border-radius: 6px; border-left: 3px solid #3b82f6; }
.demo-box { display: flex; flex-direction: column; gap: 16px; }
.result { padding: 16px; background: #f8fafc; border-radius: 8px; }
.result p { margin: 4px 0; }
.result input { padding: 8px 12px; border: 2px solid #e2e8f0; border-radius: 8px; width: 100%; box-sizing: border-box; }
.result input:focus { outline: none; border-color: #667eea; }
.json-display { background: #1e293b; color: #a5f3fc; padding: 12px; border-radius: 8px; font-size: 0.8rem; overflow-x: auto; }
.actions { display: flex; gap: 8px; flex-wrap: wrap; }
.actions button { padding: 8px 16px; border: 1px solid #e2e8f0; border-radius: 6px; background: white; cursor: pointer; transition: all 0.2s; }
.actions button:hover { background: #667eea; color: white; border-color: #667eea; }
.code-block { background: #1e293b; border-radius: 8px; padding: 16px; overflow-x: auto; }
.code-block pre { margin: 0; }
.code-block code { color: #e2e8f0; font-family: 'Fira Code', 'Consolas', monospace; font-size: 0.85rem; line-height: 1.6; }
</style>