<!-- ============================================================
     子组件 - 演示 props 和 emit
     ============================================================
     本组件演示：
     - defineProps：接收父组件传递的数据
     - defineEmits：向父组件发送事件
     - withDefaults：设置 props 默认值
     ============================================================ -->

<template>
  <div class="child-component">
    <h4>👶 子组件</h4>
    
    <!-- 显示通过 props 接收的数据 -->
    <p>接收到的标题: <strong>{{ title }}</strong></p>
    <p>接收到的计数: <strong>{{ count }}</strong></p>
    <p>接收到的用户信息: {{ user.name }}, {{ user.age }}岁</p>
    
    <!-- 显示带有默认值的 prop -->
    <p>主题色 (有默认值): <strong>{{ theme }}</strong></p>
    
    <!-- 按钮：通过 emit 向父组件发送事件 -->
    <div class="child-actions">
      <button @click="handleIncrement">子组件触发 +1</button>
      <button @click="handleDecrement">子组件触发 -1</button>
      <button @click="handleSendMsg">发送消息给父组件</button>
    </div>
  </div>
</template>

<script setup>
// ============================================================
// defineProps - 声明组件接收的属性
// ============================================================
// 运行时声明方式 - 默认值直接写在 defineProps 中
// 注意：withDefaults 只能用于类型声明方式（TypeScript）
// 运行时声明方式中，默认值通过 default 选项设置
const props = defineProps({
  // 标题 - 字符串类型，必填
  title: {
    type: String,
    required: true,
  },
  // 计数 - 数字类型，带默认值
  count: {
    type: Number,
    default: 0,
  },
  // 用户信息 - 对象类型
  user: {
    type: Object,
    // 对象/数组的默认值必须通过工厂函数返回
    default: () => ({ name: '未知', age: 0 }),
  },
  // 主题色 - 带默认值
  theme: {
    type: String,
    default: '蓝色',
  },
})

// 如果使用 TypeScript，可以用 withDefaults + 类型声明：
// const props = withDefaults(defineProps<{ title: string; count?: number }>(), {
//   count: 0,
// })

// ============================================================
// defineEmits - 声明组件可以触发的事件
// ============================================================
// 推荐使用对象语法，可以验证事件的参数
const emit = defineEmits({
  // increment 事件，payload 为数字
  increment: (value) => typeof value === 'number',
  // decrement 事件
  decrement: (value) => typeof value === 'number',
  // send-message 事件（推荐使用 kebab-case 命名）
  'send-message': (msg) => typeof msg === 'string',
})

// 也可以使用简单数组语法
// const emit = defineEmits(['increment', 'decrement', 'send-message'])

// 事件处理函数
function handleIncrement() {
  // 触发 increment 事件，传递参数
  emit('increment', 1)
}

function handleDecrement() {
  emit('decrement', 1)
}

function handleSendMsg() {
  emit('send-message', `来自子组件的消息：当前时间是 ${new Date().toLocaleTimeString()}`)
}
</script>

<style scoped>
.child-component {
  padding: 16px;
  background: #f0f9ff;
  border: 2px dashed #93c5fd;
  border-radius: 8px;
}

.child-component h4 {
  margin: 0 0 12px;
  color: #3b82f6;
}

.child-component p {
  margin: 4px 0;
  font-size: 0.9rem;
}

.child-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.child-actions button {
  padding: 6px 12px;
  border: 1px solid #93c5fd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.child-actions button:hover {
  background: #3b82f6;
  color: white;
}
</style>