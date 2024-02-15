<!--
 * @Author: 李云翔
 * @Date: 2023-04-25 19:31:11
 * @LastEditTime: 2023-04-26 16:26:49
 * @FilePath: \vue3_markdown\markdown\src\views\BaseView.vue
 * @Description: 
 * 
-->
<script setup lang="ts">
import Layout from '@/layouts/Layout.vue'
import { RouterView } from 'vue-router'
</script>
<template>
  <Layout>
    <template #content>
      <RouterView />
    </template>
  </Layout>
</template>
<style lang="scss" scoped>
</style>