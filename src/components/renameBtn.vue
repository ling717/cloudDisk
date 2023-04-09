<template>
  <div class="btn">
    <el-button type="primary" text title="重命名" @click="view"
      ><el-icon><Edit /></el-icon>
    </el-button>
    <el-dialog v-model="Visible" title="文件重命名" :append-to-body="true" style="width: 400px">
      <span>请输入新的文件名</span>
      <el-input v-model="info.newName" style="width: 300px" placeholder="请输入新的名字" />
      <template #footer>
        <div style="text-align: center; margin-left: 120px; width: 100%">
          <el-button type="primary" @click="rename">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { Edit } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus"

import { renameFile } from "@/api/user/opFile.js"
import { reactive, ref } from "vue"

const props = defineProps({
  fileName: String,
  path: String
})
const emit = defineEmits(["rename"])
let Visible = ref(false)
let info = reactive({
  oldName: "",
  newName: "test",
  oldPath: props.path
})
const view = () => {
  Visible.value = true
  info.oldName = props.fileName
  info.newName = props.fileName
}
const rename = async () => {
  console.log(info)
  Visible.value=false
  const { data: res } = await renameFile(info)
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
  emit("rename")
}
</script>

<style scoped>
.btn {
  width: 25px;
}
</style>
