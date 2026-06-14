<!-- ============================================================
     嵌套路由父视图 - 演示嵌套路由
     ============================================================ -->
<template>
  <div class="nested-route-view">
    <h3>📁 嵌套路由区域</h3>
    <p>这是嵌套路由的父级视图，子路由会显示在下方：</p>
    <div class="nested-nav">
      <router-link to="/router-demo/nested/profile">个人资料</router-link>
      <router-link to="/router-demo/nested/settings">设置</router-link>
    </div>
    <!-- 子路由出口 -->
    <div class="nested-content">
      <router-view />
    </div>
    <router-link to="/router-demo" class="back-link">← 返回路由演示</router-link>
  </div>
</template>

<style scoped>
.nested-route-view { padding: 12px; }
.nested-route-view h3 { margin: 0 0 8px; color: #8b5cf6; }
.nested-nav { display: flex; gap: 8px; margin: 12px 0; }
.nested-nav a { padding: 4px 12px; border: 1px solid #e2e8f0; border-radius: 6px; text-decoration: none; color: #64748b; font-size: 0.85rem; }
.nested-nav a.router-link-active { background: #8b5cf6; color: white; border-color: #8b5cf6; }
.nested-content { padding: 12px; background: #f5f3ff; border-radius: 8px; min-height: 60px; }
.back-link { display: inline-block; margin-top: 12px; color: #667eea; text-decoration: none; font-size: 0.9rem; }
.back-link:hover { text-decoration: underline; }
</style>