import myAxios from "@/utils/request.js"

// 用户注册
export function userEnroll(data) {
  return myAxios({
    url: "/register",
    method: "post",
    data: data
  })
}

//用户登录
export function userLogin(data) {
  return myAxios({
    url: "/login",
    method: "post",
    data: data
  })
}
//登出
export function userLoginOut(data) {
  return myAxios({
    url: "/logout",
    method: "get",
    data: data
  })
}
