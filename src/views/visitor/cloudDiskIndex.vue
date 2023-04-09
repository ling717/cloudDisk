<template>
  <div>
    <el-container>
      <el-aside width="200px"
        ><el-col :span="24">
          <el-menu router>
            <el-menu-item index="/visitorHome/cloudDiskIndex/allFile">
              <el-icon><WalletFilled /></el-icon>
              <span>全部文件</span>
            </el-menu-item>
            <el-menu-item index="/visitorHome/cloudDiskIndex/image" class="menu-item">
              <span>图片</span>
            </el-menu-item>
            <el-menu-item index="/visitorHome/cloudDiskIndex/doc" class="menu-item">
              <span>文档</span>
            </el-menu-item>
            <el-menu-item index="/visitorHome/cloudDiskIndex/video" class="menu-item">
              <span>视频</span>
            </el-menu-item>
            <el-menu-item index="/visitorHome/cloudDiskIndex/music" class="menu-item">
              <span>音乐</span>
            </el-menu-item>
            <el-menu-item index="/visitorHome/cloudDiskIndex/other" class="menu-item">
              <span>其他</span>
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
import { WalletFilled } from "@element-plus/icons-vue"
</script>

<style scoped>
.menu-item {
  margin-left: 30px;
}
</style>
