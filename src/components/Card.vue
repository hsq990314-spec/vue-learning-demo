<!-- ============================================================
     卡片组件 - 演示默认插槽和具名插槽
     ============================================================ -->
<template>
  <div class="card">
    <!-- 具名插槽：header -->
    <header v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </header>
    <!-- 默认插槽 -->
    <main class="card-body">
      <slot>这是默认内容（当没有传入内容时显示）</slot>
    </main>
    <!-- 具名插槽：footer -->
    <footer v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup>
// Card 组件通过插槽实现灵活的内容分发
// $slots 可以检查某个插槽是否被使用
</script>

<style scoped>
.card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background: white;
}
.card-header {
  padding: 12px 16px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}
.card-body {
  padding: 16px;
}
.card-footer {
  padding: 8px 16px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
}
</style>