/*
 * @Author: 李云翔
 * @Date: 2023-04-28 09:05:52
 * @LastEditTime: 2024-02-15 13:13:44
 * @FilePath: \markdown\src\views\markdownParse.ts
 * @Description:
 *
 */

import { getRandId, tagReplace } from '@/utils'
/**
 * @description: 对表达式进行解析
 * @param {string} exp 传入的表达式
 * @param {HTMLElement} el 传入的目标元素
 * @return {*}
 */
export function expressParse(exp: string, el: HTMLElement) {
  const regexp = /^(.*)&nbsp;(.*)/
  const matchRes = exp.match(regexp)
  // 此事无需进行转换因为已经存在内容
  if (matchRes && matchRes[2]) return
  if (matchRes) {
    const operation = matchRes[1]
    switch (operation) {
      case '#':
        tagHandler(el, 'h1', { id: getRandId() })
        break

      case '##':
        tagHandler(el, 'h2', { id: getRandId() })
        break

      case '###':
        tagHandler(el, 'h3', { id: getRandId() })
        break
      case '####':
        tagHandler(el, 'h4', { id: getRandId() })
        break
      case '#####':
        tagHandler(el, 'h5', { id: getRandId() })
        break
      case '######':
        tagHandler(el, 'h6', { id: getRandId() })
        break

      case '+':
      case '-':
        tagHandler(el, 'ul', { class: 'li-circle' })
        break

      case '1.':
        tagHandler(el, 'ol', { class: 'li-number' })
        break
      default:
        break
    }
  }
}

export function tagHandler(
  el: HTMLElement,
  tag: string,
  props?: { class?: string; id?: string; content: string }
) {

  tagReplace(el, tag, props)
}

// 高亮
// function lightText(el: HTMLElement) {
//   // tagReplace(el,'h1')
// }

// function orderListHandler(el: HTMLElement) {
//   tagReplace(el, 'li', { class: 'li-number' })
// }

// function unorderedListHandler(el: HTMLElement) {
//   tagReplace(el, 'li', { class: 'li-circle' })
// }
