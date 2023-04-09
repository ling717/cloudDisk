<template>
  <div class="btn">
    <el-button type="primary" text title="分享" @click="dialog"
      ><el-icon><Share /></el-icon>
    </el-button>
    <el-dialog
      v-model="dialogView"
      title="请选择分享用户"
      :append-to-body="true"
      style="width: 400px"
    >
      <div class="search">
        <el-input v-model="userSerachInfo.username" placeholder="请输入用户名" clearable />
        <el-button type="primary" text @click="serach"
          ><el-icon><Search /></el-icon
        ></el-button>
      </div>
      <el-table :data="data" stripe style="width: 100%" v-if="total > 0">
        <el-table-column prop="userName" width="180">
          <template #default="scope">
            <div @click="opSure()" class="user-item">
              <el-icon><User /></el-icon>&nbsp;&nbsp;{{ scope.row.userName }}
            </div>
            <el-dialog
              v-model="opSrueView"
              title="请确认分享"
              :append-to-body="true"
              style="width: 300px"
            >
              <el-button type="primary" style="margin-left: 150px" @click="share(scope.row.userId)"
                >确认</el-button
              >
            </el-dialog></template
          >
        </el-table-column>
      </el-table>

      <div class="example-pagination-block">
        <el-pagination
          v-if="total > 0"
          background
          layout="prev, pager, next"
          :total="Number(total)"
          :page-size="Number(userSerachInfo.pageSize)"
          @current-change="handleCurrentChange"
          small
          class="pagination"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { Share, Search, User } from "@element-plus/icons-vue"
import { ref, reactive } from "vue"

import { seachUserInfo } from "@/api/user/userInfo.js"
import { seachFile } from "@/api/user/share.js"
const props = defineProps({
  fileId: Number
})
let dialogView = ref(false)
const dialog = () => {
  dialogView.value = true
}
let userSerachInfo = reactive({
  curPage: 1,
  pageSize: 5,
  username: ""
})
function handleCurrentChange(e) {
  userSerachInfo.curPage = e.toString()
  getList()
}
let data = ref([])
let total = ref(-1)
const serach = async () => {
  const { data: res } = await seachUserInfo(userSerachInfo)
  data.value = res.data.users
  total.value = res.data.total
}
let opSrueView = ref(false)
const opSure = () => {
  opSrueView.value = true
}
const share = async (id) => {
  let obj = {
    fileId: props.fileId,
    userId: id
  }
  console.log(id, props.fileId)
  dialogView.value = false
  opSrueView.value = false
  const { data: res } = await seachFile(obj)
  if (res.code === 200) {
    ElMessage.success({
      message: "分享成功",
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

<style scoped>
.btn {
  width: 25px;
}
.search {
  display: flex;
}
.user-item {
  cursor: pointer;
}
</style>
