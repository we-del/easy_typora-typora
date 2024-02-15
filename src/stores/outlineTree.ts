/*
 * @Author: 李云翔
 * @Date: 2023-04-29 11:05:51
 * @LastEditTime: 2023-05-03 16:29:11
 * @FilePath: \vue3_markdown\markdown\src\stores\outlineTree.ts
 * @Description: 用于存储和构建一颗能够渲染的数
 *
 */
import type { TreeNode } from '@/layouts/component/outline/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOutlineStore = defineStore('outlineTree', () => {
  const tree = ref<Array<TreeNode>>([])
  const content = ref<string>()
  return { tree,content }
})
