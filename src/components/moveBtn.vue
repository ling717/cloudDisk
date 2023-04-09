<template>
  <div class="btn">
    <el-button type="primary" text title="移动" @click="dialogFolder = true"
      ><el-icon><Rank /></el-icon>
    </el-button>
    <el-dialog
      title="选择文件夹"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-model="dialogFolder"
      width="500px"
    >
      <selectFloderVue @returnPath="getPath"></selectFloderVue>
    </el-dialog>
    <el-dialog title="确认移动" :close-on-click-modal="false" v-model="sure" width="300px">
      <el-button type="primary" @click="move" style="margin: 30px auto">确认</el-button>
    </el-dialog>
  </div>
</template>

<script setup>
import { Rank } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus"

import { ref } from "vue"
import selectFloderVue from "./selectFloder.vue"
import { remove } from "@/api/user/opFile.js"

const props = defineProps({
  oldPath: String,
  fileName: String
})
const emit = defineEmits(["move"])
let sure = ref(false)
let dialogFolder = ref(false)
let pathInfo = {
  newPath: "",
  oldPath: ""
}
const move = async () => {
  console.log(pathInfo)
  let { data: res } = await remove(pathInfo)
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
  emit("move")
}
const getPath = (val) => {
  console.log(val)
  dialogFolder.value = val.view
  pathInfo.newPath = val.path + "/" + props.fileName
  pathInfo.oldPath = props.oldPath
  sure.value = true
}
</script>

<style scoped>
.btn {
  width: 25px;
}
</style>
