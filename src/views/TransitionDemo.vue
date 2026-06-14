<!-- ============================================================
     过渡动画演示页面
     ============================================================
     演示 Vue 3 的过渡动画系统：
     - Transition 组件（单元素过渡）
     - TransitionGroup（列表过渡）
     - CSS 过渡和动画
     - JavaScript 钩子
     ============================================================ -->

<template>
  <div class="demo-page">
    <h1>✨ 过渡动画</h1>
    <p class="desc">Vue 提供了内置的 Transition 组件，让添加动画变得简单。</p>

    <!-- 基础 Transition -->
    <section class="demo-section">
      <h2>1. Transition - 单元素过渡</h2>
      <p class="tip">使用 v-if 或 v-show 切换元素时，Transition 组件会自动添加 CSS 类名。</p>
      <div class="demo-box">
        <div class="result">
          <button @click="show1 = !show1">切换显示</button>
          <!-- Transition 组件包裹需要动画的元素 -->
          <Transition name="fade">
            <p v-if="show1" class="animated-box fade-box">我会淡入淡出！</p>
          </Transition>
        </div>
        <div class="code-block">
          <pre><code>// Transition 组件会自动添加 6 个 CSS 类名：
// .fade-enter-from   // 进入开始状态
// .fade-enter-active // 进入过渡效果
// .fade-enter-to     // 进入结束状态
// .fade-leave-from   // 离开开始状态
// .fade-leave-active // 离开过渡效果
// .fade-leave-to     // 离开结束状态

// CSS 示例
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}</code></pre>
        </div>
      </div>
    </section>

    <!-- 滑动过渡 -->
    <section class="demo-section">
      <h2>2. 不同过渡效果</h2>
      <div class="demo-box">
        <div class="result">
          <button @click="show2 = !show2">滑动效果</button>
          <Transition name="slide">
            <p v-if="show2" class="animated-box slide-box">我会滑入滑出！</p>
          </Transition>

          <button @click="show3 = !show3" style="margin-top:12px;">弹跳效果</button>
          <Transition name="bounce">
            <p v-if="show3" class="animated-box bounce-box">我会弹跳！</p>
          </Transition>
        </div>
      </div>
    </section>

    <!-- TransitionGroup -->
    <section class="demo-section">
      <h2>3. TransitionGroup - 列表过渡</h2>
      <p class="tip">TransitionGroup 用于给 v-for 列表添加过渡动画。</p>
      <div class="demo-box">
        <div class="result">
          <div class="actions">
            <button @click="addTodo">添加</button>
            <button @click="removeTodo">移除</button>
            <button @click="shuffleTodos">打乱</button>
          </div>
          <!-- TransitionGroup 需要指定 tag 渲染为真实 DOM 元素 -->
          <TransitionGroup name="list" tag="ul" class="todo-list">
            <li v-for="item in todos" :key="item.id" class="todo-item">
              {{ item.text }}
              <button @click="todos.splice(todos.indexOf(item), 1)">✕</button>
            </li>
          </TransitionGroup>
        </div>
        <div class="code-block">
          <pre><code>// TransitionGroup 用于列表动画
// 每个子元素必须有唯一的 key
// move-class 控制移动过渡
<TransitionGroup name="list" tag="ul">
  <li v-for="item in list" :key="item.id">
    {{ item.text }}
  </li>
</TransitionGroup>

// CSS - 列表项移动过渡
.list-move { transition: transform 0.5s ease; }
.list-enter-active { transition: all 0.5s ease; }
.list-leave-active { transition: all 0.3s ease; position: absolute; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(30px); }</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 基础过渡演示
const show1 = ref(true)
const show2 = ref(true)
const show3 = ref(true)

// 列表过渡演示
let nextId = 6
const todos = ref([
  { id: 1, text: '学习 Vue 基础' },
  { id: 2, text: '掌握组合式 API' },
  { id: 3, text: '了解路由和状态管理' },
  { id: 4, text: '练习自定义指令' },
  { id: 5, text: '构建完整项目' },
])

function addTodo() {
  todos.value.push({ id: nextId++, text: `新任务 ${nextId - 1}` })
}

function removeTodo() {
  if (todos.value.length > 0) {
    todos.value.splice(0, 1)
  }
}

function shuffleTodos() {
  todos.value.sort(() => Math.random() - 0.5)
}
</script>

<style scoped>
/* 通用样式 */
.demo-page { max-width: 900px; margin: 0 auto; padding: 20px; }
.demo-page > h1 { text-align: center; margin-bottom: 8px; }
.desc { text-align: center; color: #64748b; margin-bottom: 32px; }
.demo-section { margin-bottom: 32px; padding: 24px; background: transparent; border-radius: 12px; border: 1px solid #e2e8f0; }
.demo-section h2 { margin: 0 0 8px; color: #1e293b; }
.tip { color: #64748b; font-size: 0.9rem; margin-bottom: 16px; padding: 8px 12px; background: #f0f9ff; border-radius: 6px; border-left: 3px solid #3b82f6; }
.demo-box { display: flex; flex-direction: column; gap: 16px; }
.result { padding: 16px; background: #f8fafc; border-radius: 8px; }
.result button { padding: 6px 14px; border: 1px solid #e2e8f0; border-radius: 6px; background: white; cursor: pointer; transition: all 0.2s; }
.result button:hover { background: #667eea; color: white; border-color: #667eea; }
.actions { display: flex; gap: 8px; margin-bottom: 12px; }
.animated-box { padding: 16px; background: #ede9fe; border-radius: 8px; margin-top: 12px; text-align: center; font-weight: bold; color: #7c3aed; }
.code-block { background: #1e293b; border-radius: 8px; padding: 16px; overflow-x: auto; }
.code-block pre { margin: 0; }
.code-block code { color: #e2e8f0; font-family: 'Fira Code', 'Consolas', monospace; font-size: 0.85rem; line-height: 1.6; }

/* ====== Fade 过渡 ====== */
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ====== Slide 过渡 ====== */
.slide-enter-active, .slide-leave-active { transition: all 0.4s ease; }
.slide-enter-from { transform: translateX(-30px); opacity: 0; }
.slide-leave-to { transform: translateX(30px); opacity: 0; }

/* ====== Bounce 过渡 ====== */
.bounce-enter-active { animation: bounce-in 0.5s; }
.bounce-leave-active { animation: bounce-in 0.5s reverse; }
@keyframes bounce-in {
  0% { transform: scale(0); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}

/* ====== 列表过渡 ====== */
.todo-list { list-style: none; padding: 0; }
.todo-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 16px; margin: 4px 0; background: #f0fdf4;
  border-radius: 6px; border: 1px solid #bbf7d0;
}
.todo-item button { border: none; background: none; color: #ef4444; cursor: pointer; font-size: 1rem; padding: 2px 6px; }

/* 列表过渡动画 */
.list-move, .list-enter-active, .list-leave-active { transition: all 0.5s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(30px); }
.list-leave-active { position: absolute; }
</style>