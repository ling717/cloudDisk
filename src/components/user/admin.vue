<template>
  <div>
    <h3>用户管理</h3>
    <div class="btn">
      <el-button
        type="primary"
        round
        plain
        style="margin-left: 20px"
        size="large"
        @click="dialogView(-1, 'setUpList')"
        :disabled="btnState"
        ><el-icon><User /></el-icon>设置为管理员</el-button
      >
      <el-button
        type="danger"
        round
        plain
        style="margin-left: 20px"
        size="large"
        @click="dialogView(-1, 'delList')"
        :disabled="btnState"
        ><el-icon><Delete /></el-icon>删除用户</el-button
      >
    </div>

    <el-table
      :data="data"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="selectionLineChangeHandle"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="userName" label="用户名" width="280"> </el-table-column>
      <el-table-column label="邮箱" width="280">
        <template #default="scope">{{ scope.row.acc }}</template>
      </el-table-column>
      <el-table-column label="是否管理" width="280">
        <template #default="scope">{{
          scope.row.isAdmin == false ? "否" : "是"
        }}</template></el-table-column
      >
      <el-table-column width="150">
        <template #default="scope"
          ><el-button type="primary" text @click="dialogView(scope.row.userId, 'setUp')"
            >设为管理</el-button
          >
        </template></el-table-column
      >
      <el-table-column width="">
        <template #default="scope">
          <el-button
            type="primary"
            text
            title="删除用户"
            @click="dialogView(scope.row.userId, 'del')"
            ><el-icon><Delete /></el-icon>
          </el-button> </template
      ></el-table-column>
      <el-dialog
        v-model="opSureView"
        title="请确认操作"
        :append-to-body="true"
        style="width: 400px"
      >
        <el-button type="primary" @click="opSrue" style="margin-left: 280px; margin-top: 30px"
          >确定</el-button
        >
      </el-dialog>
    </el-table>
    <div class="example-pagination-block">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="Number(total)"
        :page-size="Number(page.pageSize)"
        @current-change="handleCurrentChange"
        small
        class="pagination"
      />
    </div>
    <div v-if="total <= 0">
      <el-empty description="你没有权限访问" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue"
import { Delete, User } from "@element-plus/icons-vue"
import { getUserList, delUser, delUserList, setUpAdmin, setUpAdminList } from "@/api/admin/index.js"
let page = {
  curPage: 1,
  pageSize: 7
}
function handleCurrentChange(e) {
  page.curPage = e.toString()
  getList()
}
let data = ref([])
let opSureView = ref(false)
let total = 0
let userId = -1
let opString = ""
let userIdList = []
let btnState = ref(true)
onMounted(() => {
  getList()
})
const selectionLineChangeHandle = (e) => {
  userIdList = e.map((item) => item.userId)
  if (userIdList.length > 0) {
    btnState.value = false
  } else {
    btnState.value = true
  }
}
const getList = async () => {
  let { data: res } = await getUserList(page)
  data.value = res.data.users
  total = res.data.total
  console.log(res)
}

const dialogView = (id, op) => {
  opSureView.value = true
  userId = id
  opString = op
}
const del = async (id) => {
  console.log(typeof id)
  opSureView.value = false
  let obj = {
    userId: id
  }
  let { data: res } = await delUser(obj)
  tanchuang(res.code)
  getList()
}
const delList = async () => {
  console.log(userIdList)
  let obj = {
    delList: userIdList + ""
  }
  const { data: res } = await delUserList(obj)
  tanchuang(res.code)
  getList()
}
const setUp = async (id) => {
  console.log(id + "up")
  opSureView.value = false
  let obj = {
    userId: id
  }
  let { data: res } = await setUpAdmin(obj)
  tanchuang(res.code)
  getList()
}
const setUpList = async () => {
  console.log(userIdList)
  let obj = {
    ids: userIdList + ""
  }
  const { data: res } = await setUpAdminList(obj)
  tanchuang(res.code)
  getList()
}
const opSrue = async () => {
  if (opString == "del") {
    del(userId)
  }
  if (opString == "setUp") {
    setUp(userId)
  }
  if (opString == "delList") {
    delList(userIdList)
  }
  if (opString == "setUpList") {
    setUpList(userIdList)
  }
  opSureView.value = false
  userId = -1
  opString = ""
}
const tanchuang = (code) => {
  if (code === 200) {
    ElMessage.success({
      message: "操作成功",
      type: "success"
    })
  } else {
    ElMessage.warning({
      message: "操作失败",
      type: "warning"
    })
  }
}
</script>

<style scoped>
.btn {
  display: flex;
  height: 70px;
  align-items: center;
  /* border-bottom: 1px solid black; */
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
