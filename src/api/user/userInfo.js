import myAxios from "@/utils/request.js"

export function getUserInfo(data) {
  return myAxios({
    url: "/user/getInfo",
    method: "get"
  })
}

export function cgePassword(data) {
  return myAxios({
    url: "/user/updatePassword",
    method: "put",
    data: data
  })
}

export function cgeUserInfo(data) {
  return myAxios({
    url: "/user/updateInfo",
    method: "put",
    data: data
  })
}

export function seachUserInfo(data) {
  return myAxios({
    url: "/user/getAllUserByVague",
    method: "get",
    params: data
  })
}
