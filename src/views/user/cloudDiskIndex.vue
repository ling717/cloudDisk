<template>
  <div>
    <el-container>
      <el-aside width="200px"
        ><el-col :span="24">
          <el-menu router>
            <el-menu-item index="/userHome/cloudDiskIndex/allFile">
              <el-icon><WalletFilled /></el-icon>
              <span>全部文件</span>
            </el-menu-item>
            <el-menu-item index="/userHome/cloudDiskIndex/image" class="menu-item">
              <span>图片</span>
            </el-menu-item>
            <el-menu-item index="/userHome/cloudDiskIndex/doc" class="menu-item">
              <span>文档</span>
            </el-menu-item>
            <el-menu-item index="/userHome/cloudDiskIndex/video" class="menu-item">
              <span>视频</span>
            </el-menu-item>
            <el-menu-item index="/userHome/cloudDiskIndex/music" class="menu-item">
              <span>音乐</span>
            </el-menu-item>
            <el-menu-item index="/userHome/cloudDiskIndex/other" class="menu-item">
              <span>其他</span>
            </el-menu-item>
            <el-menu-item index="/userHome/cloudDiskIndex/share">
              <el-icon><Promotion /></el-icon>
              <span>分享</span>
            </el-menu-item>
            <el-menu-item index="/userHome/cloudDiskIndex/recycleBin">
              <el-icon><DeleteFilled /></el-icon>
              <span>回收站</span>
            </el-menu-item>
            <el-menu-item index="/userHome/cloudDiskIndex/admin">
              <el-icon><DeleteFilled /></el-icon>
              <span>管理用户</span>
            </el-menu-item>
          </el-menu>
        </el-col></el-aside
      >
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { DeleteFilled, Promotion, WalletFilled } from "@element-plus/icons-vue"
</script>

<style scoped>
.menu-item {
  margin-left: 30px;
}
</style>
