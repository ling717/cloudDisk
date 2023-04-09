import myAxios from "@/utils/request.js"
import { getToken } from "@/utils/token.js"

import qs from "qs"
import axios from "axios"
// 获取用户列表
export function getUserList(data) {
  return myAxios({
    url: "/admin/get_users",
    method: "get",
    params: data
  })
}
// 删除用户
export function delUser(data) {
  return myAxios({
    url: "/admin/del_users",
    method: "delete",
    params: data
  })
}
export function delUserList(data) {
  return myAxios({
    url: "/admin/delByBatch",
    method: "delete",
    params: data
  })
}
// 设置用户为管理员
export function setUpAdmin(data) {
  return myAxios({
    url: "/admin/to_admin",
    method: "put",
    params: data
  })
}
export function setUpAdminList(data) {
  return myAxios({
    url: "/admin/toAdminByBatch",
    method: "put",
    params: data
  })
}
