<!-- ============================================================
     计算属性与侦听器演示页面
     ============================================================
     本页面演示 Vue 3 的计算属性和侦听器：
     - computed：计算属性（带缓存）
     - watch：侦听器（精确控制）
     - watchEffect：自动追踪依赖的侦听器
     - computed 的 getter/setter 写法
     ============================================================ -->

<template>
  <div class="demo-page">
    <h1>🔍 计算属性与侦听器</h1>
    <p class="desc">computed 和 watch 是 Vue 中处理数据派生和副作用的核心工具。</p>

    <!-- ========== computed 基础 ========== -->
    <section class="demo-section">
      <h2>1. computed() - 计算属性</h2>
      <p class="tip">computed() 创建计算属性，基于响应式依赖进行缓存。只有依赖变化时才会重新计算。</p>
      
      <div class="demo-box">
        <div class="result">
          <p>姓: <input v-model="firstName" placeholder="请输入姓" /></p>
          <p>名: <input v-model="lastName" placeholder="请输入名" /></p>
          <p>全名 (computed): <strong>{{ fullName }}</strong></p>
          <p>全名长度: <strong>{{ nameLength }}</strong></p>
        </div>
        <div class="code-block">
          <pre><code>// computed() 创建只读计算属性
const firstName = ref('张')
const lastName = ref('三')

// 计算属性 - 自动缓存，依赖不变不重算
const fullName = computed(() => firstName.value + lastName.value)
const nameLength = computed(() => fullName.value.length)</code></pre>
        </div>
      </div>
    </section>

    <!-- ========== computed getter/setter ========== -->
    <section class="demo-section">
      <h2>2. computed 的 getter/setter 写法</h2>
      <p class="tip">computed 默认是只读的，但可以通过提供 getter 和 setter 来创建可写的计算属性。</p>
      
      <div class="demo-box">
        <div class="result">
          <p>可写全名: <input v-model="writableFullName" /></p>
          <p>姓: <strong>{{ firstName }}</strong> | 名: <strong>{{ lastName }}</strong></p>
        </div>
        <div class="code-block">
          <pre><code>// 可写计算属性 - 提供 get 和 set
const writableFullName = computed({
  // getter: 读取时调用
  get() {
    return firstName.value + lastName.value
  },
  // setter: 赋值时调用
  set(newValue) {
    firstName.value = newValue[0]
    lastName.value = newValue.slice(1)
  }
})

// 现在可以赋值了
writableFullName.value = '李四'  // firstName='李', lastName='四'</code></pre>
        </div>
      </div>
    </section>

    <!-- ========== watch 基础 ========== -->
    <section class="demo-section">
      <h2>3. watch() - 侦听器</h2>
      <p class="tip">watch() 用于侦听响应式数据的变化并执行副作用。需要明确指定侦听的数据源。</p>
      
      <div class="demo-box">
        <div class="result">
          <p>被侦听的值: <input v-model.number="watchedValue" type="number" /></p>
          <p>变化日志:</p>
          <ul class="log-list">
            <li v-for="(log, index) in watchLogs" :key="index">{{ log }}</li>
            <li v-if="watchLogs.length === 0" class="empty">暂无日志，修改上面的值试试</li>
          </ul>
        </div>
        <div class="code-block">
          <pre><code>// watch() 侦听单个 ref
watch(watchedValue, (newValue, oldValue) => {
  console.log(`值从 ${oldValue} 变为 ${newValue}`)
})

// watch 侦听多个数据源
watch([firstName, lastName], ([newFirst, newLast], [oldFirst, oldLast]) => {
  console.log('姓名发生变化')
}, { immediate: true })  // immediate: 立即执行一次</code></pre>
        </div>
      </div>
    </section>

    <!-- ========== watch 侦听对象 ========== -->
    <section class="demo-section">
      <h2>4. watch 侦听 reactive 对象</h2>
      <p class="tip">侦听 reactive 对象时，deep 选项默认为 true。侦听 getter 函数可以更精确地控制。</p>
      
      <div class="demo-box">
        <div class="result">
          <p>用户名: <input v-model="watchUser.name" /></p>
          <p>年龄: <input v-model.number="watchUser.age" type="number" /></p>
          <p>对象变化日志 (最近3条):</p>
          <ul class="log-list">
            <li v-for="(log, index) in objectWatchLogs.slice(-3)" :key="index">{{ log }}</li>
          </ul>
        </div>
        <div class="code-block">
          <pre><code>// 侦听 reactive 对象 - 自动深度侦听
watch(watchUser, (newValue) => {
  // 注意：newValue 和 watchUser 是同一个引用
  console.log('对象发生变化', newValue)
})

// 侦听对象的某个属性 - 使用 getter 函数
watch(
  () => watchUser.name,
  (newName, oldName) => {
    console.log(`名字从 ${oldName} 变为 ${newName}`)
  }
)</code></pre>
        </div>
      </div>
    </section>

    <!-- ========== watchEffect ========== -->
    <section class="demo-section">
      <h2>5. watchEffect() - 自动追踪侦听器</h2>
      <p class="tip">watchEffect() 自动追踪回调中的响应式依赖，无需指定侦听源。立即执行一次。</p>
      
      <div class="demo-box">
        <div class="result">
          <p>搜索关键词: <input v-model="searchKeyword" placeholder="输入关键词搜索" /></p>
          <p>搜索结果: <strong>{{ searchResult }}</strong></p>
          <p>搜索次数: <strong>{{ searchCount }}</strong></p>
        </div>
        <div class="code-block">
          <pre><code>// watchEffect - 自动追踪依赖
const searchKeyword = ref('')
const searchResult = ref('')

watchEffect(() => {
  // 自动追踪 searchKeyword 的依赖
  if (searchKeyword.value) {
    searchResult.value = `搜索 "${searchKeyword.value}" 的结果...`
  } else {
    searchResult.value = '请输入关键词'
  }
})

// watchEffect vs watch:
// 1. watchEffect 不需要指定侦听源
// 2. watchEffect 立即执行，watch 默认惰性
// 3. watchEffect 无法获取旧值
// 4. watch 更精确控制何时执行</code></pre>
        </div>
      </div>
    </section>

    <!-- ========== watch 选项 ========== -->
    <section class="demo-section">
      <h2>6. watch 的常用选项</h2>
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>选项</th>
              <th>说明</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>immediate</code></td>
              <td>创建时立即执行一次回调</td>
              <td>false</td>
            </tr>
            <tr>
              <td><code>deep</code></td>
              <td>深度侦听对象内部变化</td>
              <td>ref: false / reactive: true</td>
            </tr>
            <tr>
              <td><code>flush</code></td>
              <td>回调触发时机：pre/post/sync</td>
              <td>'pre'</td>
            </tr>
            <tr>
              <td><code>once</code></td>
              <td>只触发一次（Vue 3.4+）</td>
              <td>false</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, watchEffect } from 'vue'

// --------------------------------------------------
// 1. computed 基础
// --------------------------------------------------
const firstName = ref('张')
const lastName = ref('三')

// 只读计算属性
const fullName = computed(() => firstName.value + lastName.value)
const nameLength = computed(() => fullName.value.length)

// --------------------------------------------------
// 2. computed getter/setter
// --------------------------------------------------
const writableFullName = computed({
  get() {
    return firstName.value + lastName.value
  },
  set(newValue) {
    firstName.value = newValue[0] || ''
    lastName.value = newValue.slice(1) || ''
  },
})

// --------------------------------------------------
// 3. watch 基础
// --------------------------------------------------
const watchedValue = ref(0)
const watchLogs = ref([])

// 侦听单个 ref
watch(watchedValue, (newValue, oldValue) => {
  watchLogs.value.push(`值从 ${oldValue} 变为 ${newValue} (时间: ${new Date().toLocaleTimeString()})`)
  // 限制日志数量
  if (watchLogs.value.length > 10) {
    watchLogs.value.shift()
  }
})

// --------------------------------------------------
// 4. watch 侦听对象
// --------------------------------------------------
const watchUser = reactive({
  name: '李四',
  age: 28,
})
const objectWatchLogs = ref([])

// 侦听 reactive 对象（自动深度侦听）
watch(watchUser, (newValue) => {
  objectWatchLogs.value.push(`对象变化: ${JSON.stringify(newValue)} (时间: ${new Date().toLocaleTimeString()})`)
  if (objectWatchLogs.value.length > 20) {
    objectWatchLogs.value.shift()
  }
})

// --------------------------------------------------
// 5. watchEffect
// --------------------------------------------------
const searchKeyword = ref('')
const searchResult = ref('请输入关键词')
const searchCount = ref(0)

// watchEffect 自动追踪依赖
watchEffect(() => {
  if (searchKeyword.value) {
    searchResult.value = `搜索 "${searchKeyword.value}" 的结果...`
    searchCount.value++
  } else {
    searchResult.value = '请输入关键词'
  }
})
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
  background: transparent;
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
  margin: 6px 0;
}

.result input {
  padding: 6px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.9rem;
}

.log-list {
  margin: 8px 0 0;
  padding-left: 20px;
  font-size: 0.85rem;
  color: #64748b;
  max-height: 120px;
  overflow-y: auto;
}

.log-list li {
  margin: 2px 0;
}

.empty {
  color: #94a3b8;
  font-style: italic;
}

.code-block {
  background: #1e293b;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

.code-block pre { margin: 0; }

.code-block code {
  color: #e2e8f0;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.85rem;
  line-height: 1.6;
}

.comparison-table { overflow-x: auto; }

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

td { font-size: 0.9rem; }

code {
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.85rem;
  color: #667eea;
}
</style>