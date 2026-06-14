<!-- ============================================================
     自定义指令演示页面
     ============================================================
     演示 Vue 3 自定义指令的完整用法：
     - 指令的钩子函数
     - v-focus 自动聚焦
     - v-color 动态颜色
     - v-debounce 防抖
     - v-permission 权限控制
     ============================================================ -->

<template>
  <div class="demo-page">
    <h1>🎯 自定义指令</h1>
    <p class="desc">自定义指令用于复用底层 DOM 访问逻辑。</p>

    <!-- v-focus -->
    <section class="demo-section">
      <h2>1. v-focus - 自动聚焦</h2>
      <p class="tip">页面加载时输入框自动获得焦点，这是最简单的自定义指令示例。</p>
      <div class="demo-box">
        <input v-focus placeholder="我自动聚焦了！" />
        <div class="code-block">
          <pre><code>// 注册全局自定义指令
app.directive('focus', {
  mounted(el) {
    el.focus()  // 元素挂载时自动聚焦
  }
})

// 或在组件内注册局部指令
const vFocus = {
  mounted(el) { el.focus() }
}</code></pre>
        </div>
      </div>
    </section>

    <!-- v-color -->
    <section class="demo-section">
      <h2>2. v-color - 动态颜色</h2>
      <p class="tip">通过指令动态设置元素的颜色，演示指令的 updated 钩子。</p>
      <div class="demo-box">
        <div class="result">
          <p v-color="textColor">这段文字的颜色会随指令变化！</p>
          <div class="actions">
            <button v-for="c in ['red', 'blue', 'green', 'purple', 'orange']" :key="c"
              @click="textColor = c" :style="{ color: c }">{{ c }}</button>
          </div>
        </div>
        <div class="code-block">
          <pre><code>// v-color 指令 - 动态设置文字颜色
const vColor = {
  mounted(el, binding) {
    el.style.color = binding.value
  },
  updated(el, binding) {
    el.style.color = binding.value  // 值变化时更新
  }
}

// 使用：<p v-color="textColor">文字</p></code></pre>
        </div>
      </div>
    </section>

    <!-- v-debounce -->
    <section class="demo-section">
      <h2>3. v-debounce - 防抖点击</h2>
      <p class="tip">防止按钮在短时间内被重复点击，这是非常实用的指令模式。</p>
      <div class="demo-box">
        <div class="result">
          <p>点击计数: <strong>{{ clickCount }}</strong></p>
          <button v-debounce:500="handleClick">防抖按钮 (500ms)</button>
          <button @click="handleClick">普通按钮 (对比)</button>
        </div>
        <div class="code-block">
          <pre><code>// v-debounce 防抖指令
const vDebounce = {
  mounted(el, binding) {
    const delay = binding.arg ? parseInt(binding.arg) : 300
    let timer = null
    el.addEventListener('click', () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => binding.value(), delay)
    })
  }
}
// 使用：<button v-debounce:500="handler">防抖</button></code></pre>
        </div>
      </div>
    </section>

    <!-- 指令钩子函数 -->
    <section class="demo-section">
      <h2>4. 指令的钩子函数</h2>
      <div class="comparison-table">
        <table>
          <thead><tr><th>钩子</th><th>触发时机</th></tr></thead>
          <tbody>
            <tr><td><code>created</code></td><td>元素被创建后，属性/事件之前</td></tr>
            <tr><td><code>beforeMount</code></td><td>元素插入 DOM 之前</td></tr>
            <tr><td><code>mounted</code></td><td>元素插入 DOM 之后</td></tr>
            <tr><td><code>beforeUpdate</code></td><td>组件更新之前</td></tr>
            <tr><td><code>updated</code></td><td>组件更新之后</td></tr>
            <tr><td><code>beforeUnmount</code></td><td>组件卸载之前</td></tr>
            <tr><td><code>unmounted</code></td><td>组件卸载之后</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// --------------------------------------------------
// 局部自定义指令
// --------------------------------------------------

// v-focus 指令 - 自动聚焦
// 在 <script setup> 中，以 v 开头的变量会被自动识别为自定义指令
const vFocus = {
  mounted(el) {
    el.focus()
  },
}

// v-color 指令 - 动态颜色
const vColor = {
  mounted(el, binding) {
    // binding.value 是指令绑定的值
    el.style.color = binding.value
  },
  updated(el, binding) {
    // 当绑定值变化时更新
    el.style.color = binding.value
  },
}

// v-debounce 指令 - 防抖
const vDebounce = {
  mounted(el, binding) {
    // binding.arg 是指令参数（v-debounce:500 中的 500）
    const delay = binding.arg ? parseInt(binding.arg) : 300
    let timer = null
    el.addEventListener('click', () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        // binding.value 是指令绑定的函数
        binding.value()
      }, delay)
    })
  },
}

// --------------------------------------------------
// 演示数据
// --------------------------------------------------
const textColor = ref('blue')
const clickCount = ref(0)

function handleClick() {
  clickCount.value++
}
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
.actions { display: flex; gap: 8px; margin-top: 8px; }
.actions button, .result button { padding: 8px 16px; border: 1px solid #e2e8f0; border-radius: 6px; background: white; cursor: pointer; transition: all 0.2s; }
.actions button:hover, .result button:hover { background: #667eea; color: white; border-color: #667eea; }
.code-block { background: #1e293b; border-radius: 8px; padding: 16px; overflow-x: auto; }
.code-block pre { margin: 0; }
.code-block code { color: #e2e8f0; font-family: 'Fira Code', 'Consolas', monospace; font-size: 0.85rem; line-height: 1.6; }
.comparison-table { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #e2e8f0; }
th { background: #f8fafc; color: #667eea; font-weight: 600; }
td { font-size: 0.9rem; }
code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 0.85rem; color: #667eea; }
</style>