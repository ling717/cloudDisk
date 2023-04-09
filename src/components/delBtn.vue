<template>
  <div class="btn">
    <el-button type="primary" text title="删除" @click="diaView"
      ><el-icon><Delete /></el-icon>
    </el-button>
    <el-dialog v-model="opSrue" title="请确认操作" :append-to-body="true" style="width: 400px">
      <el-button type="primary" @click="del" style="margin-left: 280px; margin-top: 30px"
        >确定删除</el-button
      >
    </el-dialog>
  </div>
</template>

<script setup>
import { Delete } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus"
import { deleteFile } from "@/api/user/opFile.js"
import { ref } from "vue"
const props = defineProps({
  fileId: Number
})
const emit = defineEmits(["del"])
let delInfo = {
  fileId: props.fileId
}
let opSrue = ref(false)
const diaView = () => {
  opSrue.value = true
}
const del = async () => {
  console.log(props.fileId)
  opSrue.value = false
  const { data: res } = await deleteFile(delInfo)
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
  emit("del")
}
</script>

<style scoped>
.btn {
  width: 25px;
}
</style>
