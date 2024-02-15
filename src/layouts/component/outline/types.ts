/*
 * @Author: 李云翔
 * @Date: 2023-04-29 10:53:45
 * @LastEditTime: 2023-04-30 09:23:39
 * @FilePath: \vue3_markdown\markdown\src\layouts\component\outline\types.ts
 * @Description:
 *
 */
export interface TreeNode {
  el:  HTMLElement | null
  label: string
  tagName: string
  id?: string
  layer?:number 
  children?: TreeNode[]
}
