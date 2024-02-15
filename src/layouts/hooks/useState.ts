/*
 * @Author: 李云翔
 * @Date: 2023-04-28 22:16:39
 * @LastEditTime: 2023-05-03 11:35:21
 * @FilePath: \vue3_markdown\markdown\src\layouts\hooks\useState.ts
 * @Description:
 *
 */
import type { TooltipInstance } from 'element-plus'
import { computed, ref, unref, watch } from 'vue'
import { tabsWidth } from '../layout.json'
export function useState() {
  // 只有需要完成依赖收集并且触发依赖的数据才需要做响应式装饰(如视图或watch依赖该变量)，否则使用常规变量即可
  const layoutWidth = ref<number>(tabsWidth)
  const flexBarClicked = ref<boolean>(false)
  const curOperationView = ref<'file' | 'content'>('content')
  const curOperationState = ref<'openTabs' | 'closeTabs' | 'code'>('openTabs')
  const tooltipSpreadRef = ref<TooltipInstance>()
  const tooltipCodeRef = ref<TooltipInstance>()

  //记录全局width
  let envWidth = 0
  /**
   * @description: 判断是否进入移动模式，改变整体布局
   * @param {boolean} flag 是否进入移动模式的标记
   * @return {void}
   */
  function flexBarHandler(flag: boolean) {
    flexBarClicked.value = flag
    if (flag) console.log('即将进入移动模式')
  }

  /**
   * @description: 对视图进行移动监听，方便一遍全局拖拽
   * @tips 处理策略：由于在快速拖动的情况下，目标移动栏有显示滞后问题，导致鼠标移动事件不能正常触发，因此需要将拖动事件挂载到全局
   * @return {*}
   */
  document.addEventListener('mousemove', (e) => {
    envWidth = e.clientX
    if (flexBarClicked.value) {
      // 如何获取鼠标当前移动的坐标？
      const width = pxToVw(envWidth)
      layoutWidth.value = width > 40 ? 40 : width
    }
  })
  document.addEventListener('mouseup', (e) => {
    flexBarHandler(false)
    // 光标移动参考
    // console.log('选中的结点', window.getSelection())
    // console.log('选中的结点', window.getSelection()?.getRangeAt(0))
    // const sel = window.getSelection()

    // for (var i = 0; i < sel.rangeCount; i++) {
    //   console.log(sel.getRangeAt(i))
    //   console.log(sel.getRangeAt(i).toString())
    // }
    // const selection = window.getSelection()
    // const anchorNode = selection.anchorNode
    // const focusNode = selection.focusNode

    // if (anchorNode && focusNode) {
    //   const startNode = anchorNode.nodeType === Node.TEXT_NODE ? anchorNode.parentNode : anchorNode
    //   const endNode = focusNode.nodeType === Node.TEXT_NODE ? focusNode.parentNode : focusNode

    //   // 如果起点和终点在同一个节点内，则返回该节点
    //   if (startNode === endNode) {
    //     console.log(`选中的节点：${startNode.tagName}`)
    //   } else {
    //     // 否则，返回起点和终点之间的所有节点
    //     const nodes = []
    //     let currentNode = startNode

    //     while (currentNode && currentNode !== endNode.nextSibling) {
    //       nodes.push(currentNode)
    //       currentNode = currentNode.nextSibling
    //     }

    //     nodes.push(endNode)

    //     console.log(`选中的节点：${startNode.tagName} 到 ${endNode.tagName}`)
    //     console.log(nodes)
    //   }
    // }
  })
  function pxToVw(width: number) {
    // 计算公式 ： 100 / 当前视口宽度 * 目标宽度
    const viewWidth = window.innerWidth
    return (100 / viewWidth) * width
  }

  // 缓存tabs模块化类
  const tabsStyle = computed(() => {
    return 'font-bold text-lg p-2 border-b-gray-200 border-b-4'
  })

  function originCodeModeHandler() {
    tooltipCodeRef.value?.hide()
    console.log('进入源代码模式')
  }

  /**
   * @description: 处理tabs栏展示状态
   * @param {'openTabs' | 'closeTabs'} type 当前处于的状态
   * @return {void}
   */
  function tabsStateHandler(type: 'openTabs' | 'closeTabs') {
    if (unref(curOperationState) === type) return
    setTimeout(() => {
      tooltipSpreadRef.value?.hide()
    })
    // debugger
    curOperationState.value = type
    if (type === 'openTabs') {
      layoutWidth.value = tabsWidth
    } else if (type === 'closeTabs') {
      layoutWidth.value = 0
      flexBarClicked.value = false
    }
    console.log('处理展示栏状态')
  }
  watch(layoutWidth, (newWidth, oldWidth) => {
    if (newWidth < 7) {
      // 隐藏元素 ，提示点击下方按扭
      tabsStateHandler('closeTabs')
    }
  })

  function saveModeHandler() {}
  return {
    layoutWidth,
    curOperationView,
    curOperationState,
    flexBarHandler,
    tooltipSpreadRef,
    flexBarClicked,
    tabsStateHandler,
    originCodeModeHandler,
    tabsStyle,
    saveModeHandler
  }
}
