<!-- ============================================================
     自定义输入组件 - 演示 v-model 在组件上的使用
     ============================================================
     使用 defineModel() (Vue 3.4+) 简化 v-model 绑定
     ============================================================ -->

<template>
  <div class="custom-input">
    <input
      :value="modelValue"
      @input="modelValue = $event.target.value"
      placeholder="请输入内容..."
    />
    <input
      v-if="title !== undefined"
      :value="title"
      @input="title = $event.target.value"
      placeholder="请输入标题..."
    />
  </div>
</template>

<script setup>
// ============================================================
// defineModel() - Vue 3.4+ 新增的宏
// 它返回一个可写的 ref，可以直接读写
// 本质上是 props + emit 的语法糖
// ============================================================

// 默认的 v-model 绑定（modelValue）
const modelValue = defineModel()

// 带参数的 v-model 绑定（v-model:title）
const title = defineModel('title')
</script>

<style scoped>
.custom-input {
  display: flex;
  gap: 8px;
}

.custom-input input {
  flex: 1;
  padding: 8px 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

.custom-input input:focus {
  outline: none;
  border-color: #667eea;
}
</style>