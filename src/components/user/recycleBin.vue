<template>
  <div>
    <h3>回收站</h3>
    <el-divider />

    <div class="btn">
      <el-button
        type="primary"
        round
        plain
        style="margin-left: 20px"
        size="large"
        :disabled="btnState"
        @click="dialogView(-1, 'resList')"
        ><el-icon><Refresh /></el-icon>还原</el-button
      >
      <el-button
        type="danger"
        round
        plain
        style="margin-left: 20px"
        size="large"
        :disabled="btnState"
        @click="dialogView(-1, 'delList')"
        ><el-icon><FolderDelete /></el-icon>删除</el-button
      >
    </div>

    <el-table
      :data="data"
      tooltip-effect="dark"
      style="width: 100%"
      v-if="total > 0"
      @selection-change="selectionLineChangeHandle"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="文件名" width="400">
        <template #default="scope"
          ><div>{{ scope.row.fileName }}</div>
        </template>
      </el-table-column>

      <el-table-column prop="lastModifyTime" label="删除" width="300"> </el-table-column>
      <el-table-column label="大小" width="120" show-overflow-tooltip>
        <template #default="scope"
          ><div>{{ scope.row.fileSize }}KB</div></template
        ></el-table-column
      >
      <el-table-column width="200">
        <template #default="scope"
          ><div class="op-btn">
            <el-button type="primary" text @click="dialogView(scope.row.fileId, 'restroe')"
              ><el-icon><Refresh /></el-icon
            ></el-button>
            <el-button type="danger" text @click="dialogView(scope.row.fileId, 'del')"
              ><el-icon><FolderDelete /></el-icon
            ></el-button></div
        ></template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="opSureView" title="请确认操作" :append-to-body="true" style="width: 400px">
      <el-button type="primary" @click="opSrue" style="margin-left: 280px; margin-top: 30px"
        >确定</el-button
      >
    </el-dialog>
    <div class="example-pagination-block">
      <el-pagination
        v-if="total > 0"
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
      <el-empty description="这里空空如野" />
    </div>
  </div>
</template>

<script setup>
import { FolderDelete, Refresh, Folder } from "@element-plus/icons-vue"
import { onMounted, ref } from "vue"
import {
  getBinList,
  restoreFile,
  restoreFileList,
  delBinFile,
  delBinFileList
} from "@/api/user/bin.js"
import { ElMessage } from "element-plus"
let page = {
  curPage: 1,
  pageSize: 7
}
let total = ref(-1)
let data = ref([])
let fileList = []
let btnState = ref(true)
const getList = async () => {
  const { data: res } = await getBinList(page)

  data.value = res.data.files
  total.value = res.data.total
  data.value = data.value.sort((a, b) => {
    return a.fileSize - b.fileSize
  })
}
onMounted(() => {
  getList()
})
function handleCurrentChange(e) {
  page.curPage = e.toString()
  getList()
}
const selectionLineChangeHandle = (e) => {
  fileList = e.map((item) => item.fileId)
  if (fileList.length > 0) {
    btnState.value = false
  }
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
let opString = ""
let opSureView = ref(false)
let fileId = -1
const dialogView = (id, op) => {
  opSureView.value = true
  fileId = id
  opString = op
}
const opSrue = () => {
  if (opString == "del") {
    del(fileId)
  }
  if (opString == "delList") {
    delList()
  }
  if (opString == "restroe") {
    restroe(fileId)
  }
  if (opString == "resList") {
    restoreList()
  }
  opSureView.value = false
  fileId = -1
  opString = ""
}
const restroe = async (id) => {
  console.log(id + "restonr")
  let obj = {
    fileId: id
  }
  const { data: res } = await restoreFile(obj)
  tanchuang(res.code)
  console.log(res)
  getList()
}
const del = async (id) => {
  console.log(id + "del")
  let obj = {
    fileId: id
  }
  const { data: res } = await delBinFile(obj)
  tanchuang(res.code)
  getList()
}

const delList = async () => {
  let delListInfo = {
    delList: fileList + ""
  }

  const { data: res } = await delBinFileList(delListInfo)
  tanchuang(res.code)
  getList()
}
const restoreList = async () => {
  console.log(fileList + "resList")
  const obj = {
    ids: fileList + ""
  }
  const { data: res } = await restoreFileList(obj)
  tanchuang(res.code)
  console.log(res)
  getList()
}
</script>

<style scoped>
.btn {
  display: flex;
  height: 70px;
  align-items: center;
}
.op {
  height: 40px;
  line-height: 40px;
}
.op-btn {
  display: flex;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
