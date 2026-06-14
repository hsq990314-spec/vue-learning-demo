<!-- ============================================================
     根组件 App.vue
     ============================================================
     包含：
     - 导航栏（使用 router-link）
     - 路由视图出口（router-view）
     - 路由过渡动画
     ============================================================ -->

<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <nav class="navbar">
      <div class="nav-brand">
        <span class="logo">🟢</span>
        <span class="brand-text">Vue 学习演示</span>
      </div>
      <div class="nav-links">
        <!-- router-link 导航，active-class 高亮当前路由 -->
        <router-link to="/" exact-active-class="active">首页</router-link>
        <router-link to="/reactivity" active-class="active">响应式</router-link>
        <router-link to="/computed-watch" active-class="active">计算/侦听</router-link>
        <router-link to="/component" active-class="active">组件</router-link>
        <router-link to="/directive" active-class="active">指令</router-link>
        <router-link to="/router-demo" active-class="active">路由</router-link>
        <router-link to="/store" active-class="active">状态管理</router-link>
        <router-link to="/composable" active-class="active">组合式函数</router-link>
        <router-link to="/transition" active-class="active">过渡动画</router-link>
        <router-link to="/slot" active-class="active">插槽</router-link>
      </div>
    </nav>

    <!-- 路由视图出口 - 带过渡动画 -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>

    <!-- 底部信息 -->
    <footer class="footer">
      <p>Vue 3 学习演示项目 | 组合式 API + Vue Router + Pinia</p>
    </footer>
  </div>
</template>

<script setup>
// App.vue 是根组件，不需要额外的逻辑
// router-view 会根据当前路由自动渲染对应的组件
</script>

<style scoped>
/* 导航栏 */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #1e293b;
}

.logo { font-size: 1.4rem; }

.nav-links {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.nav-links a {
  padding: 6px 12px;
  border-radius: 6px;
  text-decoration: none;
  color: #64748b;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.nav-links a:hover {
  background: #f1f5f9;
  color: #667eea;
}

/* 当前激活的路由链接 */
.nav-links a.active {
  background: #667eea;
  color: white;
}

/* 主内容区 */
.main-content {
  min-height: calc(100vh - 140px);
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 页面过渡动画 */
.page-enter-active {
  transition: all 0.3s ease-out;
}
.page-leave-active {
  transition: all 0.2s ease-in;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 底部 */
.footer {
  text-align: center;
  padding: 16px;
  color: #94a3b8;
  font-size: 0.85rem;
  border-top: 1px solid #e2e8f0;
}
</style>