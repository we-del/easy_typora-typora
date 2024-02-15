/*
 * @Author: 李云翔
 * @Date: 2023-04-07 15:21:54
 * @LastEditTime: 2023-04-09 14:39:14
 * @FilePath: \app-acm-useCypress\cypress\e2e\utils\operateEle.js
 * @Description: 对所有cypress常见操作的集成
 *
 */
import { typeAssert } from './assert';
/**
 * @description: 数值设置中心，用于统一的管理和分发设置值
 * @param {string} el 需要设置值的对象 ,需要是唯一的符合data-cy命名的属性
 * @param {string} val 需要设置的值
 * @param {number} type 具体操作类型   0 为 Input , 1 为 textarea

 */
function elValSetupCenter(el, val, type) {
  const target = cy.get(el);
  target.then($tag => {
    const tag = $tag[0];

    switch (type) {
      case 0:
        // 必须使用此断言方式，无法使用instanceof 判断，无法成功
        if (typeAssert(tag) === 'HTMLInputElement') return elValHandlerOnInput(target, val);
        else return wrapperElValHandlerOnInput(target, 'input', val);
      case 1:
        if (typeAssert(tag) === 'HTMLTextAreaElement') return elValHandlerOnInput(target, val);
        else return wrapperElValHandlerOnInput(target, 'textarea', val);
    }
  });
}

function wrapperElValHandlerOnInput(cy, el, val) {
  return cy.find(el).clear().type(val);
}
function elValHandlerOnInput(cy, val) {
  return cy.clear().type(val);
}
/**
 * @description: 用于设置input框内容
 * @param {string} el 需要获取的元素标签 ，需要是唯一获取的元素标签
 * @param {string | number} val 需要输入的值
//  * @return {*} undefined
 */
export function setValOnInput(el, val) {
  if (typeof val === 'number') val = String(val);
  return elValSetupCenter(el, val, 0);
}
/**
 * @description: 用于设置textarea 框的内容
 * @param {string} el 需要获取的元素标签 ，通常是组件
 * @param {string} val 需要输入的值
//  * @return {*} undefined
 */
export function setValOnTextarea(el, val) {
  return elValSetupCenter(el, val, 1);
}

// 丢弃虽然精简但增加了使用时的心智负担，需要判断什么时候用什么值
/**
 * @description: 用于重置组件input框内容,如 el-input ，给该属性绑定属性实际上是给组件最外层容器设置属性
 * @param {string} el 需要获取的元素标签 ，通常是组件
 * @param {string} val 需要输入的值
 * @return {*} undefined
 */
// export function setValueOnInputByComponent(el, val) {
//   cy.log(HTMLInputElement);
//   const document = cy.document();
//   const tag = cy.get(el);
//   tag.then($tag => {
//     const isInput = $tag instanceof HTMLInputElement;
//     debugger;
//   });
//   // debugger;
//   tag.find('input').clear().type(val);
// }
// /**
//  * @description: 用于重置的input框内容
//  * @param {string} el 需要获取的元素标签 ，通常是组件
//  * @param {string} val 需要输入的值
//  * @return {*} undefined
//  */
// export function setValueOnInputByElement(el, val) {
//   const tag = cy.get(el);
//   tag.then($tag => {
//     const isInput = $tag instanceof HTMLInputElement;
//     // Cypress.$('')
//     debugger;
//   });
//   tag.clear().type(val);
// }
// /**
//  * @description: 用于重置组件textarea框内容,如 el-textarea ，给该属性绑定属性实际上是给组件最外层容器设置属性
//  * @param {string} el 需要获取的元素标签 ，通常是组件
//  * @param {string} val 需要输入的值
//  * @return {*} undefined
//  */
// export function setValueOnTextareaByComponent(el, val) {
//   cy.get(el).find('textarea').clear().type(val);
// }

// /**
//  * @description: 用于重置的textarea框内容
//  * @param {string} el 需要获取的元素标签 ，通常是组件
//  * @param {string} val 需要输入的值
//  * @return {*} undefined
//  */
// export function setValueOnTextareaByElement(el, val) {
//   cy.get(el).clear().type(val);
// }
