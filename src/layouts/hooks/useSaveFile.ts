import { ref } from 'vue';
/*
 * @Author: 李云翔
 * @Date: 2023-05-03 12:07:08
 * @LastEditTime: 2023-05-03 12:11:54
 * @FilePath: \vue3_markdown\markdown\src\layouts\hooks\useSaveFile.ts
 * @Description: 
 * 
 */


export function useSaveFile(){
//  const  = ref() 
// 如何判断当前文件是否保存过？判断当前导航栏是否有文件被选中即可，如果没有一个文件被选中，则说明该文件未保存过，此时需要进行保存

  function saveFile(){
    
  }
  return {saveFile}
}