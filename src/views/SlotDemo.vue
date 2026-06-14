<!-- ============================================================
     插槽演示页面
     ============================================================
     演示 Vue 3 插槽系统：
     - 默认插槽
     - 具名插槽
     - 作用域插槽
     ============================================================ -->

<template>
  <div class="demo-page">
    <h1>🏷️ 插槽 (Slots)</h1>
    <p class="desc">插槽是 Vue 组件的内容分发机制，让组件更加灵活可复用。</p>

    <!-- 默认插槽 -->
    <section class="demo-section">
      <h2>1. 默认插槽</h2>
      <p class="tip">默认插槽允许父组件向子组件传递任意内容。</p>
      <div class="demo-box">
        <div class="result">
          <!-- 使用 Card 组件，中间的内容会填充到默认插槽 -->
          <Card>
            <p>这是通过默认插槽传递的内容！</p>
            <p>可以传递任意 HTML 或组件。</p>
          </Card>
        </div>
        <div class="code-block">
          <pre><code>// 子组件 Card.vue
<template>
  <div class="card">
    <slot>默认内容（当没有传入内容时显示）</slot>
  </div>
</template>

// 父组件使用
<Card>
  <p>这段内容会替换 slot</p>
</Card></code></pre>
        </div>
      </div>
    </section>

    <!-- 具名插槽 -->
    <section class="demo-section">
      <h2>2. 具名插槽</h2>
      <p class="tip">具名插槽允许向组件传递多个不同区域的内容。</p>
      <div class="demo-box">
        <div class="result">
          <!-- 使用 v-slot:name 或 #name 指定插槽 -->
          <Card>
            <template #header>
              <h3 style="margin:0;color:#667eea;">📋 自定义标题</h3>
            </template>
            <template #default>
              <p>这是主体内容区域。</p>
            </template>
            <template #footer>
              <p style="margin:0;font-size:0.85rem;color:#94a3b8;">这是底部区域</p>
            </template>
          </Card>
        </div>
        <div class="code-block">
          <pre><code>// 子组件定义具名插槽
<div class="card">
  <header><slot name="header"></slot></header>
  <main><slot></slot></main>          // 默认插槽
  <footer><slot name="footer"></slot></footer>
</div>

// 父组件使用具名插槽
<Card>
  <template #header>标题内容</template>
  <template #default>主体内容</template>
  <template #footer>底部内容</template>
</Card>

// #header 是 v-slot:header 的缩写</code></pre>
        </div>
      </div>
    </section>

    <!-- 作用域插槽 -->
    <section class="demo-section">
      <h2>3. 作用域插槽</h2>
      <p class="tip">作用域插槽允许子组件向父组件传递数据，由父组件决定如何渲染。</p>
      <div class="demo-box">
        <div class="result">
          <!-- 作用域插槽：子组件传递 item 和 index 给父组件 -->
          <List :items="fruits">
            <template #default="{ item, index }">
              <span :style="{ color: item.color }">
                {{ index + 1 }}. {{ item.name }} - {{ item.emoji }}
              </span>
            </template>
          </List>

          <p style="margin-top:16px;">同样的数据，不同的渲染方式：</p>
          <List :items="fruits">
            <template #default="{ item, index }">
              <button :style="{ background: item.color, color: 'white', border: 'none', padding: '4px 12px', borderRadius: '4px', margin: '2px' }">
                {{ item.name }}
              </button>
            </template>
          </List>
        </div>
        <div class="code-block">
          <pre><code>// 子组件 - 通过 slot 传递数据
<div v-for="(item, index) in items" :key="index">
  <slot :item="item" :index="index"></slot>
  //  :item 和 :index 是传给父组件的数据
</div>

// 父组件 - 接收子组件传递的数据
<List :items="fruits">
  <template #default="{ item, index }">
    // 解构出 item 和 index
    {{ index }} - {{ item.name }}
  </template>
</List></code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Card from '../components/Card.vue'
import List from '../components/List.vue'

// 水果数据 - 用于作用域插槽演示
const fruits = ref([
  { name: '苹果', emoji: '🍎', color: '#ef4444' },
  { name: '香蕉', emoji: '🍌', color: '#f59e0b' },
  { name: '葡萄', emoji: '🍇', color: '#8b5cf6' },
  { name: '西瓜', emoji: '🍉', color: '#16a34a' },
])
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
.code-block { background: #1e293b; border-radius: 8px; padding: 16px; overflow-x: auto; }
.code-block pre { margin: 0; }
.code-block code { color: #e2e8f0; font-family: 'Fira Code', 'Consolas', monospace; font-size: 0.85rem; line-height: 1.6; }
</style>