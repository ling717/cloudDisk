<template>
  <div class="btn">
    <el-button type="primary" text title="下载" @click="download"
      ><el-icon><Download /></el-icon>
    </el-button>
  </div>
</template>

<script setup>
import { Download } from "@element-plus/icons-vue"
import { getToken } from "@/utils/token.js"
import { downloadFile } from "@/api/user/opFile.js"
import axios from "axios"
import { ElMessage } from "element-plus"
const props = defineProps({
  path: String,
  fileName: String
})
let info = {
  downloadPath: props.path
}

const download = () => {
  axios({
    method: "get",
    url: "http://localhost:8000/download",
    params: {
      downloadPath: info.downloadPath
    },
    headers: {
      token: getToken()
    },
    responseType: "blob"
  })
    .then((res) => {
      console.log(res)
      const url = window.URL.createObjectURL(new Blob([res.data]))
      // console.log(url)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", props.fileName)
      document.body.appendChild(link)
      link.click()
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<style scoped>
.btn {
  width: 25px;
}
</style>
