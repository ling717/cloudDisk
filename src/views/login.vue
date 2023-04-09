<template>
  <div class="big-box">
    <div class="container">
      <div class="from-box">
        <!-- 注册 -->
        <div class="register-box" v-if="state == '注册'">
          <h1>注册</h1>
          <input type="username" v-model="enrollInfo.username" placeholder="用户名" />
          <input type="email" v-model="enrollInfo.email" placeholder="邮箱" />
          <input type="password" v-model="enrollInfo.password" placeholder="密码" />
          <input type="password" v-model="passwordConfirm" placeholder="确认密码" />
          <button @click="enroll">注册</button>
        </div>

        <!-- 登录 -->
        <div class="login-box" v-if="state == '登录'">
          <h1>登录</h1>
          <input type="username" v-model="loginInfo.email" placeholder="用户名" />
          <input type="password" v-model="loginInfo.password" placeholder="密码" />
          <button @click="login">登录</button>
          <div @click="goVistor" class="go-vistor">暂不登录</div>
        </div>
      </div>
      <div class="con-box left">
        <h2>欢迎使用企业云盘</h2>
        <h2>祝您使用愉快!</h2>
        <img src="../assets/icon.png" alt="" />
        <p>已有账号</p>
        <button id="login" @click="goLogin">去登录</button>
      </div>
      <div class="con-box right">
        <h2>欢迎使用企业云盘</h2>
        <h2>祝您使用愉快!</h2>
        <img src="../assets/icon.png" alt="" />
        <p>没有账号?</p>
        <button id="register" @click="goRegister">去注册</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity"
import { useRouter } from "vue-router"
import { ElMessage } from "element-plus"
import { userEnroll, userLogin } from "@/api/login.js"
import { saveToken, getToken } from "@/utils/token.js"
import { onMounted } from "vue"

const goLogin = () => {
  let form_box = document.getElementsByClassName("from-box")[0]
  console.log(form_box)
  form_box.style.transform = "translateX(0%)"
  state.value = "登录"
}
const goRegister = () => {
  let form_box = document.getElementsByClassName("from-box")[0]
  form_box.style.transform = "translateX(80%)"
  state.value = "注册"
}
const goVistor = () => {
  router.push({
    path: "/visitorHome/cloudDiskIndex/allFile"
  })
}
onMounted(() => {
  if (getToken() != null) {
    router.push({
      path: "/userHome"
    })
  }
})
let state = ref("登录")
const router = useRouter()
let loginInfo = reactive({
  email: "",
  password: ""
})
let passwordConfirm = ref("")
let enrollInfo = reactive({
  username: "",
  password: "",
  email: ""
})
const enrollinit = () => {
  ;(enrollInfo.username = ""), (enrollInfo.password = ""), (enrollInfo.email = "")
}

const login = async () => {
  console.log(loginInfo)
  let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (!reg.test(loginInfo.email)) {
    ElMessage.warning({
      message: "邮箱格式错误",
      type: "warning"
    })
  } else {
    const { data: res } = await userLogin(loginInfo)
    console.log(res)

    if (res.code == 200) {
      ElMessage.success({
        message: "登录成功",
        type: "success"
      })
      saveToken(res.data.token)
      router.push({
        path: "/userHome"
      })
    } else {
      ElMessage.warning({
        message: res.msg,
        type: "warning"
      })
    }
  }
}
const enroll = async () => {
  console.log(enrollInfo)

  if (enrollInfo.password == passwordConfirm.value) {
    passwordConfirm.value = ""
    const { data: res } = await userEnroll(enrollInfo)
    if (res.code == 200) {
      ElMessage.success({
        message: "注册成功",
        type: "success"
      })
      loginInfo.email = enrollInfo.email
      loginInfo.password = enrollInfo.password
      state.value = "登录"
      let form_box = document.getElementsByClassName("from-box")[0]
      form_box.style.transform = "translateX(0%)"
    } else {
      ElMessage.warning({
        message: res.msg,
        type: "warning"
      })
    }
    enrollinit()
  } else {
    ElMessage.warning({
      message: "两次密码不一样",
      type: "warning"
    })
  }
}
</script>

<style scoped lang="scss">
.big-box {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(16deg, #76d3ea 0%, #c8c5f0 100%);
}
.container {
  background-color: #fff;
  width: 650px;
  height: 415px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  position: relative;
}

.from-box {
  position: absolute;
  top: -10%;
  left: 5%;
  background-color: #99ccff;
  width: 320px;
  height: 500px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: 0.5s ease-in-out;
}

.register-box,
.login-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

h1 {
  text-align: center;
  margin-bottom: 25px;
  color: #fff;
  letter-spacing: 5px;
}

input {
  background-color: transparent;
  width: 70%;
  color: #fff;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  padding: 10px 0;
  text-indent: 10px;
  margin: 8px 0;
  font-size: 14px;
  letter-spacing: 2px;
}

input::placeholder {
  color: #fff;
}

input:focus {
  color: #fff;
  outline: none;
  border-bottom: 1px solid #2189f0;
  transition: 0.5s;
}

input:focus::placeholder {
  opacity: 0;
}

.from-box button {
  width: 70%;
  margin-top: 35px;
  background-color: #fff;
  outline: none;
  border-radius: 8px;
  padding: 13px;
  color: #99ccff;
  letter-spacing: 2px;
  border: none;
  cursor: pointer;
}

.from-box button:hover {
  background-color: #6699cc;
  color: #f6f6f6;
  transition: background-color 0.5s ease;
}

.con-box {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.con-box.left {
  left: -2%;
}

.con-box.right {
  right: -2%;
}

.con-box h2 {
  color: #202729;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 3px;
  text-align: center;
  margin-bottom: 4px;
}

.con-box p {
  font-size: 12px;
  letter-spacing: 2px;
  color: #80bbf6;
  text-align: center;
}

.con-box {
  font-size: 12px;
  letter-spacing: 2px;
  color: #99ccff;
  text-align: center;
}

.con-box img {
  width: 150px;
  height: 150px;
  opacity: 0.9;
  margin: 40px 0;
}

.con-box button {
  margin-top: 3%;
  background-color: #fff;
  color: black;
  padding: 6px 32px;
  letter-spacing: 2px;
  outline: none;
  cursor: pointer;
  border-radius: 8px;
  border-width: 1px;
  border-color: #99ccff;
}

.con-box button:hover {
  background-color: #99ccff;
  color: #f6f6f6;
  transition: background-color 0.5s ease;
}
.go-vistor {
  margin-top: 20px;
  cursor: pointer;
  color: #fff;
}
</style>
