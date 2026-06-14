<!-- ============================================================
     带暴露接口的子组件 - 演示 defineExpose
     ============================================================ -->
<template>
  <div class="child-expose">
    <h4>🔐 封闭子组件 (defineExpose)</h4>
    <p>内部计数: {{ count }}</p>
    <p style="font-size:0.8rem;color:#94a3b8;">此组件使用 script setup，默认对外封闭</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// script setup 中的变量默认不对父组件暴露
const count = ref(0)

function increment() {
  count.value++
}

function reset() {
  count.value = 0
}

// defineExpose - 显式暴露给父组件的接口
// 只有暴露的属性和方法才能被父组件通过 ref 访问
defineExpose({
  count,
  increment,
  reset,
})
</script>

<style scoped>
.child-expose {
  padding: 16px;
  background: #f0fdf4;
  border: 2px dashed #86efac;
  border-radius: 8px;
}
.child-expose h4 { margin: 0 0 8px; color: #16a34a; }
.child-expose p { margin: 4px 0; font-size: 0.9rem; }
</style>