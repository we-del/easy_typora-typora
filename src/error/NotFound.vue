<!--
 * @Author: 李云翔
 * @Date: 2023-04-25 19:44:56
 * @LastEditTime: 2023-04-25 20:08:45
 * @FilePath: \vue3_markdown\markdown\src\error\NotFound.vue
 * @Description: 
 * 
-->
<script setup lang="ts">
import { onMounted, onUnmounted, ref, unref } from 'vue'
import { useRouter } from 'vue-router'

const time = ref<number>(3)

let timer: any = null
const router = useRouter()
console.log('router :>> ', router)
onMounted(() => {
  timer = setInterval(() => {
    // time.value = time.value - 1
    time.value--
    console.log('nref(timer) :>> ', unref(time))
    if (!unref(time)) {
      router.replace('/')
    }
  }, 1000)
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
<template>

  <header>什么都没有~~</header>
  <footer>即将跳转到主页面 ,剩余{{ time }}s</footer>

</template>
<style lang="scss" scoped>
</style>