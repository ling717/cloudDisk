import myAxios from "@/utils/request.js"

// 回收站列表
export function getRecList(data) {
  return myAxios({
    url: "/bin/get_files",
    method: "get",
    params: data
  })
}

// 复原文件
export function restoreFile(data) {
  return myAxios({
    url: "/bin/back_file",
    method: "put",
    params: data
  })
}
// 批量复原
export function restoreFileList(data) {
  return myAxios({
    url: "/bin/backFileByBatch",
    method: "put",
    params: data
  })
}

// 永久删除/从回收站移除
export function delRecFile(data) {
  return myAxios({
    url: "/bin/del_file",
    method: "delete",
    params: data
  })
}

//批量删除
export function delRecFileList(data) {
  return myAxios({
    url: "/bin/delFileByBatch",
    method: "delete",
    params: data
  })
}
