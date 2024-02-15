/*
 * @Author: 李云翔
 * @Date: 2023-04-27 22:14:36
 * @LastEditTime: 2023-05-02 09:27:50
 * @FilePath: \vue3_markdown\markdown\src\views\__test__\index.spec.ts
 * @Description:
 *
 */
import { tagReplace } from '@/utils'
import { describe, expect, it } from 'vitest'
import { buildOutlineTree } from '../buildOutlineTree'
describe('markdownParse', () => {
  it('tagReplaceFunction', () => {
    expect(tagReplace(document.createElement('p'), 'li')).toBe('li')

    expect({ name: 1 }).toEqual({ name: 1 })
  })

  it('buildOutlineTreeFunction', () => {
    // 使用cypress完成自动化输入测试
    function generateHTag(n, content) {
      return `<h${n}>${content}</h${n}>`
    }
    const testTag: any = []
    function loadTestHTag(tagOrder: number, content) {
      testTag.push(generateHTag(tagOrder, content))
    }
    loadTestHTag(1, 1)
    loadTestHTag(3, 3)
    loadTestHTag(5, 5)
    loadTestHTag(2, 2)
    loadTestHTag(4, 4)
    loadTestHTag(2, 2)
    loadTestHTag(1, 1)
    loadTestHTag(2, 2)
    loadTestHTag(4, 4)
    loadTestHTag(3, 3)

    console.log('unit:test :>> ', testTag)
    expect(buildOutlineTree(testTag)).toEqual([
      {
        label: '1',
        tagName: 'h1',
        // id: n
        // el: HTMLElement
        children: [
          {
            label: '3',
            tagName: 'h3',
            layer: 1,
            children: [
              {
                label: '5',
                tagName: 'h5',
                layer: 2
              }
            ]
          },
          {
            label: '2',
            tagName: 'h2',
            layer: 1,
            children: [
              {
                label: '4',
                tagName: 'h4',
                layer: 2
              }
            ]
          },
          {
            label: '2',
            tagName: 'h2',
            layer: 1
          }
        ]
      },
      {
        label: '1',
        tagName: 'h1',
        children: [
          {
            label: '2',
            tagName: 'h2',
            layer: 1,
            children: [
              {
                label: '4',
                tagName: 'h4',
                layer: 2
              },
              {
                label: '3',
                tagName: 'h3',
                layer: 2
              }
            ]
          }
        ]
      }
    ])
  })
})
