import { reactive, ref } from 'vue'

enum FileDialogTitle {
  CREATE_FILE = '创建文件',
  SAVE_FILE = '保存文件',
  WARNING = '警告'
}
enum FileDialogCancel {
  CANCEL = '取消',
  DISPOSE = '丢弃当前内容重新创建文件'
}
enum FileDialogConfirm {
  SAVE_NOW = '现在去保存',
  SAVE = '保存',
  CONFIRM = '确定'
}

export function useState() {
  const addFile = () => {
    dialogVisible.value = true
    // 检查当前王是否有选中的文件，如果判断是不是当前的文件，否则该文件就需要新增
  }
  const dialogVisible = ref<boolean>(false)
  const fileList = reactive([])
  const dialogTitle = ref<FileDialogTitle>(FileDialogTitle.CREATE_FILE)
  const dialogCancel = ref<FileDialogCancel>(FileDialogCancel.CANCEL)
  const dialogConfirm = ref<FileDialogConfirm>(FileDialogConfirm.SAVE)
  const fileName = ref<string>('')
  return { addFile, dialogVisible, dialogTitle, fileList, fileName ,dialogCancel,dialogConfirm }
}
