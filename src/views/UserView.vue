<!-- ============================================================
     用户视图 - 演示动态路由参数
     ============================================================ -->
<template>
  <div class="user-view">
    <h3>👤 用户详情</h3>
    <p>用户 ID: <strong>{{ $route.params.id }}</strong></p>
    <p>用户名: <strong>{{ userName }}</strong></p>
    <router-link to="/router-demo" class="back-link">← 返回路由演示</router-link>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 模拟用户数据
const userMap = { 1: '张三', 2: '李四', 3: '王五' }

// 根据路由参数计算用户名
const userName = computed(() => userMap[route.params.id] || '未知用户')

// 监听路由参数变化
watch(
  () => route.params.id,
  (newId) => {
    console.log('路由参数变化:', newId)
  }
)
</script>

<style scoped>
.user-view { padding: 12px; }
.user-view h3 { margin: 0 0 8px; color: #d97706; }
.user-view p { margin: 4px 0; }
.back-link { display: inline-block; margin-top: 8px; color: #667eea; text-decoration: none; font-size: 0.9rem; }
.back-link:hover { text-decoration: underline; }
</style>