/*
 * @Author: 李云翔
 * @Date: 2023-04-25 19:11:21
 * @LastEditTime: 2024-02-15 09:46:32
 * @FilePath: \markdown\vite.config.ts
 * @Description:
 *
 */
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
// https://vitejs.dev/config/
export default defineConfig({
  // 打包后的html,css,js以什么方式进行引入，默认为 / 以当前路径为前提进行引入(使用加载到服务器上作为服务器依赖时使用，默认不需要改变)，如果需要以绝对路径方式引入可以为./
  base:'./',
  plugins: [
    vue(),
    WindiCSS(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build:{
    sourcemap: true,
  }
})
