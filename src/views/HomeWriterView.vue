<!--
 * @Author: 李云翔
 * @Date: 2023-04-25 19:35:58
 * @LastEditTime: 2024-02-15 13:18:50
 * @FilePath: \markdown\src\views\HomeWriterView.vue
 * @Description: 
 * 
-->
<script setup lang="ts">
import {
  cutTagHandler,
  inputEnterCreateEle,
  mapTagH,
  pasteTagHandler,
  tagContentRemoveHandler
} from './shortcutService'
import { useState } from './useState'
const { markdownChangeHandler, markdownContainerRef } = useState()
</script>
<template>
  <!-- 标签替换+导航例子 -->

  <div class=" w-full h-full outline-none"
       cy-markdown
       style="padding:5vw"
       @input="markdownChangeHandler"
       @keydown.ctrl=" markdownChangeHandler"
       @keydown.delete.exact="tagContentRemoveHandler"
       @keydown.enter.exact="inputEnterCreateEle"
       @keydown.ctrl.x.exact="cutTagHandler"
       @keydown.ctrl.v.exact="pasteTagHandler"
       @keydown.ctrl.1.prevent.exact="mapTagH('h1')"
       @keydown.ctrl.2.prevent.exact="mapTagH('h2')"
       @keydown.ctrl.3.prevent.exact="mapTagH('h3')"
       @keydown.ctrl.4.prevent.exact="mapTagH('h4')"
       @keydown.ctrl.5.prevent.exact="mapTagH('h5')"
       @keydown.ctrl.6.prevent.exact="mapTagH('h6')"
       contenteditable="true"
       ref="markdownContainerRef">

  </div>
</template>
<style lang="scss" >
.li-circle {
  list-style-type: circle;
  padding-left: 20px;
}
.li-number {
  list-style-type: decimal;
  padding-left: 20px;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  font-weight: bold;
}

h1 {
  font-size: 36px;
  // color: #333;
  margin-bottom: 20px;
}

h2 {
  font-size: 24px;
  // color: #666;
  margin-bottom: 16px;
}

h3 {
  font-size: 18px;
  // color: #999;
  margin-bottom: 12px;
}

h4 {
  font-size: 16px;
  // color: #ccc;
  margin-bottom: 10px;
}

h5 {
  font-size: 14px;
  // color: #ddd;
  margin-bottom: 8px;
}

h6 {
  font-size: 12px;
  // color: #eee;
  margin-bottom: 6px;
}
</style>