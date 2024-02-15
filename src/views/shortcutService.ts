import { tagContentCleaner } from '@/utils'
/*
 * @Author: 李云翔
 * @Date: 2023-05-02 09:36:34
 * @LastEditTime: 2023-05-03 11:23:54
 * @FilePath: \vue3_markdown\markdown\src\views\shortcutService.ts
 * @Description:
 *
 */

import {
  contentParse,
  executeAfterDefaultRender,
  getAllSelectNode,
  getCurSelectedElement,
  getRandId,
  handleFirstEleRemoveOnEditor,
  tagReplace
} from '@/utils'
import { tagHandler } from './markdownParse'
// import { useState } from './useState'
// const { markdownContainerRef } = useState()
/**
 * @description: 在使用ctrl + x 剪切时调用，用于规避剪切时的标签遗留3
 * @param {KeyboardEvent} e
 * @return {*}
 */
export function cutTagHandler(e: KeyboardEvent) {
  const selectNodes = getAllSelectNode()
  if (!selectNodes[0]) return
  const firstEle: HTMLElement = selectNodes[0]
  // 需要比默认行为慢 , 级剪切行为
  executeAfterDefaultRender(() => {
    if (firstEle.tagName !== 'P' && !tagContentCleaner(firstEle.innerHTML)) {
      // 将目标标签映射为P标签
      tagReplace(firstEle, 'p')
      if (firstEle.tagName.includes('H')) {
        const el = document.querySelector('[contenteditable]')
        contentParse(el.innerHTML)
      }
    }
  })
}

/**
 * @description: 当 ctrl+v复制元素时调用，删除掉当前站位的p元素
 * @param {KeyboardEvent} e
 * @return {*}
 */
export function pasteTagHandler(e: KeyboardEvent) {
  const allEl = getAllSelectNode()
  console.log('el :>> ', allEl)
  const el: any = allEl?.[0]
  if (!el) return
  // function调用默认谁调用this指向谁，但使用了箭头函数后，this和当前作用域一致
  executeAfterDefaultRender(() => {
    if (el.tagName === 'P') {
      el.remove()
    }
  })
}

/**
 * @description: 当输入 enter 进行创建额外的行时调用，准供需要特殊标识确定关系的元素(在现阶段处理h标签映射大纲树错误问题，需要独立的id值)
 * @param {KeyboardEvent} e
 * @return {*}
 */
export function inputEnterCreateEle(e: KeyboardEvent) {
  // 创建标签元素的默认行为，没有获取元素的块，因此需要添加定时器间隔
  executeAfterDefaultRender(() => {
    const el = getCurSelectedElement()
    const preSiblingEl = el?.previousElementSibling
    if (
      preSiblingEl &&
      el?.tagName === preSiblingEl.tagName &&
      el.id &&
      el.id === preSiblingEl.id
    ) {
      preSiblingEl.id = preSiblingEl.id + 1
    }
  })
}

/**
 * @description: 快捷键映射
 * @param {string} tagName
 * @return {*}
 */
export function mapTagH(tagName: string) {
  const focusEl = getCurSelectedElement()
  if (!focusEl) return
  // 过滤掉 editor 作为focusEl元素的情况
  // debugger
  if (focusEl.contentEditable === 'true') {
    const tagP = document.createElement('p')
    focusEl.appendChild(tagP)
    shortcutMap(tagName, tagP)
  } else shortcutMap(tagName, focusEl)
}

/**
 * @description: 快捷键映射触发转换后的标签
 * @param {string} tag
 * @return {*}
 */
export function shortcutMap(tag: string, el: HTMLElement) {
  if (tag.includes('h')) {
    tagHandler(el, tag, { id: getRandId(), content: el.innerHTML })
  }
}

/**
 * @description: 当移除标签名称时调用
 * @return {*}
 */
// 编辑器头部删除标记，为0时不允许删除，为1时允许删除
let editorFirstEleDelSign = 0
export function tagContentRemoveHandler() {
  const el: HTMLElement | null | undefined = getCurSelectedElement()

  // debugger
  const editor = document.querySelector('[contenteditable]')
  if (!el || editor === el) return
  if (el?.tagName !== 'P' && !tagContentCleaner(el?.innerHTML)) {
    if (el === editor?.firstElementChild) {
      // 判断是否移除是首部元素
      executeAfterDefaultRender(() => {
        handleFirstEleRemoveOnEditor(el, editorFirstEleDelSign)
        editorFirstEleDelSign = 1
      })
    } else {
      // 判断不是P标签的移除
      executeAfterDefaultRender(handleNotPTagRemoveOnEditor)
      editorFirstEleDelSign = 0
    }
  } else editorFirstEleDelSign = 0
}

/**
 * @description: 处理非P标签的删除
 * @return {*}
 */
function handleNotPTagRemoveOnEditor() {
  const el = getCurSelectedElement()
  if (!el) return
  if (el.tagName !== 'P' && !tagContentCleaner(el.innerHTML)) {
    tagReplace(el, 'p')
  }
}
