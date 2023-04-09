<template>
  <div class="btn">
    <el-button type="primary" text title="复制" @click="dialogFolder = true"
      ><el-icon><Crop /></el-icon>
    </el-button>
    <el-dialog
      title="选择文件夹"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-model="dialogFolder"
      width="500px"
      class="dialog"
    >
      <selectFloderVue @returnPath="getPath"></selectFloderVue>
    </el-dialog>
    <el-dialog title="确认复制" :close-on-click-modal="false" v-model="sure" width="300px">
      <el-button type="primary" @click="copy" style="margin: 30px auto">确认</el-button>
    </el-dialog>
  </div>
</template>

<script setup>
import { Crop } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus"
import { copyFile } from "@/api/user/opFile.js"
import { ref } from "vue"
import selectFloderVue from "./selectFloder.vue"
const props = defineProps({
  soucePath: String,
  fileName: String
})
const emit = defineEmits(["copy"])
const pathInfo = {
  soucePath: "",
  targetPath: ""
}
let dialogFolder = ref(false)
let sure = ref(false)
const copy = async () => {
  console.log(pathInfo)
  let { data: res } = await copyFile(pathInfo)
  console.log(res)
  if (res.code === 200) {
    ElMessage.success({
      message: "操作成功",
      type: "success"
    })
  } else {
    ElMessage.warning({
      message: res.msg,
      type: "warning"
    })
  }
  sure.value = false
  emit("copy")
}
const getPath = (val) => {
  dialogFolder.value = val.view
  pathInfo.targetPath = val.path + "/" + props.fileName
  pathInfo.soucePath = props.soucePath
  sure.value = true
}
</script>

<style scoped>
.btn {
  width: 25px;
}
.dialog {
  position: aabsolute;
  z-index: 999;
}
</style>
