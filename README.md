# 🟢 Vue 3 学习演示项目

> 一个全面的 Vue 3 教学演示项目，涵盖 Vue 3 核心功能，配有详细的中文注释，帮助初学者快速掌握 Vue 框架。

## 📋 目录

- [项目简介](#项目简介)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [功能模块详解](#功能模块详解)
  - [1. 响应式系统](#1-响应式系统-reactivity)
  - [2. 计算属性与侦听器](#2-计算属性与侦听器-computed--watch)
  - [3. 组件系统](#3-组件系统-components)
  - [4. 自定义指令](#4-自定义指令-directives)
  - [5. 路由系统](#5-路由系统-vue-router)
  - [6. 状态管理](#6-状态管理-pinia)
  - [7. 组合式函数](#7-组合式函数-composables)
  - [8. 过渡动画](#8-过渡动画-transitions)
  - [9. 插槽系统](#9-插槽系统-slots)
- [Vue 3 核心概念速查](#vue-3-核心概念速查)
- [学习路线建议](#学习路线建议)

---

## 项目简介

本项目是一个 **Vue 3 交互式教学网页**，通过 9 个独立的功能模块，全面展示 Vue 3 的核心特性。每个模块都包含：

- ✅ **可交互的实时演示** — 所有功能都可以直接操作体验
- ✅ **详细的中文注释** — 每行关键代码都有注释说明
- ✅ **配套代码示例** — 每个演示都附带核心代码片段
- ✅ **最佳实践** — 展示 Vue 3 推荐的写法

---

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| **Vue 3** | ^3.4 | 核心框架，使用组合式 API |
| **Vue Router** | ^4.x | 官方路由管理 |
| **Pinia** | ^2.x | 官方状态管理（替代 Vuex） |
| **Vite** | ^5.x | 下一代前端构建工具 |
| **CSS3** | - | 过渡动画、自定义属性等 |

---

## 快速开始

### 环境要求

- Node.js >= 16
- npm >= 7

### 安装与运行

```bash
# 进入项目目录
cd vue-learning-demo

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

启动后访问 `http://localhost:5173` 即可查看演示。

---

## 项目结构

```
vue-learning-demo/
├── index.html                  # HTML 入口文件
├── package.json                # 项目配置和依赖
├── vite.config.js              # Vite 构建配置
├── README.md                   # 项目说明文档
└── src/
    ├── main.js                 # 应用入口，创建 Vue 实例
    ├── App.vue                 # 根组件，导航栏 + 路由出口
    ├── style.css               # 全局样式
    ├── router/
    │   └── index.js            # 路由配置（动态路由、嵌套路由、导航守卫）
    ├── stores/
    │   ├── counter.js          # 计数器 Store（Pinia）
    │   └── user.js             # 用户 Store（异步 Action）
    ├── composables/
    │   ├── useMouse.js         # 鼠标位置追踪
    │   ├── useCounter.js       # 计数器逻辑复用
    │   ├── useLocalStorage.js  # 本地存储同步
    │   └── useFetch.js         # 数据请求封装
    ├── components/
    │   ├── ChildComponent.vue  # 子组件（Props、Emits）
    │   ├── CustomInput.vue     # 自定义输入框（v-model）
    │   ├── DeepChild.vue       # 深层子组件（Provide/Inject）
    │   ├── ChildWithExpose.vue # 子组件暴露方法（defineExpose）
    │   ├── Card.vue            # 卡片组件（默认/具名插槽）
    │   └── List.vue            # 列表组件（作用域插槽）
    └── views/
        ├── HomeView.vue        # 首页（项目概览）
        ├── ReactivityDemo.vue  # 响应式系统演示
        ├── ComputedWatchDemo.vue # 计算属性与侦听器
        ├── ComponentDemo.vue   # 组件通信演示
        ├── DirectiveDemo.vue   # 自定义指令演示
        ├── RouterDemo.vue      # 路由系统演示
        ├── StoreDemo.vue       # 状态管理演示
        ├── ComposableDemo.vue  # 组合式函数演示
        ├── TransitionDemo.vue  # 过渡动画演示
        ├── SlotDemo.vue        # 插槽系统演示
        ├── UserView.vue        # 用户详情页（动态路由）
        └── NotFoundView.vue    # 404 页面
```

---

## 功能模块详解

### 1. 响应式系统 (Reactivity)

**文件**: `src/views/ReactivityDemo.vue`

演示 Vue 3 响应式系统的核心 API：

| API | 说明 |
|-----|------|
| `ref()` | 创建基本类型的响应式数据，通过 `.value` 访问 |
| `reactive()` | 创建对象类型的响应式数据，直接访问属性 |
| `readonly()` | 创建只读的响应式数据，不可修改 |
| `shallowRef()` | 浅层 ref，只有 `.value` 的替换是响应式的 |
| `shallowReactive()` | 浅层 reactive，只有根级属性是响应式的 |
| `toRef()` | 将 reactive 的某个属性转为 ref |
| `toRefs()` | 将 reactive 的所有属性转为 ref 对象 |
| `toRaw()` | 获取响应式对象的原始对象 |

**核心概念**：
```javascript
// ref - 适用于基本类型
const count = ref(0)
count.value++  // 修改需要 .value

// reactive - 适用于对象类型
const state = reactive({ name: 'Vue', version: 3 })
state.name = 'Vue 3'  // 直接修改，不需要 .value

// 模板中自动解包，不需要 .value
// {{ count }} 而不是 {{ count.value }}
```

---

### 2. 计算属性与侦听器 (Computed & Watch)

**文件**: `src/views/ComputedWatchDemo.vue`

#### computed - 计算属性

```javascript
// 基础计算属性（只读）
const fullName = computed(() => firstName.value + ' ' + lastName.value)

// 可写计算属性
const fullName = computed({
  get: () => firstName.value + ' ' + lastName.value,
  set: (val) => {
    const parts = val.split(' ')
    firstName.value = parts[0]
    lastName.value = parts[1]
  }
})
```

#### watch - 侦听器

```javascript
// 侦听单个 ref
watch(count, (newVal, oldVal) => { ... })

// 侦听多个源
watch([firstName, lastName], ([newFirst, newLast]) => { ... })

// 侦听 reactive 对象的属性（需要用 getter 函数）
watch(() => state.name, (newName) => { ... })

// 深度侦听
watch(state, (newState) => { ... }, { deep: true })

// 立即执行
watch(count, (newVal) => { ... }, { immediate: true })
```

#### watchEffect - 自动追踪依赖

```javascript
// 自动追踪回调中使用的响应式数据
watchEffect(() => {
  console.log(`名字变成了: ${firstName.value}`)
})
```

---

### 3. 组件系统 (Components)

**文件**: `src/views/ComponentDemo.vue` 及 `src/components/` 目录

#### Props - 父传子

```vue
<!-- 父组件 -->
<ChildComponent title="Hello" :count="5" />

<!-- 子组件 -->
<script setup>
const props = defineProps({
  title: { type: String, required: true },
  count: { type: Number, default: 0 }
})
</script>
```

#### Emits - 子传父

```vue
<!-- 子组件 -->
<script setup>
const emit = defineEmits(['update', 'delete'])
emit('update', newValue)
</script>

<!-- 父组件 -->
<ChildComponent @update="handleUpdate" @delete="handleDelete" />
```

#### v-model - 双向绑定

```vue
<!-- 父组件 -->
<CustomInput v-model="searchText" />

<!-- 子组件 CustomInput.vue -->
<script setup>
const model = defineModel()  // Vue 3.4+ 语法
</script>
<template>
  <input :value="model" @input="model = $event.target.value" />
</template>
```

#### Provide / Inject - 跨层级传递

```vue
<!-- 祖先组件 -->
<script setup>
import { provide, ref } from 'vue'
const theme = ref('dark')
provide('theme', theme)  // 提供数据
provide('toggleTheme', () => theme.value = theme.value === 'dark' ? 'light' : 'dark')
</script>

<!-- 后代组件（任意深度） -->
<script setup>
import { inject } from 'vue'
const theme = inject('theme')          // 注入数据
const toggleTheme = inject('toggleTheme')
</script>
```

#### defineExpose - 暴露方法给父组件

```vue
<!-- 子组件 -->
<script setup>
import { ref } from 'vue'
const count = ref(0)
const reset = () => count.value = 0
defineExpose({ count, reset })  // 暴露给父组件通过 ref 访问
</script>

<!-- 父组件 -->
<script setup>
import { ref } from 'vue'
const childRef = ref(null)
childRef.value?.reset()  // 调用子组件暴露的方法
</script>
<template>
  <ChildWithExpose ref="childRef" />
</template>
```

---

### 4. 自定义指令 (Directives)

**文件**: `src/views/DirectiveDemo.vue`

```javascript
// 自定义指令定义
const vFocus = {
  mounted(el) {
    el.focus()  // 元素挂载时自动获取焦点
  }
}

const vColor = {
  mounted(el, binding) {
    el.style.color = binding.value  // binding.value 获取指令值
  },
  updated(el, binding) {
    el.style.color = binding.value
  }
}

// 使用
// <input v-focus />
// <p v-color="'red'">红色文字</p>
// <p v-color="colorVar">动态颜色</p>
```

**指令钩子函数**：
| 钩子 | 触发时机 |
|------|---------|
| `created` | 元素创建后 |
| `beforeMount` | 挂载前 |
| `mounted` | 挂载后 |
| `beforeUpdate` | 更新前 |
| `updated` | 更新后 |
| `beforeUnmount` | 卸载前 |
| `unmounted` | 卸载后 |

---

### 5. 路由系统 (Vue Router)

**文件**: `src/views/RouterDemo.vue`、`src/router/index.js`

#### 路由配置

```javascript
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/user/:id', component: UserView },      // 动态路由
    { path: '/about', component: AboutView, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', component: NotFound } // 404 捕获
  ]
})
```

#### 编程式导航

```javascript
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

router.push('/home')              // 跳转
router.push({ name: 'user', params: { id: 1 } })  // 命名路由
router.replace('/login')          // 替换（不留历史记录）
router.go(-1)                     // 后退

route.params.id                   // 获取路由参数
route.query.search                // 获取查询参数
route.meta.requiresAuth           // 获取路由元信息
```

#### 导航守卫

```javascript
// 全局前置守卫
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !isLoggedIn) {
    return '/login'  // 重定向到登录页
  }
})

// 路由独享守卫
{ path: '/admin', beforeEnter: (to, from) => { ... } }

// 组件内守卫
onBeforeRouteEnter((to, from) => { ... })
onBeforeRouteLeave((to, from) => { ... })
```

---

### 6. 状态管理 (Pinia)

**文件**: `src/views/StoreDemo.vue`、`src/stores/`

#### 定义 Store（组合式写法）

```javascript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)

  // Getters
  const doubleCount = computed(() => count.value * 2)

  // Actions
  function increment() { count.value++ }

  return { count, doubleCount, increment }
})
```

#### 使用 Store

```javascript
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const counter = useCounterStore()

// 直接访问
counter.count        // State
counter.doubleCount  // Getter
counter.increment()  // Action

// 解构 - 必须使用 storeToRefs 保持响应性！
const { count, doubleCount } = storeToRefs(counter)  // ✅ 响应式
const { count } = counter                             // ❌ 丢失响应性

// Action 可以直接解构
const { increment } = counter  // ✅ Action 不需要 storeToRefs
```

---

### 7. 组合式函数 (Composables)

**文件**: `src/views/ComposableDemo.vue`、`src/composables/`

Composables 是 Vue 3 中复用有状态逻辑的推荐方式。

#### 命名约定

- 函数名以 `use` 开头（如 `useMouse`、`useFetch`）
- 返回值使用 `ref` 或 `reactive` 保持响应性
- 在 `setup` 中调用，确保在正确的上下文中

#### 示例：useMouse

```javascript
// composables/useMouse.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}
```

#### 示例：useLocalStorage

```javascript
// composables/useLocalStorage.js
export function useLocalStorage(key, defaultValue) {
  const data = ref(localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : defaultValue)

  watch(data, (val) => {
    localStorage.setItem(key, JSON.stringify(val))
  })

  return data
}
```

---

### 8. 过渡动画 (Transitions)

**文件**: `src/views/TransitionDemo.vue`

#### Transition - 单元素过渡

```vue
<Transition name="fade">
  <p v-if="show">淡入淡出</p>
</Transition>
```

```css
/* 6 个 CSS 类名 */
.fade-enter-from   { opacity: 0; }        /* 进入开始 */
.fade-enter-active { transition: opacity 0.5s; } /* 进入过程 */
.fade-enter-to     { opacity: 1; }        /* 进入结束 */
.fade-leave-from   { opacity: 1; }        /* 离开开始 */
.fade-leave-active { transition: opacity 0.5s; } /* 离开过程 */
.fade-leave-to     { opacity: 0; }        /* 离开结束 */
```

#### TransitionGroup - 列表过渡

```vue
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item.id">{{ item.text }}</li>
</TransitionGroup>
```

```css
.list-move { transition: transform 0.5s ease; }
.list-enter-active { transition: all 0.5s ease; }
.list-leave-active { transition: all 0.3s ease; position: absolute; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(30px); }
```

---

### 9. 插槽系统 (Slots)

**文件**: `src/views/SlotDemo.vue`、`src/components/Card.vue`、`src/components/List.vue`

#### 默认插槽

```vue
<!-- 子组件 -->
<template>
  <div class="card">
    <slot>默认内容</slot>
  </div>
</template>

<!-- 父组件 -->
<Card>
  <p>这段内容会替换 slot</p>
</Card>
```

#### 具名插槽

```vue
<!-- 子组件 -->
<template>
  <div class="card">
    <header><slot name="header"></slot></header>
    <main><slot></slot></main>
    <footer><slot name="footer"></slot></footer>
  </div>
</template>

<!-- 父组件 -->
<Card>
  <template #header>标题</template>
  <template #default>内容</template>
  <template #footer>底部</template>
</Card>
```

#### 作用域插槽

```vue
<!-- 子组件 - 向父组件传递数据 -->
<template>
  <div v-for="(item, index) in items" :key="index">
    <slot :item="item" :index="index"></slot>
  </div>
</template>

<!-- 父组件 - 接收子组件数据 -->
<List :items="fruits">
  <template #default="{ item, index }">
    {{ index }} - {{ item.name }}
  </template>
</List>
```

---

## Vue 3 核心概念速查

### 组合式 API vs 选项式 API

```vue
<!-- 选项式 API（Vue 2 风格） -->
<script>
export default {
  data() { return { count: 0 } },
  computed: { double() { return this.count * 2 } },
  methods: { increment() { this.count++ } },
  mounted() { console.log('mounted') }
}
</script>

<!-- 组合式 API（Vue 3 推荐） -->
<script setup>
import { ref, computed, onMounted } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)
const increment = () => count.value++
onMounted(() => console.log('mounted'))
</script>
```

### 常用 API 速查

| API | 用途 | 示例 |
|-----|------|------|
| `ref()` | 创建响应式数据（基本类型） | `const count = ref(0)` |
| `reactive()` | 创建响应式数据（对象类型） | `const state = reactive({})` |
| `computed()` | 创建计算属性 | `const double = computed(() => count.value * 2)` |
| `watch()` | 侦听数据变化 | `watch(count, (val) => { ... })` |
| `watchEffect()` | 自动追踪依赖侦听 | `watchEffect(() => { ... })` |
| `onMounted()` | 挂载后生命周期 | `onMounted(() => { ... })` |
| `onUnmounted()` | 卸载前生命周期 | `onUnmounted(() => { ... })` |
| `provide()` | 提供跨层级数据 | `provide('key', value)` |
| `inject()` | 注入跨层级数据 | `const val = inject('key')` |
| `defineProps()` | 定义组件属性 | `const props = defineProps({})` |
| `defineEmits()` | 定义组件事件 | `const emit = defineEmits([])` |
| `defineExpose()` | 暴露组件方法 | `defineExpose({ method })` |
| `defineModel()` | 定义双向绑定 | `const model = defineModel()` |
| `useRouter()` | 获取路由实例 | `const router = useRouter()` |
| `useRoute()` | 获取当前路由 | `const route = useRoute()` |
| `storeToRefs()` | 解构 Store | `const { count } = storeToRefs(store)` |

### 模板指令速查

| 指令 | 用途 | 示例 |
|------|------|------|
| `v-bind` / `:` | 动态绑定属性 | `:class="activeClass"` |
| `v-on` / `@` | 监听事件 | `@click="handleClick"` |
| `v-model` | 双向绑定 | `v-model="message"` |
| `v-if` | 条件渲染（销毁/创建） | `v-if="show"` |
| `v-else-if` | 条件分支 | `v-else-if="type === 'A'"` |
| `v-else` | 条件否则 | `v-else` |
| `v-show` | 条件显示（CSS 切换） | `v-show="visible"` |
| `v-for` | 列表渲染 | `v-for="item in list" :key="item.id"` |
| `v-slot` / `#` | 插槽 | `#header="{ item }"` |
| `v-once` | 只渲染一次 | `v-once` |
| `v-memo` | 缓存渲染 | `v-memo="[value]"` |

---

## 学习路线建议

```
1. 响应式系统 → 理解 ref/reactive 的基本概念
      ↓
2. 计算属性与侦听器 → 学会派生状态和响应数据变化
      ↓
3. 模板语法 → 掌握 v-if/v-for/v-bind/v-on 等指令
      ↓
4. 组件系统 → 理解 Props、Emits、v-model、Provide/Inject
      ↓
5. 插槽系统 → 学会组件内容分发
      ↓
6. 自定义指令 → 扩展 DOM 操作能力
      ↓
7. 路由系统 → 构建多页面应用
      ↓
8. 状态管理 → 管理全局共享状态
      ↓
9. 组合式函数 → 掌握逻辑复用的最佳实践
      ↓
10. 过渡动画 → 提升用户体验
```

---

## 许可证

MIT License

---

> 💡 **提示**：本项目所有代码均包含详细的中文注释，建议结合源码和在线演示一起学习，效果更佳！