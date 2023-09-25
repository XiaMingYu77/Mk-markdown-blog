// eslint-disable-next-line
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy';
import vueJsx from "@vitejs/plugin-vue-jsx";
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      // 设置目标浏览器，browserslist 配置语法
      targets: ['> 0.2% and not dead'],
    }),
    vueJsx(),
    viteCompression({
      threshold: 51200, // 对大于 50KB 的文件进行压缩
    })
  ],
})
