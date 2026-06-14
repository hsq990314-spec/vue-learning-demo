// ============================================================
// Pinia 状态管理 - 用户 Store
// ============================================================
// 演示更复杂的状态管理场景，包括：
// - 嵌套对象的状态管理
// - 异步 action（模拟 API 请求）
// - $subscribe 监听状态变化
// - $patch 批量更新状态
// ============================================================

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // --------------------------------------------------
  // State - 用户相关状态
  // --------------------------------------------------
  
  // 用户信息对象
  const userInfo = ref({
    name: '张三',
    age: 25,
    email: 'zhangsan@example.com',
    avatar: '👤',
    bio: '一名热爱 Vue.js 的前端开发者',
  })

  // 登录状态
  const isLoggedIn = ref(false)

  // 加载状态（用于异步操作时的 UI 反馈）
  const loading = ref(false)

  // 用户偏好设置
  const preferences = ref({
    theme: 'light',       // 主题：light/dark
    language: 'zh-CN',    // 语言
    notifications: true,  // 是否接收通知
  })

  // --------------------------------------------------
  // Getters - 计算属性
  // --------------------------------------------------
  
  // 用户显示名称 - 如果已登录显示用户名，否则显示"游客"
  const displayName = computed(() => {
    return isLoggedIn.value ? userInfo.value.name : '游客'
  })

  // 主题是否为暗色模式
  const isDarkTheme = computed(() => {
    return preferences.value.theme === 'dark'
  })

  // 用户信息摘要
  const userSummary = computed(() => {
    const { name, age, email } = userInfo.value
    return `${name}，${age}岁，邮箱：${email}`
  })

  // --------------------------------------------------
  // Actions - 方法
  // --------------------------------------------------
  
  // 模拟登录
  async function login(username, password) {
    loading.value = true
    try {
      // 模拟 API 请求延迟
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // 模拟验证逻辑
      if (username === 'admin' && password === '123456') {
        isLoggedIn.value = true
        userInfo.value = {
          name: '管理员',
          age: 30,
          email: 'admin@vue-demo.com',
          avatar: '🛡️',
          bio: '系统管理员，拥有最高权限',
        }
        return { success: true, message: '登录成功！' }
      } else {
        return { success: false, message: '用户名或密码错误' }
      }
    } finally {
      // 无论成功失败，都关闭加载状态
      loading.value = false
    }
  }

  // 退出登录
  function logout() {
    isLoggedIn.value = false
    userInfo.value = {
      name: '张三',
      age: 25,
      email: 'zhangsan@example.com',
      avatar: '👤',
      bio: '一名热爱 Vue.js 的前端开发者',
    }
  }

  // 更新用户信息
  function updateUserInfo(updates) {
    // Object.assign 合并对象，保留未修改的字段
    userInfo.value = { ...userInfo.value, ...updates }
  }

  // 切换主题
  function toggleTheme() {
    preferences.value.theme = 
      preferences.value.theme === 'light' ? 'dark' : 'light'
  }

  // 切换通知设置
  function toggleNotifications() {
    preferences.value.notifications = !preferences.value.notifications
  }

  // 重置所有状态到初始值
  function $reset() {
    userInfo.value = {
      name: '张三',
      age: 25,
      email: 'zhangsan@example.com',
      avatar: '👤',
      bio: '一名热爱 Vue.js 的前端开发者',
    }
    isLoggedIn.value = false
    loading.value = false
    preferences.value = {
      theme: 'light',
      language: 'zh-CN',
      notifications: true,
    }
  }

  return {
    // state
    userInfo,
    isLoggedIn,
    loading,
    preferences,
    // getters
    displayName,
    isDarkTheme,
    userSummary,
    // actions
    login,
    logout,
    updateUserInfo,
    toggleTheme,
    toggleNotifications,
    $reset,
  }
})