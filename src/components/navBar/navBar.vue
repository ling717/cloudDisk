<template>
  <div>
    <el-menu class="el-menu-demo" mode="horizontal" router>
      <div class="icon">
        <img src="@/assets/icon.png" alt="" />
      </div>
      <el-menu-item index="/userHome/cloudDiskIndex"> 企业云盘 </el-menu-item>
      <el-menu-item index="/userHome/cloudDiskIndex/share">分享</el-menu-item>
      <el-sub-menu index="4">
        <template #title>更多</template>
        <el-menu-item>客服电话</el-menu-item>
        <el-menu-item>加入我们</el-menu-item>
      </el-sub-menu>
      <!-- <div class="flex-grow" /> -->

      <div class="avatar">
        <el-dropdown>
          <el-avatar :size="45" :src="avatarImg" style="margin-right: 80px">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
          </el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="diolafInfoView">个人信息</el-dropdown-item>
              <el-dropdown-item @click="changePasswordView">修改密码</el-dropdown-item>
              <el-dropdown-item @click="loginOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-menu>
    <el-dialog
      v-model="diachangePasswordView"
      title="修改密码"
      :append-to-body="true"
      style="width: 400px"
    >
      <el-form label-width="60px" :model="passwordFrom">
        <el-form-item label="原密码">
          <el-input show-password v-model="passwordFrom.oldPassword" />
        </el-form-item>
        <el-form-item label="新密码">
          <el-input show-password v-model="passwordFrom.newPassword" />
        </el-form-item>
        <el-button
          type="primary"
          v-if="isXiugai == true"
          @click="changePassword"
          style="margin-left: 180px; margin-top: 30px"
          >确认修改</el-button
        >
      </el-form>
    </el-dialog>
    <el-dialog v-model="infoView" title="个人信息" :append-to-body="true" style="width: 400px">
      <el-avatar :size="80" :src="avatarImg" style="margin-right: 30px">
        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
      </el-avatar>
      <el-form :model="infoFrom" label-width="60px">
        <el-form-item label="用户名">
          <el-input v-model="infoFrom.userName" :disabled="isXiugai" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="infoFrom.acc" disabled />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="infoFrom.sex" placeholder="请选择你的性别" :disabled="isXiugai">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>

        <el-form-item label="生日">
          <el-col :span="11">
            <el-date-picker
              v-model="infoFrom.birth"
              type="date"
              placeholder="Pick a date"
              style="width: 100%"
              :disabled="isXiugai"
              value-format="YYYY-MM-DD"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="infoFrom.phone" :disabled="isXiugai" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            v-if="isXiugai == true"
            @click="isXiugaiSure"
            style="margin-left: 180px; margin-top: 30px"
            >修改信息</el-button
          >
          <el-button
            type="primary"
            v-if="isXiugai == false"
            @click="changeInfo"
            style="margin-left: 100px; margin-top: 30px"
            >确认修改</el-button
          >
          <el-button @click="cancel" v-if="isXiugai == false" style="margin-top: 30px"
            >取消修改</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"
import { useRouter } from "vue-router"
import { userLoginOut } from "@/api/login.js"
import { delToken } from "@/utils/token.js"
import { cgePassword, getUserInfo, cgeUserInfo } from "@/api/user/userInfo.js"
import { ElMessage } from "element-plus"
const avatarImg = "https://pica.zhimg.com/v2-e7e823318151b6dd8df128438178e5eb_l.jpg?source=1940ef5c"
const infoView = ref(false)
let diachangePasswordView = ref(false)
const diolafInfoView = () => {
  infoView.value = true
}
const changePasswordView = () => {
  diachangePasswordView.value = true
}
const isXiugaiSure = () => {
  isXiugai.value = false
}
let isXiugai = ref(true)
let infoFrom = ref()

const cancel = () => {
  isXiugai.value = true
  getInfo()
}
let passwordFrom = reactive({
  oldPassword: "",
  newPassword: "",
  email: ""
})
onMounted(() => {
  getInfo()
})
const getInfo = async () => {
  const { data: res } = await getUserInfo()
  console.log(res)
  infoFrom.value = res.data
}
const changePassword = async () => {
  passwordFrom.email = infoFrom.value.acc
  console.log(passwordFrom)

  diachangePasswordView.value = false
  const { data: res } = await cgePassword(passwordFrom)
  if (res.code == 200) {
    ElMessage.success({
      message: "修改成功",
      type: "success"
    })
  } else {
    ElMessage.warning({
      message: res.msg,
      type: "warning"
    })
  }
}
const changeInfo = async () => {
  infoView.value = false
  const obj = {
    birth: infoFrom.value.birth,
    phone: infoFrom.value.phone,
    sex: infoFrom.value.sex,
    username: infoFrom.value.userName
  }
  console.log(obj)
  const { data: res } = await cgeUserInfo(obj)
  if (res.code == 200) {
    ElMessage.success({
      message: "修改成功",
      type: "success"
    })
  } else {
    ElMessage.warning({
      message: res.msg,
      type: "warning"
    })
  }
}
const router = useRouter()
const loginOut = () => {
  userLoginOut()
  delToken()
  router.push({
    path: "/login"
  })
}
</script>

<style scoped>
.icon {
  width: 70px;
  display: flex;
  justify-content: center;
}
img {
  width: 50px;
  height: 50px;
}
.avatar {
  display: flex;
  align-items: center;
  margin-left: auto;
}
</style>
