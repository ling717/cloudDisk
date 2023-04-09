<template>
  <div>
    <div class="op">
      <div class="op-item">
        <el-button type="primary" text @click="download"
          ><el-icon><Download /></el-icon> <span>下载</span>
        </el-button>
      </div>
      <div class="op-item">
        <el-button type="primary" text @click="del"
          ><el-icon><Delete /></el-icon><span>删除</span></el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { Download, Delete } from "@element-plus/icons-vue"
import { ref, toRaw } from "vue"
import { ElMessage } from "element-plus"
import { deleteFileList,downloadFileList } from "@/api/user/opFile.js"
import axios from "axios"
import {getToken} from '@/utils/token.js';
const props = defineProps({
  fileDelList: Object,
  fileDownList: Object
})

const download = async() => {
  const fileDownList = toRaw(props.fileDownList)
  if (props.fileDownList.length <= 0) {
    ElMessage.warning({
      message: "请选中所需要操作的文件",
      type: "warning"
    })
  }
  console.log(fileDownList)
  let obj = {
    downloadPaths:fileDownList+''
  }
  // const {data:res} = await downloadFileList(obj)
  // if (res.code == 200) {
  //   ElMessage.success({
  //     message: '下载成功',
  //     type: "success"
  //   })
    
  // } else {
  //   ElMessage.warning({
  //     message: res.msg,
  //     type: "warning"
  //   })
  // }
  axios({
    method: "get",
    url: "http://localhost:8000/downloadByBatch",
    params: {
      downloadPaths: obj.downloadPaths
    },
    headers: {
      token: getToken()
    },
    responseType: "blob"
  })
    .then((res) => {
      console.log(res)
      const url = window.URL.createObjectURL(
        new Blob([res.data, { type: "application/octet-stream;charset=UTF-8" }])
      )
      console.log(url)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download",res.headers.filename)
      document.body.appendChild(link)
      link.click()
    })
    .catch((err) => {
      console.log(err)
    })
}
const del = async () => {
  const fileDelList = toRaw(props.fileDelList)
  if (props.fileDownList.length <= 0) {
    ElMessage.warning({
      message: "请选中所需要操作的文件",
      type: "warning"
    })
  }
  console.log(fileDelList)
  const obj = {
    ids: fileDelList + ""
  }
  const{data:res}= await deleteFileList(obj)
  if (res.code == 200) {
    ElMessage.success({
      message: "删除成功",
      type: "success"
    })
    
  } else {
    ElMessage.warning({
      message: res.msg,
      type: "warning"
    })
  }
}
</script>

<style scoped lang="scss">
.op {
  display: flex;
}
</style>
