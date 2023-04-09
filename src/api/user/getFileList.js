import myAxios from "@/utils/request.js"

//查询当前路径文件信息
export function getFileQueryList(data) {
  console.log(data)
  return myAxios({
    url: "/file/file_query",
    method: "get",
    // data: data
    params: data
  })
}

export function getImgList(data) {
  return myAxios({
    url: "/file_type/img",
    method: "get",
    params: data
  })
}

export function getMusicList(data) {
  return myAxios({
    url: "/file_type/music",
    method: "get",
    params: data
  })
}

export function getOthersList(data) {
  return myAxios({
    url: "/file_type/others",
    method: "get",
    params: data
  })
}

export function getTxtList(data) {
  return myAxios({
    url: "/file_type/txt",
    method: "get",
    params: data
  })
}

export function getVideoList(data) {
  return myAxios({
    url: "/file_type/vedio",
    method: "get",
    params: data
  })
}

export function getFolderList(data) {
  return myAxios({
    url: "/file_type/dirs",
    method: "get",
    params: data
  })
}
