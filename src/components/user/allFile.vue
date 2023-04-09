<template>
  <div>
    <div class="btn">
      <uploadVue :path="route.query.path" @handle-request="getList()"></uploadVue>
      <el-button
        type="primary"
        round
        plain
        style="margin-left: 20px"
        size="large"
        @click="dialogCreateFolder = true"
        >新建文件夹</el-button
      >
    </div>
    <!-- <el-dialog
      title="选择文件夹"
      :close-on-click-modal="false"
      v-model="dialogFolder"
      width="500px"
    >
      <selectFloderVue @returnPath="getPath"></selectFloderVue>
    </el-dialog> -->
    <el-dialog
      title="请输入文件名"
      :close-on-click-modal="false"
      v-model="dialogCreateFolder"
      width="500px"
    >
      <el-input v-model="createFolderName"></el-input>
      <el-button
        type="primary"
        @click="createFileFloder"
        style="margin-left: 350px; margin-top: 30px"
        >确认</el-button
      >
    </el-dialog>
    <h5>全部文件</h5>
    <el-page-header @back="goBack" v-if="route.query.path"> </el-page-header>
    <div class="op">
      <operateFileVue :fileDelList="fileDelList" :fileDownList="fileDownList"></operateFileVue>
    </div>

    <el-table
      :data="data"
      tooltip-effect="dark"
      style="width: 100%"
      v-if="total > 0"
      @selection-change="selectionLineChangeHandle"
    >
      <el-table-column type="selection" width="55" :selectable="isDisabled"> </el-table-column>
      <el-table-column label="文件名" width="400">
        <template #default="scope"
          ><div v-if="scope.row.fileType != 'Dir'">{{ scope.row.fileName }}</div>
          <div v-if="scope.row.fileType === 'Dir'" class="to-dir" @click="gotoDir(scope.row)">
            <el-icon style="margin-right: 8px"><Folder /></el-icon>{{ scope.row.fileName }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="修改时间" width="300">
        <template #default="scope"
          ><div>{{ scope.row.lastModifyTime }}</div></template
        >
      </el-table-column>
      <el-table-column label="大小" width="120" show-overflow-tooltip>
        <template #default="scope"
          ><div v-if="scope.row.fileType != 'Dir'">{{ scope.row.fileSize }}KB</div></template
        ></el-table-column
      >
      <el-table-column width="200">
        <template #default="scope"
          ><div class="op-btn">
            <downBtn :path="scope.row.filePath" :fileName="scope.row.fileName"> </downBtn>
            <renameBtn
              :fileName="scope.row.fileName"
              :path="scope.row.filePath"
              @rename="getList()"
            ></renameBtn>
            <shareBtn :fileId="scope.row.fileId" v-if="scope.row.fileType != 'Dir'"></shareBtn>
            <copyBtn
              :soucePath="scope.row.filePath"
              :fileName="scope.row.fileName"
              @copy="getList()"
            ></copyBtn>
            <moveBtn
              :oldPath="scope.row.filePath"
              :fileName="scope.row.fileName"
              @move="getList()"
            ></moveBtn>
            <delBtn :fileId="scope.row.fileId" @del="getList()"></delBtn>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="example-pagination-block">
      <el-pagination
        v-if="total > 0"
        background
        layout="prev, pager, next"
        :total="Number(total)"
        :page-size="Number(pagePath.pageSize)"
        @current-change="handleCurrentChange"
        small
        class="pagination"
      />
    </div>
    <div v-if="total <= 0">
      <el-empty description="这里空空如野，快去上传文件把" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, watch } from "vue"
import { Folder } from "@element-plus/icons-vue"
import uploadVue from "../upload.vue"
import operateFileVue from "../operateFile.vue"
import selectFloderVue from "../selectFloder.vue"
import downBtn from "../downBtn.vue"
import delBtn from "../delBtn.vue"
import renameBtn from "../renameBtn.vue"
import shareBtn from "../shareBtn.vue"
import moveBtn from "../moveBtn.vue"
import copyBtn from "../copyBtn.vue"
import { getFileQueryList } from "@/api/user/getFileList.js"
import { createFolder } from "@/api/user/opFile.js"
import { useRoute, useRouter } from "vue-router"

let dialogFolder = ref(false)
let dialogCreateFolder = ref(false)
let pagePath = {
  curPage: 1,
  pageSize: 7,
  curPath: "/"
}
const data = ref([])
let total = ref([])

let fileDelList = ref([])
let fileDownList = ref([])
const route = useRoute()
onMounted(() => {
  getList()
})
const goBack = () => {
  window.history.back()
}
function handleCurrentChange(e) {
  pagePath.curPage = e.toString()
  getList()
}
const selectionLineChangeHandle = (e) => {
  fileDelList.value = e.map((item) => item.fileId)
  fileDownList.value = e.map((item) => item.filePath)
}
const isDisabled = (row) => {
  if (row.fileType === "Dir") {
    return false
  }
  return true
}
const getList = async () => {
  if (route.query.path) {
    pagePath.curPath = route.query.path
  }
  const { data: res } = await getFileQueryList(pagePath)
  data.value = res.data.files
  total.value = res.data.total
  data.value = data.value.sort((a, b) => {
    return a.fileSize - b.fileSize
  })
}

let createFileInfo = ref({
  dirpath: "/"
})
let createFolderName = ref("")
const createFileFloder = async () => {
  if (route.query.path) {
    createFileInfo.value.dirpath = "/" + route.query.path
  }
  createFileInfo.value.dirpath = createFileInfo.value.dirpath + "/" + createFolderName.value
  console.log(createFileInfo.value)
  dialogCreateFolder.value = false

  const { data: res } = await createFolder(createFileInfo.value)
  console.log(res)
  if (res.code == 200) {
    ElMessage.success({
      message: "创建成功",
      type: "success"
    })
    getList()
  } else {
    ElMessage.warning({
      message: res.msg,
      type: "warning"
    })
  }
  ;(createFileInfo.value.dirpath = ""), (createFolderName.value = "")
}
const router = useRouter()
const gotoDir = (row) => {
  const path = row.filePath.slice(22)
  router.push({
    path: `/userHome/cloudDiskIndex/allFile/${row.fileName}`,
    query: {
      path: path
    }
  })
}

watch(router.currentRoute, () => {
  pagePath.curPath = ""
  if (route.query.path) {
    pagePath.curPath = route.query.path
  }
  getList() //获取列表数据方法
})
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
.to-dir {
  cursor: pointer;
  height: 40px;
  line-height: 40px;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
