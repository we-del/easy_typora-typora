<!--
 * @Author: 李云翔
 * @Date: 2023-04-30 11:54:33
 * @LastEditTime: 2023-05-03 10:59:31
 * @FilePath: \vue3_markdown\markdown\src\layouts\component\outline\Outline.vue
 * @Description: 
 * 
-->
<template>
  <div>
    <el-input v-model="outlineFilterText"
              placeholder="请输入" />

    <el-tree :data="outlineStore.tree"
             empty-text=""
             default-expand-all
             ref="treeRef"
             :filter-node-method="filterNode"
             :expand-on-click-node="false"
             style="background-color:#2e3033;color:white;--el-tree-node-hover-bg-color:#292524"
             @node-click="handleNodeClick">
      <template #default="{data}">

        <!-- <div :style="`padding-left:${retractConvert(data.el)}px`" -->
        <div :style="`padding-left:${retractConvert(data.tagName,data.layer)}px`"
             class="truncate">
          {{ data.label }}
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts" setup>
import { useOutlineStore } from '@/stores'
import { ref, watch } from 'vue'
import type { TreeNode } from './types'

const handleNodeClick = (data: TreeNode) => {
  const view = document.querySelector('#view-right')
  console.log('view :>> ', view)
  // 内容滑动
  view?.scrollTo({
    top: data.el.offsetTop,
    behavior: 'smooth'
  })
  console.log('内容滑动', data, data.el.offsetTop)
}
const outlineStore = useOutlineStore()

const outlineFilterText = ref<string>('')
const treeRef = ref()
watch(outlineFilterText, (text) => {
  treeRef.value.filter(text)
})
const filterNode = (value: string, data: TreeNode) => {
  if (!value) return true
  return data.label.includes(value)
}
/**
 * @description: 对不同层级的数据进行距离转换
 * @param {string} tag 标签的名称
 * @param {number} layer 当前元素标签所处的包裹(嵌套层级)层级
 * @thick   需要对不同层级间的样式进行处理，如果当前包裹层级，如3级标签在2级包裹里就为1 在，3级标签里就为0 ， 因此最终公式为 标签等级-1-当前包裹层级
 * @return {*}
 */
function retractConvert(tag: string, layer: number | undefined) {
  layer = layer || 0
  if (tag.includes('h')) {
    const n = Number(tag.charAt(1))
    if (n - layer <= 0) return 0
    return (n - 1 - layer) * 18
  }
  return 0
}
</script>

<style lang="scss" scoped>
:deep(.el-tree-node__label) {
  @apply truncate;
}
:deep(.el-tree) {
  --el-tree-node-hover-bg-color: #161618;
}
</style>