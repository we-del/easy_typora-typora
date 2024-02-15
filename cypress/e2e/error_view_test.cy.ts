/*
 * @Author: 李云翔
 * @Date: 2023-04-25 19:49:13
 * @LastEditTime: 2023-04-25 20:02:01
 * @FilePath: \vue3_markdown\markdown\cypress\e2e\test.cy.ts
 * @Description:
 *
 */
describe('测试路由拦截是否有效', () => {
  it('hello world 应该回到主页面', () => {
    cy.visit('http://localhost:5173/error')
    cy.url().should('not.include', '/error')
  })
})
