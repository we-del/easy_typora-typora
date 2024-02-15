/*
 * @Author: 李云翔
 * @Date: 2023-05-04 09:02:26
 * @LastEditTime: 2023-05-04 09:02:26
 * @FilePath: \vue3_markdown\markdown\preload.js
 * @Description:
 *
 */
// preload.js

// 所有的 Node.js API接口 都可以在 preload 进程中被调用.
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
