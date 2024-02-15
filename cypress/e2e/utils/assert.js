/*
 * @Author: 李云翔
 * @Date: 2023-04-08 15:11:15
 * @LastEditTime: 2023-04-08 15:18:52
 * @FilePath: \app-acm-useCypress\cypress\e2e\utils\assert.js
 * @Description:
 *
 */

/**
 * @description: 类型断言
 * @param {Object} target 需要断言的目标对象
 * @return {string} 具体的类型
 */
export function typeAssert(target) {
  const type = Object.prototype.toString.call(target);
  const pattern = /\[object (.*)\]/;
  const res = pattern.exec(type);
  return res && res[1];
}
