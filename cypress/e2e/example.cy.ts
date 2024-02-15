/*
 * @Author: 李云翔
 * @Date: 2023-04-30 13:07:02
 * @LastEditTime: 2023-05-03 11:22:49
 * @FilePath: \vue3_markdown\markdown\cypress\e2e\example.cy.ts
 * @Description:
 *
 */
// https://docs.cypress.io/api/introduction/api.html

function generateSpace() {
  cy.get('[cy-markdown]').type(`
    
    
    
    











    
    
  `)
}

describe('对markdown输入内容进行测试', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it.skip('测试点击标题达到内容跳转', () => {
    cy.get('[cy-markdown]').type('# h1标题 {enter}')
    generateSpace()
    cy.get('[cy-markdown]').type('### h3标题 {enter}')
    generateSpace()
    cy.get('[cy-markdown]').type('##### h5标题 {enter}')
    generateSpace()
    cy.get('[cy-markdown]').type('# h1标题 {enter}')
    generateSpace()
    cy.get('[cy-markdown]').type('### h3标题 {enter}')
    generateSpace()
    cy.get('[cy-markdown]').type('## h2标题 {enter}')
    generateSpace()
    cy.get('[cy-markdown]').type('# h1标题 {enter}')
    generateSpace()
    // cy.get('[cy-markdown]').type()
  })
  it.skip('测试使用回车向上创建一个标签然后删除后，是否存在错误显示', () => {
    cy.get('[cy-markdown]').type('# h1标题 {enter}')
    cy.get('[cy-markdown]').type(' h2标题 {enter}')
    cy.get('[cy-markdown]').type(' h3标题 {enter}')
    cy.get('[cy-markdown]').type(' h4标题 {enter}')
    // cy.get('[cy-markdown]').type('### h3标题 {enter}')
    // cy.get('[cy-markdown]').type('# h1标题 {enter}')
    // cy.get('[cy-markdown]').type('### h3标题 {enter}')

    // cy.get('[cy-markdown]').type()
  })

  // 测试有bug，需要处理,初次打开时，无法使用快捷键
  it.skip('测试shortcut是否可以正常使用', () => {
    // 不能以一级标签开头？
    cy.get('[cy-markdown]').type('{ctrl} {2} 我是h2 {enter}')
    // cy.wait(1000)
    cy.get('[cy-markdown]').type('{ctrl} {1} 我是h1 {enter}')
    // cy.wait(1000)
    cy.get('[cy-markdown]').type('{ctrl} {3} 我是h3 {enter}')
  })

  it.skip('测试li标签没空时的标签降级', () => {
    cy.get('[cy-markdown]').type('{shift} {+} 我是h1 {enter}')
    cy.get('[cy-markdown]').type('{shift}  {enter}')
    cy.get('[cy-markdown]').type('{shift} {enter}')
  })
  // 使用tdd开发模型，
  it('测试表头标签在为空时按一下删除建能够正常删除', () => {
    cy.get('[cy-markdown]').type('{ctrl}{1}n')
    // cy.wait(1000)
    cy.get('[cy-markdown]').type('{backspace}')
    // cy.wait(1000)
    cy.get('[cy-markdown]').type('{backspace}')
    // cy.wait(1000)
    // cy.get('[cy-markdown]').type('{backspace}')
  })
})
