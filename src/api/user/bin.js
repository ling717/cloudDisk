import myAxios from "@/utils/request.js"

export function getBinList(data) {
  return myAxios({
    url: "/bin/get_files",
    method: "get",
    params: data
  })
}

export function restoreFile(data) {
  return myAxios({
    url: "/bin/back_file",
    method: "put",
    params: data
  })
}

export function restoreFileList(data) {
  return myAxios({
    url: "/bin/backFileByBatch",
    method: "put",
    params: data
  })
}
export function delBinFile(data) {
  return myAxios({
    url: "/file/delete",
    method: "delete",
    params: data
  })
}
export function delBinFileList(data) {
  return myAxios({
    url: "/file/deleteByBatch",
    method: "delete",
    params: data
  })
}
