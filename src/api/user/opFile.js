import myAxios from "@/utils/request.js"
import axios from "axios"
import { getToken } from "@/utils/token.js"
// 上传文件
export function uoloadFile(fileObj, savePath) {
  let file = new FormData()
  file.append("file", fileObj)

  file.append("savePath", savePath)

  let resData = {};
  axios({
    method: "post",
    url: "http://localhost:8000/file/upload",
    data: file,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      token: getToken()
    }
  }).then((res)=>{
    console.log(res)
    resData = res
  })
  return resData  
}
// 下载文件
export function downloadFile(data) {
  // return myAxios({
  //   url: "/download",
  //   method: "get",
  //   params: data
  // })
  console.log(data)
  axios({
    method: "get",
    url: "http://localhost:8000/download",
    params: {
      downloadPath: data.downloadPath
    },
    responseType: "blob",
    headers: {
      token: getToken()
    }
  })
}
export function downloadFileList(data) {
 
  console.log(data)
  axios({
    method: "get",
    url: "http://localhost:8000/downloadByBatch",
    params: {
      downloadPaths: data.downloadPathszm
    },
    responseType: "blob",
    headers: {
      token: getToken()
    }
  })
}
// 创建文件夹
export function createFolder(data) {
  return myAxios({
    url: "/file/mkdir",
    method: "post",
    params: data
  })
}
// 删除文件
export function deleteFile(data) {
  return myAxios({
    url: "/bin/toBin",
    method: "put",
    params: data
  })
}

// 批量删除
export function deleteFileList(data) {
  return myAxios({
    url: "/bin/toBinByBatch",
    method: "put",
    params: data
  })
}
// 移动文件到
export function remove(data) {
  return myAxios({
    url: "/file/move_to",
    method: "put",
    params: data
  })
}
// 重命名
export function renameFile(data) {
  return myAxios({
    url: "/file/rename",
    method: "put",
    params: data
  })
}
// 复制文件到
export function copyFile(data) {
  return myAxios({
    url: "/file/copy_to",
    method: "put",
    params: data
  })
}

export function getFileInfo(data) {
  return myAxios({
    url: "/file/content",
    method: "get",
    params: data
  })
}
