<!--
 * @Author: 李云翔
 * @Date: 2023-04-25 19:29:54
 * @LastEditTime: 2023-05-03 16:39:48
 * @FilePath: \vue3_markdown\markdown\src\layouts\Layout.vue
 * @Description: 
 * 
-->
<script setup lang="ts">
import File from './component/file/File.vue'
import Outline from './component/outline/Outline.vue'
import { useState } from './hooks/useState'
const {
  originCodeModeHandler,
  layoutWidth,
  curOperationState,
  curOperationView,
  flexBarClicked,
  flexBarHandler,
  tabsStateHandler,
  tabsStyle,
  saveModeHandler,
  tooltipSpreadRef
} = useState()
</script>
<template>
  <div class="flex w-screen h-screen">
    <section id="view-left"
             class="flex flex-col overflow-auto"
             style="max-width: 40vw;"
             :style="`width:${layoutWidth}vw;background-color:#2e3033`">
      <div id="main-title"
           class=" grid grid-cols-2 place-content-center place-items-center mt-3  text-gray-300 cursor-pointer">
        <div :class="curOperationView  ==='file' && tabsStyle"
             @click="curOperationView='file'">文件</div>
        <div :class="curOperationView  ==='content' && tabsStyle"
             @click="curOperationView='content'">大纲</div>
      </div>
      <div id="tabs-content"
           class="p-5   ">
        <File v-show="curOperationView === 'file'" />
        <Outline v-show="curOperationView === 'content'" />
      </div>
    </section>
    <div id="flex-bar"
         v-show="curOperationState !== 'closeTabs'"
         @mousedown="flexBarHandler(true)"
         class=" absolute  h-screen w-5 z-10 cursor-pointer"
         :class="flexBarClicked ? 'bg-slate-700' : 'bg-transparent' "
         style="max-width: 40vw;"
         :style="`left:${layoutWidth-.7}vw`"></div>
    <section id="view-right"
             class="  overflow-auto"
             :style="`width:${100-layoutWidth}vw;background-color:#363b40`">
      <slot name="content">内容</slot>
    </section>
    <section id="footer-operation-icon"
             class=" fixed text-white  text-lg ml-4 "
             v-show="!flexBarClicked"
             :style="`bottom:0;left:${layoutWidth}vw`">
      <div>
        <el-tooltip effect="dark"
                    ref="tooltipSpreadRef"
                    content="显示/隐藏侧边栏"
                    placement="top-start">

          <i class="iconfont icon-left"
             @click="tabsStateHandler('closeTabs')"
             v-if="curOperationState === 'openTabs'"></i>
          <i class="iconfont icon-right"
             @click="tabsStateHandler('openTabs')"
             v-if="curOperationState === 'closeTabs'"></i>
        </el-tooltip>
        <el-tooltip effect="dark"
                    content="启用源代码模式"
                    placement="top-start">
          <span class=" ml-2">
            <i class="iconfont icon-code"
               @click="originCodeModeHandler"></i>
            {{curOperationState==='code' ?  '退出源代码模式':'' }}
          </span>
        </el-tooltip>
        <el-tooltip effect="dark"
                    content="保存"
                    placement="top-start">
          <span class=" ml-2">
            <i class="iconfont icon-save"
               @click="saveModeHandler"></i>
          </span>
        </el-tooltip>

      </div>
    </section>
  </div>
</template>
<style  scoped>
</style>