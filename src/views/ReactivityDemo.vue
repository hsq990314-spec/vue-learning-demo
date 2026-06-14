<!-- ============================================================
     响应式系统演示页面
     ============================================================
     本页面全面演示 Vue 3 的响应式 API：
     - ref：基本响应式引用
     - reactive：深层响应式对象
     - toRefs：将 reactive 对象转为 ref 集合
     - shallowRef / shallowReactive：浅层响应式
     - readonly：只读代理
     - toRaw / markRaw：原始对象操作
     ============================================================ -->

<template>
  <div class="demo-page">
    <h1>⚡ 响应式系统</h1>
    <p class="desc">Vue 3 的响应式系统基于 Proxy 实现，能够自动追踪依赖关系并在数据变化时触发更新。</p>

    <!-- ========== ref 演示 ========== -->
    <section class="demo-section">
      <h2>1. ref() - 基本响应式引用</h2>
      <p class="tip">ref() 用于创建基本类型或任意类型的响应式数据。在 JS 中通过 .value 访问，模板中自动解包。</p>
      
      <div class="demo-box">
        <div class="result">
          <p>计数器: <strong>{{ count }}</strong></p>
          <p>消息: <strong>{{ message }}</strong></p>
        </div>
        <div class="actions">
          <button @click="count++">count++</button>
          <button @click="count--">count--</button>
          <button @click="message = '消息已更新！时间:' + Date.now()">更新消息</button>
          <button @click="count = 0; message = 'Hello Vue 3'">重置</button>
        </div>
        <div class="code-block">
          <pre><code>// ref() 创建响应式引用
const count = ref(0)
const message = ref('Hello Vue 3')

// 在 JS 中需要 .value 访问
count.value++
message.value = '新消息'

// 在模板中自动解包，不需要 .value
// {{ count }}  ✅
// {{ count.value }}  ❌ 不需要</code></pre>
        </div>
      </div>
    </section>

    <!-- ========== reactive 演示 ========== -->
    <section class="demo-section">
      <h2>2. reactive() - 响应式对象</h2>
      <p class="tip">reactive() 用于创建深层响应式对象。不需要 .value，直接访问属性。适合复杂对象结构。</p>
      
      <div class="demo-box">
        <div class="result">
          <p>姓名: <strong>{{ user.name }}</strong></p>
          <p>年龄: <strong>{{ user.age }}</strong></p>
          <p>爱好: <strong>{{ user.hobbies.join(', ') }}</strong></p>
          <p>地址: <strong>{{ user.address.city }} - {{ user.address.district }}</strong></p>
        </div>
        <div class="actions">
          <button @click="user.age++">年龄+1</button>
          <button @click="addHobby">添加爱好</button>
          <button @click="user.address.city = '上海'">搬到上海</button>
          <button @click="resetUser">重置</button>
        </div>
        <div class="code-block">
          <pre><code>// reactive() 创建深层响应式对象
const user = reactive({
  name: '张三',
  age: 25,
  hobbies: ['编程', '阅读'],
  address: { city: '北京', district: '海淀' }
})

// 直接访问属性，不需要 .value
user.age++  // ✅
user.hobbies.push('音乐')  // ✅ Vue 3 可以检测到</code></pre>
        </div>
      </div>
    </section>

    <!-- ========== toRefs 演示 ========== -->
    <section class="demo-section">
      <h2>3. toRefs() - 解构响应式对象</h2>
      <p class="tip">toRefs() 将 reactive 对象的每个属性转为 ref，保持响应性。解决解构 reactive 对象丢失响应的问题。</p>
      
      <div class="demo-box">
        <div class="result">
          <p>解构后的姓名: <strong>{{ name }}</strong></p>
          <p>解构后的年龄: <strong>{{ age }}</strong></p>
          <p class="warning">⚠️ 直接解构 reactive 会丢失响应性！必须使用 toRefs()</p>
        </div>
        <div class="code-block">
          <pre><code>// ❌ 错误：直接解构会丢失响应性
const { name, age } = user  // name, age 不是响应式的

// ✅ 正确：使用 toRefs 保持响应性
const { name, age } = toRefs(user)
// 现在 name 和 age 是 ref，修改它们会同步到 user 对象</code></pre>
        </div>
      </div>
    </section>

    <!-- ========== shallowRef 演示 ========== -->
    <section class="demo-section">
      <h2>4. shallowRef() - 浅层响应式</h2>
      <p class="tip">shallowRef() 只追踪 .value 的变化，不会深层转换。修改内部属性不会触发更新，需要整体替换。</p>
      
      <div class="demo-box">
        <div class="result">
          <p>浅层状态: <strong>{{ JSON.stringify(shallowState) }}</strong></p>
          <p>更新计数: <strong>{{ shallowUpdateCount }}</strong></p>
        </div>
        <div class="actions">
          <!-- 修改内部属性不会触发更新 -->
          <button @click="shallowState.value.count++">修改内部(不触发更新)</button>
          <!-- 整体替换 .value 会触发更新 -->
          <button @click="triggerShallowUpdate">整体替换(触发更新)</button>
        </div>
        <div class="code-block">
          <pre><code>// shallowRef - 只追踪 .value 的引用变化
const shallowState = shallowRef({ count: 0 })

// ❌ 修改内部属性不会触发视图更新
shallowState.value.count++  // 视图不会更新！

// ✅ 整体替换 .value 会触发更新
shallowState.value = { count: shallowState.value.count + 1 }

// 使用 triggerRef() 强制触发更新
// triggerRef(shallowState)</code></pre>
        </div>
      </div>
    </section>

    <!-- ========== readonly 演示 ========== -->
    <section class="demo-section">
      <h2>5. readonly() - 只读代理</h2>
      <p class="tip">readonly() 创建对象的只读代理，任何修改操作都会被阻止并在开发模式下发出警告。</p>
      
      <div class="demo-box">
        <div class="result">
          <p>原始数据: <strong>{{ originalData.count }}</strong></p>
          <p>只读数据: <strong>{{ readOnlyData.count }}</strong></p>
          <p v-if="readonlyWarning" class="warning">⚠️ {{ readonlyWarning }}</p>
        </div>
        <div class="actions">
          <button @click="originalData.count++">修改原始数据 ✅</button>
          <button @click="tryModifyReadonly">尝试修改只读数据 ❌</button>
        </div>
        <div class="code-block">
          <pre><code>// readonly() 创建只读代理
const originalData = reactive({ count: 0 })
const readOnlyData = readonly(originalData)

// 修改原始数据 - 允许，且只读数据同步更新
originalData.count++  // ✅

// 修改只读数据 - 被阻止
readOnlyData.count++  // ❌ Set operation on key 'count' failed</code></pre>
        </div>
      </div>
    </section>

    <!-- ========== ref vs reactive 对比 ========== -->
    <section class="demo-section">
      <h2>6. ref vs reactive 对比</h2>
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>特性</th>
              <th>ref()</th>
              <th>reactive()</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>适用类型</td>
              <td>任意类型（基本/引用）</td>
              <td>仅对象/数组</td>
            </tr>
            <tr>
              <td>访问方式</td>
              <td>JS 中需要 .value</td>
              <td>直接访问属性</td>
            </tr>
            <tr>
              <td>解构</td>
              <td>解构后仍为 ref</td>
              <td>解构后丢失响应性</td>
            </tr>
            <tr>
              <td>重新赋值</td>
              <td>可以 .value = 新值</td>
              <td>不能直接替换整个对象</td>
            </tr>
            <tr>
              <td>推荐场景</td>
              <td>单个值、需要重新赋值</td>
              <td>复杂对象结构</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, shallowRef, readonly, triggerRef } from 'vue'

// --------------------------------------------------
// 1. ref 演示
// --------------------------------------------------
const count = ref(0)
const message = ref('Hello Vue 3')

// --------------------------------------------------
// 2. reactive 演示
// --------------------------------------------------
const user = reactive({
  name: '张三',
  age: 25,
  hobbies: ['编程', '阅读'],
  address: {
    city: '北京',
    district: '海淀',
  },
})

// 添加爱好的方法
const hobbyList = ['音乐', '运动', '旅行', '摄影', '烹饪']
function addHobby() {
  const available = hobbyList.filter((h) => !user.hobbies.includes(h))
  if (available.length > 0) {
    user.hobbies.push(available[0])
  }
}

function resetUser() {
  user.name = '张三'
  user.age = 25
  user.hobbies.splice(0, user.hobbies.length, '编程', '阅读')
  user.address.city = '北京'
  user.address.district = '海淀'
}

// --------------------------------------------------
// 3. toRefs 演示
// --------------------------------------------------
// 使用 toRefs 解构 reactive 对象，保持响应性
const { name, age } = toRefs(user)

// --------------------------------------------------
// 4. shallowRef 演示
// --------------------------------------------------
const shallowState = shallowRef({ count: 0 })
const shallowUpdateCount = ref(0)

function triggerShallowUpdate() {
  // 整体替换 .value 来触发更新
  shallowState.value = { count: shallowState.value.count + 1 }
  shallowUpdateCount.value++
}

// --------------------------------------------------
// 5. readonly 演示
// --------------------------------------------------
const originalData = reactive({ count: 0 })
const readOnlyData = readonly(originalData)
const readonlyWarning = ref('')

function tryModifyReadonly() {
  try {
    // 尝试修改只读数据（会被阻止）
    readOnlyData.count++
    readonlyWarning.value = '修改被阻止！readonly 数据不可修改'
  } catch (e) {
    readonlyWarning.value = `修改失败: ${e.message}`
  }
  // 3秒后清除警告
  setTimeout(() => {
    readonlyWarning.value = ''
  }, 3000)
}
</script>

<style scoped>
.demo-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.demo-page > h1 {
  text-align: center;
  margin-bottom: 8px;
}

.desc {
  text-align: center;
  color: #64748b;
  margin-bottom: 32px;
}

.demo-section {
  margin-bottom: 32px;
  padding: 24px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.demo-section h2 {
  margin: 0 0 8px;
  color: #1e293b;
}

.tip {
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 16px;
  padding: 8px 12px;
  background: #f0f9ff;
  border-radius: 6px;
  border-left: 3px solid #3b82f6;
}

.demo-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.result {
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
}

.result p {
  margin: 4px 0;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.actions button {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.actions button:hover {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.code-block {
  background: #1e293b;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
}

.code-block code {
  color: #e2e8f0;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.85rem;
  line-height: 1.6;
}

.warning {
  color: #f59e0b;
  font-weight: bold;
}

.comparison-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

th {
  background: #f8fafc;
  color: #667eea;
  font-weight: 600;
}

td {
  font-size: 0.9rem;
}
</style>