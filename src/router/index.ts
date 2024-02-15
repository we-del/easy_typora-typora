/*
 * @Author: 李云翔
 * @Date: 2023-04-25 19:44:29
 * @LastEditTime: 2023-04-26 12:06:10
 * @FilePath: \vue3_markdown\markdown\src\router\index.ts
 * @Description:
 *
 */
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Base',
      component: () => import('@/views/BaseView.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/views/HomeWriterView.vue')
        }
      ]
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/error/NotFound.vue') }
  ]
})

export default router
