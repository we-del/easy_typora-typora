/*
 * @Author: 李云翔
 * @Date: 2023-04-25 19:12:10
 * @LastEditTime: 2023-04-26 12:24:53
 * @FilePath: \vue3_markdown\markdown\src\main.ts
 * @Description:
 *
 */
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import '@/assets/base.css'
import '@/assets/font.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:windi.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
