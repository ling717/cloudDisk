<template>
  <el-button type="primary" round size="large">
    <div for="upfile" class="up" @click="uploadFileView">
      <el-icon><Upload /></el-icon><span style="width: 50px">上传</span>
    </div>
  </el-button>
  <el-dialog title="上传文件" :close-on-click-modal="false" v-model="uploadFileV" width="500px">
    <el-upload action="" :http-request="handleRequest" :show-file-list="false" drag>
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <div v-else>
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">点击/拖拽上传文件</div>
      </div>
      <template #tip>
        <div v-if="!imageUrl" class="el-upload__tip"></div>
      </template>
    </el-upload>
  </el-dialog>
</template>

<script setup>
import { ElMessage } from "element-plus"

import { ref } from "vue"
import { UploadFilled, Upload, Files } from "@element-plus/icons-vue"
import { uoloadFile } from "@/api/user/opFile.js"

const props = defineProps({
  path: String
})

const imageUrl = ref("")
let uploadFileV = ref(false)
const uploadFileView = () => {
  uploadFileV.value = true
}
let uploadInfo = {
  file: {},
  savePath: "/"
}
const emit = defineEmits(["handleRequest"])

const handleRequest = async (e) => {
  uploadInfo.file = e.file
  if (props.path) {
    uploadInfo.savePath = "/" + props.path
  }

  uploadFileV.value = false
  const { data: res } = uoloadFile(uploadInfo.file, uploadInfo.savePath)

  if (res.code == 200) {
    ElMessage.success({
      message: "上传成功",
      type: "success"
    })
  } else {
    ElMessage.warning({
      message: res.msg,
      type: "warning"
    })
  }
  emit("handleRequest")
}
</script>

<style>
.up {
  width: 70px;
  font-weight: bolder;
  display: flex;
  justify-content: center;
}

.file-path-item {
  display: flex;
  align-items: center;
}
</style>
