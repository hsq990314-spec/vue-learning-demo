<!-- ============================================================
     列表组件 - 演示作用域插槽
     ============================================================ -->
<template>
  <div class="list">
    <!-- 遍历 items，通过作用域插槽将数据传回父组件 -->
    <div v-for="(item, index) in items" :key="index" class="list-item">
      <!-- :item 和 :index 是作用域插槽的属性，父组件可以接收 -->
      <slot :item="item" :index="index">
        <!-- 默认渲染：当父组件没有提供插槽内容时使用 -->
        {{ item }}
      </slot>
    </div>
  </div>
</template>

<script setup>
// defineProps - 接收列表数据
defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.list { display: flex; flex-direction: column; gap: 4px; }
.list-item { padding: 6px 0; }
</style>