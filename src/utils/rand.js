/**
 * @description: 工厂函数用于生成对应的类型数据    | 使用工厂模式和 策略(命令|职责链)模式 集成
 * @param {number} count  返回的数据个数
 * @param {number} type 需要生成的数据类型，暂定 0 | 1 | 2 | 3
 * @return {string} 返回的目标字符串
 */

function randomDataFactory(count, type) {
  let res = '';
  while (count--) {
    if (type == 0) {
      res += randomDataFactory(1, getSingleNumber(3) + 1);
    } else if (type == 1) {
      res += getSingleChinese();
    } else if (type == 2) {
      res += getSingleNumber();
    } else if (type == 3) {
      res += getSingleChar();
    }
  }
  return res;
}

/**
 * @description: 用于获取随机长度的汉字
 * @param {number} len 具体获取的长度
 * @return {string} 返回指定数量的汉字
 */
export function getRandChinese(count = 10) {
  return randomDataFactory(count, 1);
}

/**
 * @description: 得到单个汉字
 * @return {string} 返回单个汉字
 */
export function getSingleChinese() {
  const start = parseInt('4e00', 16);
  const end = parseInt('9fa5', 16);
  let name = '';
  const cha = Math.floor(Math.random() * (end - start));
  name += '\\u' + (start + cha).toString(16);
  return eval(`'${name}'`);
}

/**
 * @description: 返回指定长度的整数
 * @param {number} count 可选长度，默认为10
 * @return {number} 返回一个非0开头的整数整数
 */
export function getRandNumber(count = 10) {
  let res = '';
  const first = Math.ceil(Math.random() * 9);
  res += first;
  res += randomDataFactory(count, 2);
  return Number(res);
}
/**

 * @description:  返回指定范围的整数 ，默认返回0-9
 * @param {number} range
 * @return {number} 返回单个整数 0-9
 */
export function getSingleNumber(range = 10, end = 0) {
  return Math.floor(Math.random() * range + end);
}

/**
 * @description: 返回指定长度的随机字符串
 * @param string} count 可选长度，默认为10
 * @return {string} 返回字符串
 */
export function getRandString(count = 10) {
  return randomDataFactory(count, 3);
}

/**
 * @description:  返回指定单个子缚 ，默认返回 a-z
 * @return {string} 返回 a-z之间的字符
 */
export function getSingleChar() {
  return String.fromCodePoint(getSingleNumber(26, 97));
}

/**
 * @description: 返回随机的组合字符串
 * @param {number} count 返回的随机长度
 * @return {string} 返回字符串
 */
export function getMixinBetweenStringAndNumber(count = 10) {
  return randomDataFactory(count, 0);
}

/**
 * @description: 返回  curYear - range  ———— curYear 之间的年份
 * @param {number} range 随机年份范围
 * @return {number} 返回的随机年份
 */
export function getRandYear(range = 20) {
  const curYear = new Date().getFullYear();

  return Math.ceil(Math.random() * range) + curYear - range;
}




