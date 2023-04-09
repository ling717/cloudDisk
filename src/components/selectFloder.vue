<template>
  <div class="file-path" v-if="total > 0">
    <el-card class="box-card">
      <el-table :data="pathList" style="width: 100%">
        <el-table-column label="文件夹" calss="file-path-item">
          <template #default="scope">
            <div @click="getPath(scope.row.filePath)" class="get-path">
              <el-icon><Files /></el-icon>&nbsp;&nbsp;{{ scope.row.fileName }}
            </div></template
          >
        </el-table-column>
      </el-table>
    </el-card>
  </div>
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
  <!-- <div style="text-align: center; margin-left: 160px; width: 100%" v-if="total > 0">
    <el-button type="primary" style="width: 150px" @click="returnPath">确认选中当前文件 </el-button>
  </div> -->
  <div v-if="total <= 0">
    <el-empty description="这里空空如野，快去创建文件夹吧" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { Files } from "@element-plus/icons-vue"
import { defineEmits } from "vue"
import { getFolderList } from "@/api/user/getFileList.js"
let path = ""
const props = defineProps({
  view: Boolean
})
const emit = defineEmits(["returnPath"])
onMounted(() => {
  getList()
  console.log(total.value)
})
let page = {
  curPage: 1,
  pageSize: 5
}
let total = ref(-1)
const pathList = ref([])
const getList = async () => {
  const { data: res } = await getFolderList(page)
  pathList.value = res.data.files
  total.value = res.data.total
}
function handleCurrentChange(e) {
  page.curPage = e.toString()
  getList()
}
const getPath = (filepath) => {
  path = filepath
  returnPath()
}

const returnPath = () => {
  let param = {
    path: path,
    view: false
  }

  emit("returnPath", param)
}
</script>

<style>
.up {
  width: 70px;
  font-weight: bolder;
  display: flex;
  justify-content: center;
}

.file-path-item {
  display: flex;
  align-items: center;
}
.get-path {
  cursor: pointer;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
