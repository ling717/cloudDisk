// 导入router所需的方法
import { createRouter, createWebHistory } from "vue-router"
import userRouter from "./user"
import visitorRouter from "./visitor"
import { ElMessage } from "element-plus"

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue")
  },
  {
    path: "/userHome",
    name: "userHome",
    redirect: "/userHome/cloudDiskIndex",
    component: () => import("@/views/user/userHome.vue"),
    children: userRouter
  },
  {
    path: "/visitorHome",
    name: "visitorHome",
    redirect: "/visitorHome/cloudDiskIndex",
    component: () => import("@/views/visitor/visitorHome.vue"),
    children: visitorRouter
  },
  {
    path: "/adminHome",
    name: "adminHome",
    component: () => import("@/views/admin/adminHome.vue"),
    children: []
  }
]
// 路由参数配置
const router = createRouter({
  // 使用hash(createWebHashHistory)模式，(createWebHistory是HTML5历史模式，支持SEO)
  history: createWebHistory(),
  routes
})

// 在此处进行配置全局的路由守卫（全局前置钩子）
// 目的是：判断当前用户中本地存储是否有token，使用户在登录之前，只能访问到/login页面，其他的页面是访问不到的。
router.beforeEach((to, from, next) => {
  // to 即将进入的路由
  // from 在哪个路由进入的
  // next 放行
  //   console.log(to); //打印的是页面要跳转到的路由,例如：它下面的path：为"/login"
  let token = localStorage.getItem("token") || "" //在本地存储中获取token
  if (token) {
    //判断是否有token
    next()
  } else if (
    to.path == "/visitorHome/cloudDiskIndex/allFile" ||
    to.path == "/visitorHome/cloudDiskIndex/image" ||
    to.path == "/visitorHome/cloudDiskIndex/doc" ||
    to.path == "/visitorHome/cloudDiskIndex/music" ||
    to.path == "/visitorHome/cloudDiskIndex/other" ||
    to.path == "/visitorHome/cloudDiskIndex/video"
  ) {
    next()
  } else {
    //在没有token的前提下，to下面的path是否为/login，如果不是则页面跳转到登录页面
    if (to.path == "/login") {
      next()
    } else {
      ElMessage.warning({
        message: "请登录",
        type: "warning"
      })
      next({ path: "/login" }) //跳转页面到login页
    }
  }
})
export default router
