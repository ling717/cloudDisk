import myAxios from "@/utils/request.js"

export function seachFile(data) {
  return myAxios({
    url: "/share/shareFile",
    method: "post",
    params: data
  })
}

export function myShareFile(data) {
  return myAxios({
    url: "/share/shareOutInfo",
    method: "get",
    params: data
  })
}

export function acceptShareFile(data) {
  return myAxios({
    url: "/share/shareInInfo",
    method: "get",
    params: data
  })
}
