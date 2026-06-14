<!-- ============================================================
     组件通信演示页面
     ============================================================ -->

<template>
  <div class="demo-page">
    <h1>🔗 组件通信</h1>
    <p class="desc">Vue 组件通信是构建复杂应用的关键，不同场景使用不同的通信方式。</p>

    <!-- ========== Props / Emit ========== -->
    <section class="demo-section">
      <h2>1. Props / Emit - 父子组件通信</h2>
      <p class="tip">Props 用于父→子传递数据，Emit 用于子→父发送事件。这是最基本的组件通信方式。</p>
      
      <div class="demo-box">
        <div class="result">
          <p>父组件状态 - 计数: <strong>{{ parentCount }}</strong></p>
          <p>父组件收到的消息: <strong>{{ receivedMessage || '暂无' }}</strong></p>
        </div>
        
        <ChildComponent
          title="来自父组件的标题"
          :count="parentCount"
          :user="{ name: '王五', age: 30 }"
          @increment="parentCount += $event"
          @decrement="parentCount -= $event"
          @send-message="receivedMessage = $event"
        />
        
        <!-- 使用 v-text 渲染代码字符串，避免模板解析问题 -->
        <div class="code-block">
          <pre><code v-text="propsEmitCode"></code></pre>
        </div>
      </div>
    </section>

    <!-- ========== v-model 组件绑定 ========== -->
    <section class="demo-section">
      <h2>2. v-model - 双向绑定</h2>
      <p class="tip">v-model 在组件上本质是 :modelValue + @update:modelValue 的语法糖。</p>
      
      <div class="demo-box">
        <div class="result">
          <p>自定义输入组件的值: <strong>{{ customInputValue }}</strong></p>
        </div>
        <CustomInput v-model="customInputValue" />
        
        <p style="margin-top: 12px;">带参数的 v-model:</p>
        <CustomInput v-model:title="customTitle" />
        <p>标题值: <strong>{{ customTitle }}</strong></p>
        
        <div class="code-block">
          <pre><code v-text="vModelCode"></code></pre>
        </div>
      </div>
    </section>

    <!-- ========== provide / inject ========== -->
    <section class="demo-section">
      <h2>3. provide / inject - 跨层级通信</h2>
      <p class="tip">provide/inject 允许祖先组件向所有后代组件注入数据，无需逐层传递 props。</p>
      
      <div class="demo-box">
        <div class="result">
          <p>祖先组件提供的数据:</p>
          <p>主题: <strong>{{ theme }}</strong> | 语言: <strong>{{ language }}</strong></p>
        </div>
        <DeepChild />
        
        <div class="code-block">
          <pre><code v-text="provideInjectCode"></code></pre>
        </div>
      </div>
    </section>

    <!-- ========== Template Refs ========== -->
    <section class="demo-section">
      <h2>4. Template Refs - 直接访问子组件</h2>
      <p class="tip">使用 ref 可以直接访问 DOM 元素或子组件实例，但应避免过度使用。</p>
      
      <div class="demo-box">
        <div class="result">
          <p>子组件暴露的数据: <strong>{{ childExposedData }}</strong></p>
        </div>
        <ChildWithExpose ref="childRef" />
        <div class="actions">
          <button @click="accessChild">访问子组件方法</button>
        </div>
        
        <div class="code-block">
          <pre><code v-text="refsCode"></code></pre>
        </div>
      </div>
    </section>

    <!-- ========== 通信方式对比 ========== -->
    <section class="demo-section">
      <h2>5. 组件通信方式对比</h2>
      <div class="comparison-table">
        <table>
          <thead>
            <tr><th>方式</th><th>方向</th><th>适用场景</th></tr>
          </thead>
          <tbody>
            <tr><td>Props / Emit</td><td>父 ↔ 子</td><td>最基本的通信，父子组件</td></tr>
            <tr><td>v-model</td><td>父 ↔ 子</td><td>表单类组件的双向绑定</td></tr>
            <tr><td>provide / inject</td><td>祖先 → 后代</td><td>跨多层组件传递</td></tr>
            <tr><td>Template Refs</td><td>父 → 子</td><td>直接操作子组件/DOM</td></tr>
            <tr><td>Pinia Store</td><td>任意组件</td><td>全局状态管理</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import ChildComponent from '../components/ChildComponent.vue'
import CustomInput from '../components/CustomInput.vue'
import DeepChild from '../components/DeepChild.vue'
import ChildWithExpose from '../components/ChildWithExpose.vue'

// --------------------------------------------------
// 1. Props / Emit 演示
// --------------------------------------------------
const parentCount = ref(0)
const receivedMessage = ref('')

// --------------------------------------------------
// 2. v-model 演示
// --------------------------------------------------
const customInputValue = ref('Hello Vue')
const customTitle = ref('默认标题')

// --------------------------------------------------
// 3. provide / inject 演示
// --------------------------------------------------
const theme = ref('dark')
const language = ref('zh-CN')

// provide 向所有后代组件注入数据
provide('theme', theme)
provide('language', language)

// --------------------------------------------------
// 4. Template Refs 演示
// --------------------------------------------------
const childRef = ref(null)
const childExposedData = ref('')

function accessChild() {
  if (childRef.value) {
    childRef.value.increment()
    childExposedData.value = childRef.value.count
  }
}

// --------------------------------------------------
// 代码示例（使用 JS 字符串避免模板解析问题）
// --------------------------------------------------
const propsEmitCode = `// 父组件模板
<ChildComponent
  title="来自父组件的标题"     // 传递静态 prop
  :count="parentCount"         // 传递动态 prop（v-bind 缩写）
  :user="{ name: '王五', age: 30 }"  // 传递对象
  @increment="parentCount += $event"  // 监听子组件事件
  @send-message="handleMessage"       // $event 是子组件传递的数据
/>

// 子组件中
const props = defineProps({ title: String, count: Number })
const emit = defineEmits(['increment', 'send-message'])
emit('increment', 1)  // 触发事件并传递数据`

const vModelCode = `// 父组件使用 v-model
<CustomInput v-model="value" />
// 等价于：
// <CustomInput :modelValue="value"
//   @update:modelValue="value = $event" />

// 带参数的 v-model
<CustomInput v-model:title="title" />
// 等价于：
// <CustomInput :title="title"
//   @update:title="title = $event" />

// 子组件实现（Vue 3.4+）
const modelValue = defineModel()          // 默认 v-model
const title = defineModel('title')        // 带参数的 v-model`

const provideInjectCode = `// 祖先组件 - provide 提供数据
import { provide, ref } from 'vue'

const theme = ref('dark')
provide('theme', theme)          // 提供响应式数据
provide('language', 'zh-CN')     // 提供静态数据

// 后代组件 - inject 注入数据（无论层级多深）
import { inject } from 'vue'

const theme = inject('theme', 'light')    // 第二个参数是默认值
const language = inject('language', 'en')

// 注意：provide/inject 的数据不是响应式的
// 除非 provide 的是 ref 或 reactive`

const refsCode = `// 父组件 - 使用 ref 引用子组件
const childRef = ref(null)

// 访问子组件暴露的方法和数据
childRef.value.someMethod()
childRef.value.someData

// 子组件 - 使用 defineExpose 暴露接口
// 默认情况下，script setup 组件是封闭的
// 必须使用 defineExpose 显式暴露
defineExpose({
  someData,
  someMethod,
})`
</script>

<style scoped>
.demo-page { max-width: 900px; margin: 0 auto; padding: 20px; }
.demo-page > h1 { text-align: center; margin-bottom: 8px; }
.desc { text-align: center; color: #64748b; margin-bottom: 32px; }
.demo-section {
  margin-bottom: 32px; padding: 24px; background: white;
  border-radius: 12px; border: 1px solid #e2e8f0;
}
.demo-section h2 { margin: 0 0 8px; color: #1e293b; }
.tip {
  color: #64748b; font-size: 0.9rem; margin-bottom: 16px;
  padding: 8px 12px; background: #f0f9ff; border-radius: 6px; border-left: 3px solid #3b82f6;
}
.demo-box { display: flex; flex-direction: column; gap: 16px; }
.result { padding: 16px; background: #f8fafc; border-radius: 8px; }
.result p { margin: 4px 0; }
.actions { display: flex; gap: 8px; }
.actions button {
  padding: 8px 16px; border: 1px solid #e2e8f0; border-radius: 6px;
  background: white; cursor: pointer; transition: all 0.2s;
}
.actions button:hover { background: #667eea; color: white; border-color: #667eea; }
.code-block { background: #1e293b; border-radius: 8px; padding: 16px; overflow-x: auto; }
.code-block pre { margin: 0; }
.code-block code {
  color: #e2e8f0; font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.85rem; line-height: 1.6; white-space: pre;
}
.comparison-table { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #e2e8f0; }
th { background: #f8fafc; color: #667eea; font-weight: 600; }
td { font-size: 0.9rem; }
</style>