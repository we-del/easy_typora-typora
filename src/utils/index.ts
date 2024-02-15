/*
 * @Author: 李云翔
 * @Date: 2023-04-28 09:08:02
 * @LastEditTime: 2024-02-15 13:39:52
 * @FilePath: \markdown\src\utils\index.ts
 * @Description:
 *
 */

import { buildOutlineTree } from '@/views/buildOutlineTree'

/**
 * @description: 将光标移动末尾处
 * @return {*}
 */
export function moveCursorToParagraphEnd(el: HTMLElement) {
  // const target = el.querySelector('p')
  // 创建选中范围对象
  const range = document.createRange()
  // 得到选中对象
  const sel = window.getSelection()
  // 将target添加到选区范围中
  range.selectNodeContents(el)
  // 关闭所有折叠
  range.collapse(false)
  // 取消所有选区
  sel?.removeAllRanges()
  // 添加选区此时光标移动到此位置
  sel?.addRange(range)
  console.log('range,sel :>> ', range, sel)
}

/**
 * @description: 将目标dom对象替换为指定的标签元素
 * @param {HTMLElement} el
 * @param {string} tag
 * @return {*}
 */
export function tagReplace(el: HTMLElement, tag: string, option?: { [prop: string]: any }) {
  const newEl = document.createElement(tag)
  if (option) {
    if (option.class) newEl.className = option.class
    if (option.id) newEl.id = option.id
    if (option.content) newEl.innerHTML = option.content
  }
  if (newEl.tagName === 'UL' || newEl.tagName === 'OL') {
    const liEl = document.createElement('li')
    liEl.innerText = ' '
    newEl.appendChild(liEl)
  }
  el.replaceWith(newEl)
  moveCursorToParagraphEnd(newEl)
  // 有内容才能聚焦
  if (!newEl.innerHTML) newEl.innerHTML = '&nbsp;'
  newEl.focus()
  // 将光标定位到该标签最后的位置
  moveCursorToParagraphEnd(newEl)
  return newEl.tagName.toLowerCase()
}

/**
 * @description: 查看当前结点前是否有聚焦用的空格，如果有则进行清除
 * @param {HTMLElement} el 当前操作的元素
 * @return {void}
 */
export function clearElStartSpace(el: any) {
  // console.log('聚焦空格处理', el.innerHTML)
  const htmlSpacePattern = /^&nbsp;(.*)/
  const spaceRegRes = htmlSpacePattern.exec(el.innerHTML)
  // 如果匹配到了内容，且该标签有除了空格以外的内容则可以清除空格，在一个标签没有内容时该标签无法被选中
  if (spaceRegRes && spaceRegRes[1]) {
    el.innerHTML = spaceRegRes[1]
    moveCursorToParagraphEnd(el)
  }
}
/**
 * @description: 清空所有空格
 * @param {string} tagContent
 * @return {string} 返回清空值后的字符串
 */
export function tagContentCleaner(tagContent: string): string {
  return tagContent.replace('&nbsp;', '').replace('<br>', '')
}
/**
 * @description: 通过selection对象得到所有被选中的结点信息
 * @return {*}
 */
export function getAllSelectNode() {
  const selectedNodes = []

  const selection = window.getSelection()
  console.log('selection :>> ', selection)
  for (let i = 0; i < selection.rangeCount; i++) {
    const range = selection.getRangeAt(i)
    const startNode =
      range.startContainer.nodeType === 1 ? range.startContainer : range.startContainer.parentNode
    const endNode =
      range.endContainer.nodeType === 1 ? range.endContainer : range.endContainer.parentNode
    let currentNode = startNode
    while (currentNode && currentNode !== endNode.nextSibling) {
      selectedNodes.push(currentNode)
      currentNode = currentNode.nextSibling
    }
  }

  const allSelectedNodes = selectedNodes.reduce((acc, node) => {
    const nodeList = node.querySelectorAll('*')
    return [...acc, ...nodeList]
  }, selectedNodes)
  return allSelectedNodes
}

/**
 * @description: 得到当前光标所处行的元素
 * @return {Node | null | undefined}
 */
export function getCurSelectedElement(): HTMLElement | null | undefined {
  // 获取选中文本所在的范围对象
  // getAllSelectNode()
  const range = window.getSelection()?.getRangeAt(0)
  // 获取包含选中文本的最小共同祖先元素
  const container = range?.commonAncestorContainer
  // 如果选中文本不在元素内，则返回null
  const selectedElement = container?.nodeType === 1 ? container : container?.parentNode
  return selectedElement
}

/**
 * @description: 在页面默认行为渲染后执行
 * @param {Function} cb
 * @return {*}
 */
export function executeAfterDefaultRender(cb: Function) {
  setTimeout(() => {
    cb()
  }, 1)
}

/**
 * @description: 模拟按键输入，以直接快捷替换元素
 * @param {HTMLElement} element
 * @param {string} text
 * @return {*}
 */
export function simulateInput(element: HTMLElement, text: string = 'c') {
  // 将元素聚焦
  element.focus()

  // 模拟按键事件
  for (const char of text) {
    const event = new KeyboardEvent('keydown', {
      key: char,
      code: char.charCodeAt(0).toString(),
      charCode: char.charCodeAt(0),
      keyCode: char.charCodeAt(0),
      which: char.charCodeAt(0)
    })
    element.dispatchEvent(event)
  }

  // 触发输入事件
  const inputEvent = new Event('input', { bubbles: true })
  element.dispatchEvent(inputEvent)
}

/**
 * @description: 得到随机的id
 * @return {*}
 */
export function getRandId() {
  return String(Date.now() - Math.floor(Math.random() * 99999 + 100))
}

/**
 * @description: 匹配对应标签，并以标签进行分组返回数据
 * @param {string} htmlStr
 * @return {*}
 */
export function contentParse(htmlStr: string) {
  // const reg = /<.*?>.*?<\/.*?>/g
  // const tagArr = [...htmlStr.matchAll(reg)]
  // const jsonTagArr = JSON.stringify(tagArr)
  // console.log(jsonTagArr)
  const patternHTagReg = /<h.*?>(.*?)<\/h.*?>/g
  const arr: Array<string> = [...htmlStr.matchAll(patternHTagReg)].map((hTag) => hTag[0])

  const hArr: Array<string> = []
  arr.forEach((hTag: string) => {
    const hPattern = /id=(\d+)/
    const matchRes = hTag.match(hPattern)
    const id = matchRes?.[1]
    const target = hArr.find((h: string) => h.includes(id))
    target || hArr.push(hTag)
  })
  const el = getCurSelectedElement()
  buildOutlineTree(hArr, el)

  //每次改变都进行记录，实时更新大纲内容
}

/**
 * @description: 处理当前元素为编辑区的第一个非P标签时调用
 * @return {*}
 */

export function handleFirstEleRemoveOnEditor(el: HTMLElement, delSign: number) {
  if (delSign) {
    el.remove()
  }
}
