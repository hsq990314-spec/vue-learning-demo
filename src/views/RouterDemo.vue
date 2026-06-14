<!-- ============================================================
     路由功能演示页面
     ============================================================
     演示 Vue Router 的核心功能：
     - 路由导航（router-link, router-view）
     - 动态路由参数
     - 编程式导航
     - 路由守卫
     ============================================================ -->

<template>
  <div class="demo-page">
    <h1>🗺️ 路由功能</h1>
    <p class="desc">Vue Router 是 Vue.js 的官方路由，用于构建单页应用。</p>

    <!-- 基础路由 -->
    <section class="demo-section">
      <h2>1. 声明式导航 - router-link</h2>
      <p class="tip">router-link 是 Vue Router 提供的导航组件，渲染为 a 标签，但不会触发页面刷新。</p>
      <div class="demo-box">
        <div class="result">
          <nav class="nav-demo">
            <!-- to 属性指定目标路由 -->
            <router-link to="/" active-class="active">首页</router-link>
            <router-link to="/reactivity" active-class="active">响应式</router-link>
            <router-link to="/component" active-class="active">组件通信</router-link>
          </nav>
        </div>
        <div class="code-block">
          <pre><code>// router-link 声明式导航
<router-link to="/">首页</router-link>
<router-link to="/reactivity">响应式</router-link>

// 命名路由导航
<router-link :to="{ name: 'home' }">首页</router-link>

// 带查询参数
<router-link :to="{ path: '/', query: { tab: 'info' } }">
  首页(带参数)
</router-link></code></pre>
        </div>
      </div>
    </section>

    <!-- 动态路由 -->
    <section class="demo-section">
      <h2>2. 动态路由参数</h2>
      <p class="tip">使用 :param 语法定义动态路由参数，通过 useRoute() 获取参数。</p>
      <div class="demo-box">
        <div class="result">
          <p>点击用户名查看动态路由：</p>
          <div class="user-links">
            <router-link v-for="user in users" :key="user.id"
              :to="`/router-demo/user/${user.id}`" class="user-link">
              {{ user.name }}
            </router-link>
          </div>
          <!-- 嵌套路由的 router-view -->
          <div class="nested-view">
            <router-view />
          </div>
        </div>
        <div class="code-block">
          <pre><code>// 路由配置 - 动态参数
{ path: '/user/:id', component: UserView }

// 组件中获取动态参数
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.params.id)  // 获取 :id 参数

// 监听路由参数变化
watch(() => route.params.id, (newId) => {
  // 参数变化时重新加载数据
})</code></pre>
        </div>
      </div>
    </section>

    <!-- 编程式导航 -->
    <section class="demo-section">
      <h2>3. 编程式导航 - useRouter</h2>
      <p class="tip">使用 useRouter() 获取路由实例，通过代码进行导航。</p>
      <div class="demo-box">
        <div class="result">
          <div class="actions">
            <button @click="goToHome">跳转首页</button>
            <button @click="goWithQuery">带查询参数跳转</button>
            <button @click="goBack">返回上一页</button>
            <button @click="goForward">前进下一页</button>
          </div>
          <p v-if="navigationMsg" class="msg">{{ navigationMsg }}</p>
        </div>
        <div class="code-block">
          <pre><code>import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 基本导航
router.push('/')                    // 字符串路径
router.push({ name: 'home' })      // 命名路由
router.push({ path: '/', query: { q: 'vue' } })  // 带查询参数

// 替换当前路由（不留历史记录）
router.replace('/')

// 前进/后退
router.go(-1)  // 后退
router.go(1)   // 前进
router.back()  // 等同于 go(-1)</code></pre>
        </div>
      </div>
    </section>

    <!-- 当前路由信息 -->
    <section class="demo-section">
      <h2>4. 当前路由信息 - useRoute</h2>
      <div class="result">
        <p>当前路径: <strong>{{ currentRoute.path }}</strong></p>
        <p>路由名称: <strong>{{ currentRoute.name || '无' }}</strong></p>
        <p>查询参数: <strong>{{ JSON.stringify(currentRoute.query) }}</strong></p>
        <p>路由参数: <strong>{{ JSON.stringify(currentRoute.params) }}</strong></p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// useRouter - 获取路由器实例，用于编程式导航
const router = useRouter()
// useRoute - 获取当前路由信息（只读）
const route = useRoute()

// 当前路由信息
const currentRoute = computed(() => ({
  path: route.path,
  name: route.name,
  query: route.query,
  params: route.params,
}))

// 用户列表 - 用于动态路由演示
const users = ref([
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' },
])

// 导航消息
const navigationMsg = ref('')

// 编程式导航方法
function goToHome() {
  router.push('/')
  navigationMsg.value = '已跳转到首页'
  setTimeout(() => { navigationMsg.value = '' }, 2000)
}

function goWithQuery() {
  router.push({ path: '/', query: { from: 'router-demo', time: Date.now() } })
  navigationMsg.value = '已带参数跳转'
  setTimeout(() => { navigationMsg.value = '' }, 2000)
}

function goBack() {
  router.back()
}

function goForward() {
  router.forward()
}
</script>

<style scoped>
.demo-page { max-width: 900px; margin: 0 auto; padding: 20px; }
.demo-page > h1 { text-align: center; margin-bottom: 8px; }
.desc { text-align: center; color: #64748b; margin-bottom: 32px; }
.demo-section { margin-bottom: 32px; padding: 24px; background: white; border-radius: 12px; border: 1px solid #e2e8f0; }
.demo-section h2 { margin: 0 0 8px; color: #1e293b; }
.tip { color: #64748b; font-size: 0.9rem; margin-bottom: 16px; padding: 8px 12px; background: #f0f9ff; border-radius: 6px; border-left: 3px solid #3b82f6; }
.demo-box { display: flex; flex-direction: column; gap: 16px; }
.result { padding: 16px; background: #f8fafc; border-radius: 8px; }
.result p { margin: 4px 0; }
.nav-demo { display: flex; gap: 12px; }
.nav-demo a { padding: 8px 16px; border: 1px solid #e2e8f0; border-radius: 6px; text-decoration: none; color: #64748b; transition: all 0.2s; }
.nav-demo a:hover, .nav-demo .active { background: #667eea; color: white; border-color: #667eea; }
.user-links { display: flex; gap: 8px; margin: 8px 0; }
.user-link { padding: 6px 12px; border: 1px solid #e2e8f0; border-radius: 6px; text-decoration: none; color: #667eea; transition: all 0.2s; }
.user-link:hover { background: #667eea; color: white; }
.nested-view { margin-top: 12px; padding: 12px; background: #fffbeb; border: 2px dashed #f59e0b; border-radius: 8px; }
.actions { display: flex; gap: 8px; flex-wrap: wrap; }
.actions button { padding: 8px 16px; border: 1px solid #e2e8f0; border-radius: 6px; background: white; cursor: pointer; transition: all 0.2s; }
.actions button:hover { background: #667eea; color: white; border-color: #667eea; }
.msg { color: #16a34a; font-weight: bold; }
.code-block { background: #1e293b; border-radius: 8px; padding: 16px; overflow-x: auto; }
.code-block pre { margin: 0; }
.code-block code { color: #e2e8f0; font-family: 'Fira Code', 'Consolas', monospace; font-size: 0.85rem; line-height: 1.6; }
</style>