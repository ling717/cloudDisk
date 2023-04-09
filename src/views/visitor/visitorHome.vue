<template>
  <div>
    <div>
      <div style="margin-left: 60px" class="goLoginbox">
        <h2>赶快注册登录吧！！！</h2>
        <div class="gologin" @click="goToLogin">点击登录</div>
      </div>
    </div>
    <el-menu class="el-menu-demo" mode="horizontal" router>
      <div class="icon">
        <img src="@/assets/icon.png" alt="" />
      </div>
      <el-menu-item index="/visitorHome/cloudDiskIndex"> 企业云盘 </el-menu-item>
      <el-sub-menu index="4">
        <template #title>更多</template>
        <el-menu-item index="4-1">加入我们</el-menu-item>
        <el-menu-item index="4-2">客服</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <router-view />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"

const router = useRouter()
const goToLogin = () => {
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
.goLoginbox {
  display: flex;
  height: 60px;
  line-height: 60px;
}
.gologin {
  color: #6699cc;
  cursor: pointer;
}
</style>
