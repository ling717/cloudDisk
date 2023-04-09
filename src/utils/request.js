import axios from "axios"
import { delToken } from "./token.js"
import { ElMessage } from "element-plus"
import { useRouter } from "vue-router"

function myAxios(axiosConfig) {
  const service = axios.create({
    baseURL: "http://localhost:8000", // 设置统一的请求前缀
    timeout: 20000 // 设置统一的超时时长
  })
  // 请求拦截
  service.interceptors.request.use(
    (config) => {
      //携带token
      if (getTokenAUTH() && typeof window !== "undefined") {
        config.headers.token = getTokenAUTH()
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  const router = useRouter()
  //响应拦截
  service.interceptors.response.use(
    (response) => {
      const { data: res } = response
      if (res.code === 403) {
        ElMessage({
          type: "error",
          message: "您未登录，或者登录已经超时，请先登录！"
        })
        delToken()
        router.push({
          path: "/login"
        })
      }
      return response
    },
    (error) => {
      httpErrorStatusHandle(error) // 处理错误状态码
      return Promise.reject(error) // 错误继续返回给到具体页面
    }
  )
  return service(axiosConfig)
}

const TOKEN_KEY = "token"
function getTokenAUTH() {
  return localStorage.getItem(TOKEN_KEY)
}

function httpErrorStatusHandle(error) {
  let message = ""
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = "接口重定向了！"
        break
      case 400:
        message = "参数不正确！"
        break
      case 401:
        message = "您未登录，或者登录已经超时，请先登录！"
        break
      case 403:
        message = "您没有权限操作！"
        break
      case 404:
        message = `请求地址出错: ${error.response.config.url}`
        break // 在正确域名下
      case 408:
        message = "请求超时！"
        break
      case 409:
        message = "系统已存在相同数据！"
        break
      case 500:
        message = "服务器内部错误！"
        break
      case 501:
        message = "服务未实现！"
        break
      case 502:
        message = "网关错误！"
        break
      case 503:
        message = "服务不可用！"
        break
      case 504:
        message = "服务暂时无法访问，请稍后再试！"
        break
      case 505:
        message = "HTTP版本不受支持！"
        break
      default:
        message = "异常问题，请联系管理员！"
        break
    }
  }
  if (error.message.includes("timeout")) message = "网络请求超时！"
  if (error.message.includes("Network"))
    message = window.navigator.onLine ? "服务端异常！" : "您断网了！"

  ElMessage({
    type: "error",
    message
  })
}

export default myAxios
