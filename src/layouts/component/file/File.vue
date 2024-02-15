<!--
 * @Author: 李云翔
 * @Date: 2023-05-03 11:44:19
 * @LastEditTime: 2023-05-03 17:29:32
 * @FilePath: \vue3_markdown\markdown\src\layouts\component\file\FIle.vue
 * @Description: 
 * 
-->
<script setup lang="ts">
import { Plus, WarningFilled } from '@element-plus/icons-vue'
import { useState } from './hooks/useState'

const { addFile, dialogCancel, dialogConfirm, dialogTitle, dialogVisible, fileList, fileName } =
  useState()
</script>
<template>
  <div>
    <el-button :icon="Plus"
               color="#d1d5db"
               @click="addFile"
               class="w-full h-full"
               dark> 新增</el-button>

    <!-- <p>文件导航，起到侧边框导航内容作用，在此展示所有文件夹，</p>
    <p>可以进行新增文件夹操作</p>
    <p>当一个文件未保存，但执行了新增文件操作或切换文件操作时，需要先对该文件进行保存</p> -->
    <el-dialog v-model="dialogVisible"
               :title="dialogTitle"
               width="30%">
      <div class="flex">
        <el-icon color="#f59e0b"
                 size="48 px">
          <WarningFilled />
        </el-icon>
        <p class="pl-1  text-red-400">当前内容尚保存，在新增文件前，是否现在去保存当前文件？</p>
      </div>
      <el-input v-model="fileName"></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">{{ dialogCancel }}</el-button>
          <el-button type="primary"
                     @click="dialogVisible = false">
            {{ dialogConfirm }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
</style>