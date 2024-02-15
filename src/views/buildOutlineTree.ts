
import { useOutlineStore } from "@/stores"
import type {TreeNode} from '@/layouts/component/outline/types'
import { tagContentCleaner } from "@/utils"
/**
 * @description: 构建大纲树，结点上需要挂载 id（唯一标识）,el(对应dom实例),label(对应dom实例的内容),tagName(对应dom实例的标签)四个属性
 * @param {string[]} arr 存储所有匹配到的h标签，用于构建大纲树
 * @param {HTMLElement} el 当前操作的元素，如果是h时，则进行树的构建且引用对应关联的dom标签
 * @return {*}
 */
export function buildOutlineTree(arr: string[], el?: HTMLElement) {
  const outlineStore = useOutlineStore()
  // outlineStore.
  if (JSON.stringify(arr) === '[]') {
    // 没有H了，大纲为空清空大纲
    outlineStore.tree = []
    // console.log('大纲树不存在')

    return
  }
  // if (!el?.tagName.toUpperCase().includes('H')) {
  //   console.log('大纲树存在，但当前没有操作大纲树内容')
  //   return
  // }

  const tree: Array<TreeNode> = []
  // const tree: Array<TreeNode> = outlineStore.tree || []
  for (let i = 0; i < arr.length; i++) {
    // console.log('结点列表为:', tree)

    // 根结点
    if (tree.length === 0) {
      tree.push(treeNodeWrapper(arr[i]))
      continue
    }
    // 深度递归查找父结点所处位置找出父结点在 树中所处的位置
    const nodePath = searParentTreeNodePath(tree, treeNodeWrapper(arr[i - 1]))
    if (!nodePath) {
      return
    }
    // 当前结点和上一个结点比较，如果比他大则直接挂载到其children下，并赋予layer属性
    if (priorCompare(treeNodeWrapper(arr[i]).tagName, treeNodeWrapper(arr[i - 1]).tagName)) {
      // 当前结点比上一个结点大，需要挂载到其后
      const lastNodeIndex = nodePath.length - 1
      const lastNode = nodePath[lastNodeIndex]

      // if (!lastNode.children) lastNode.children = []
      const node = treeNodeWrapper(arr[i])
      const layer = lastNodeIndex + 1
      // // 最终包裹层级为搜索路径的长度，如果有一个父级结点，则层级为1，两个父级结点则成绩为2...
      // node.layer = lastNodeIndex + 1
      // lastNode.children.push(node)
      mountNodeToParentNode(lastNode, node, layer)

      continue
    }

    // 当前结点比上一个结点小，则需要从低到搞顺延查找其路径下的挂载点位
    findMountParentNode(nodePath, treeNodeWrapper(arr[i]), tree)
  }
  outlineStore.tree = tree
}


/**
 * @description: 将一个string包装为树结点对象
 * @param {string} tagString 是一个标签的字符串形式，型如  <h1>content</h1>
 * @return {Object} 包装为虚拟结点后的值
 */
function treeNodeWrapper(tagString: string): TreeNode {
  const node: TreeNode = { el: null, label: '', tagName: '' }

  // const contentPattern = /<(.*?)\s*id=(.*?)>(.*?)<\/.*?>/
  // const contentPattern = /<(.*?)\s*id=(.*?)\s*(style=.*?)?>(.*?)<\/.*?>/
  const contentPattern = /<(.*?)\s*id=(.*?)>(.*?)<\/.*?>/

  const matchRes = contentPattern.exec(tagString)

  if (matchRes) {
    // 处理错误匹配dom元素问题
    node.tagName = matchRes[1]
    // debugger
    // const id = matchRes[2] || matchRes[3]
    const id = matchRes[2].split(' ')[0]
    let content = ''
    if (id) {
      node.id = id
      node.el = document.querySelector(`[id=${id}]`)
    }
    if (node.el) {
      // 内容断言
      const childEle = node.el?.firstElementChild
      
      if (childEle) {
        content = childEle.innerHTML
      }
      if(content){
        node.el.innerHTML = content 
      }
    }
    if (content) node.label = tagContentCleaner(content)
    else node.label = tagContentCleaner(matchRes[3])
  }
  return node
}



/**
 * @description: 在一颗树中查找出一个结点的父结点,返回该结点下所有的路径结点，如果都无法满足，则将其挂载到根结点下
 * @param {Object[]} tree 当前构建的一颗树
 * @param {string} tagStr
 * @return {*} 返回查找后的路径数组，每个索引上依次存储祖先结点，父级结点，直接父级结点.. ,方便我们挂载到对应结点上
 */
function searParentTreeNodePath(
  tree: TreeNode[],
  tagNode: TreeNode,
  treePath: TreeNode[] = []
): any {
  // 深度递归查找目标结点，将查找记录存储路径数组中

  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    // 尝试在此路径下查找
    treePath.push(node)

    // 找到正确的路径即刻退出
    if (node.id === tagNode.id) {
      return treePath
    }

    if (node.children) {
      const path = searParentTreeNodePath(node.children, tagNode, treePath)
      if (path) return path
    }
    // 此不是正确的路径将其进行删除
    treePath.pop()
  }
}

/**
 * @description: 对两个标签的优先级进行比较
 * @param {string} tagStr1 第一个比较的值
 * @param {string} tagStr2 第二个比较的值
 * @return {boolean} 如果第一个比第二个则返回true，反之   ，如 <h6> 和 <h5> 比较，此时返回true , h6挂载到h5下
 */
function priorCompare(tagStr1: string, tagStr2: string) {
  const prior1Match = tagStr1.match(/h(\d)/)
  const prior2Match = tagStr2.match(/h(\d)/)
  if (prior1Match && prior2Match && prior1Match[1] && prior2Match[1]) {
    const prior1 = prior1Match[1]
    const prior2 = prior2Match[1]
    return Number(prior1) > Number(prior2)
  }

  return false
}



/**
 * @description:  将当前结点挂载到父结点下
 * @param {TreeNode} parentNode
 * @param {TreeNode} node
 * @return {void}
 */
function mountNodeToParentNode(parentNode: TreeNode, node: TreeNode, layer: number) {
  if (!parentNode.children) parentNode.children = []
  // 最终包裹层级为搜索路径的长度，如果有一个父级结点，则层级为1，两个父级结点则成绩为2...
  node.layer = layer
  parentNode.children.push(node)
}

/**
 * @description: 找出父级结点，并返回树的挂载
 * @param {TreeNode[]} nodePath 当前父结点的依赖路径
 * @param {TreeNode} node 当前需要挂载的结点
 * @param {TreeNode[]} tree 当前树根结点，如果树结点上都没有需要挂载的结点位置，则该结点应该挂载到根结点上
 * @return {void}
 */
function findMountParentNode(nodePath: TreeNode[], node: TreeNode, tree: TreeNode[]) {
  for (let i = nodePath.length - 1; i >= 0; i--) {
    if (priorCompare(node.tagName, nodePath[i].tagName)) {
      // 当前结点比上一个结点大，需要挂载到其后
      const layer = i + 1
      mountNodeToParentNode(nodePath[i], node, layer)
      return
    }
  }
  // 该结点需要挂载到根结点上
  tree.push(node)
}