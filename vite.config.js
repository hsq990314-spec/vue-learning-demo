import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 部署到 GitHub Pages 时，需要设置 base 为仓库名
  // 这样 Vite 构建时会在资源路径前加上 /vue-learning-demo/
  base: '/vue-learning-demo/',
})
