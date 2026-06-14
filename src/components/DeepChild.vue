<!-- ============================================================
     深层子组件 - 演示 provide/inject
     ============================================================ -->
<template>
  <div class="deep-child">
    <h4>🔬 深层子组件 (通过 inject 获取祖先数据)</h4>
    <p>注入的主题: <strong>{{ injectedTheme }}</strong></p>
    <p>注入的语言: <strong>{{ injectedLanguage }}</strong></p>
    <button @click="injectedTheme = injectedTheme === 'dark' ? 'light' : 'dark'">
      切换主题（修改 inject 的响应式数据会同步到 provide 源）
    </button>
  </div>
</template>

<script setup>
import { inject } from 'vue'

// inject 注入祖先组件 provide 的数据
// 第二个参数是默认值（当没有找到对应的 provide 时使用）
const injectedTheme = inject('theme', 'light')
const injectedLanguage = inject('language', 'en')
</script>

<style scoped>
.deep-child {
  padding: 16px;
  background: #fef3c7;
  border: 2px dashed #f59e0b;
  border-radius: 8px;
}
.deep-child h4 { margin: 0 0 12px; color: #d97706; }
.deep-child p { margin: 4px 0; font-size: 0.9rem; }
.deep-child button {
  margin-top: 8px; padding: 6px 12px; border: 1px solid #f59e0b;
  border-radius: 6px; background: white; cursor: pointer; font-size: 0.85rem;
}
.deep-child button:hover { background: #f59e0b; color: white; }
</style>