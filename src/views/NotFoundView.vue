<!-- ============================================================
     404 页面 - 路由未匹配时显示
     ============================================================ -->
<template>
  <div class="not-found">
    <h1>404</h1>
    <p>页面未找到 😢</p>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 60px 20px;
}
.not-found h1 { font-size: 4rem; color: #667eea; margin: 0; }
.not-found p { font-size: 1.2rem; color: #64748b; margin: 16px 0; }
.not-found a { color: #667eea; text-decoration: none; font-weight: bold; }
.not-found a:hover { text-decoration: underline; }
</style>