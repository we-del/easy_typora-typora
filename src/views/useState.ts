/*
 * @Author: 李云翔
 * @Date: 2023-04-27 18:56:12
 * @LastEditTime: 2024-02-15 10:55:38
 * @FilePath: \markdown\src\views\useState.ts
 * @Description:
 *
 */
// ***********************************************************
//
// * @title 字符串解析规则
// * @strategy
// * 1. 每新生成一行字符串默认生成一个p标签
// * 2. 只有p标签 可以对markdown进行解析，能衍生为其他标签
// * 3. 每次行移动时，需要记住上一次目标移动的行。如果该行有内容，则在创建新一行时，默认以该标签为模板创建新行 ；如果没有内容则默认创建一个空的p标签 （内容指没有字符长度）
// * 4. 在进行移动编辑时，需要进行两个变化的比较，找出差异点进行局部更新
// * 5. 浏览器本身携带记忆功能此时我们只需判断上一个结点是否为空如果为空则删除上一个标签并扩展一个新标签即可
// * 6. 先不用思考反编译变为markdown的事，专心搞代码即可

// * @file HomeWriterView
//
// ***********************************************************

import { useOutlineStore } from '@/stores/outlineTree'
import {
  clearElStartSpace,
  contentParse,
  getCurSelectedElement,
  moveCursorToParagraphEnd,
  tagContentCleaner,
  tagReplace
} from '@/utils'
import { ref, type Ref } from 'vue'
import { expressParse } from './markdownParse'
interface HomeWriterViewState {
  markdownChangeHandler: (e: KeyboardEvent) => void
  markdownContainerRef: Ref<HTMLDivElement>
}

export function useState(): HomeWriterViewState {
  const outlineStore = useOutlineStore()
  // 保存上一次准备进行的操作，原则上，只要选中了所有结点信息，此时我就认为你是要执行关闭操作了

  // 监听当前正常操作的元素，当元素发生改变时由底层调用(包括元素长度的变化，元素点击的改变变化)
  document.addEventListener('selectionchange', () => {
    tagDetailHandler()
  })

  function tagDetailHandler() {
    const selectedElement = getCurSelectedElement()
    if (!selectedElement) return
    if (
      selectedElement.tagName.toUpperCase() === 'DIV' &&
      selectedElement.parentElement?.isContentEditable
    ) {
      tagReplace(selectedElement, 'p')
    }

    clearElStartSpace(selectedElement)
    tagToPOnNull(selectedElement)

    // 如果当前是p标签则进行标签可能性转换
    if (selectedElement.tagName.toUpperCase() === 'P') {
      expressParse(selectedElement?.innerHTML, selectedElement)
    }
  }

  /**
   * @description: 用于判断该dom对象是否退化为p标签，如果更改标签不是p标签且，其上一个兄弟标签和本标签相等，且内容都为空时，则说明当前标签要退化为p标签
   * @param {HTMLElement} selectedElement
   * @return {*}
   */
  function tagToPOnNull(el: HTMLElement) {
    const newEl = el
    const oldEl: Element | null = el.previousElementSibling
    if (!oldEl) return
    if (newEl.tagName.toUpperCase() !== 'P' && newEl.tagName.toUpperCase() !== 'DIV' && !newEl.innerText.trim()) {
      const content = tagContentCleaner(oldEl?.innerHTML)
      if (newEl.tagName === oldEl?.tagName && !content) {
        tagReplace(newEl, 'p')
      }
    }
  }

  const markdownContainerRef = ref<HTMLDivElement>(null)

  /**
   * @description: 在editor输入框发生改变时调用
   * @param {any} e 环境变量
   * @return {*}
   */
  function markdownChangeHandler(e: any) {
    // 构建大纲树时需要获取当前操作的h标签如何获取？

    const htmlStr: string = e.target.innerHTML
    outlineStore.content = htmlStr
    console.log('e :>> ', e, htmlStr)

    // 输入首部需要插入p标签
    if (htmlStr.indexOf('<') === -1 && htmlStr) {
      const insertIndex = htmlStr.indexOf('<')
      // console.log('首部标签需要处理', insertIndex)
      // if (insertIndex) {
      // }
      e.target.innerHTML = `<p>${htmlStr}</p>`
      // 保存当前的选择范围
      moveCursorToParagraphEnd(e.target)
    }
    contentParse(htmlStr)
  }

  return {
    markdownChangeHandler,
    markdownContainerRef
  }
}
