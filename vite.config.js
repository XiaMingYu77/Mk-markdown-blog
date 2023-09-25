// eslint-disable-next-line
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      // 设置目标浏览器，browserslist 配置语法
      targets: ['> 0.2% and not dead'],
    }),
  ],
})
