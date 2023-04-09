<template>
  <div>
    <div class="btn">
      <el-button type="primary" round size="large" disabled>
        <el-icon><Upload /></el-icon><span>上传</span>
      </el-button>
    </div>

    <h5>图片</h5>
    <el-page-header @back="goBack" v-if="route.query.path"> </el-page-header>
    <div class="op">
      <div class="op-item">
        <el-button type="primary" text disabled
          ><el-icon><Download /></el-icon> <span>下载</span>
        </el-button>
      </div>
      <div class="op-item">
        <el-button type="primary" text disabled
          ><el-icon><Delete /></el-icon><span>删除</span></el-button
        >
      </div>
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
          ><div v-if="scope.row.fileType != 'Dir'">{{ scope.row.lastModifyTime }}</div></template
        >
      </el-table-column>
      <el-table-column label="大小" width="120" show-overflow-tooltip>
        <template #default="scope"
          ><div v-if="scope.row.fileType != 'Dir'">{{ scope.row.fileSize }}KB</div></template
        ></el-table-column
      >
      <el-table-column width="200">
        <template #default="scope"
          ><div class="op-btn" v-if="scope.row.fileType != 'Dir'">
            <el-button type="primary" text title="下载" disabled
              ><el-icon><Download /></el-icon>
            </el-button>
            <el-button type="primary" text title="复制" disabled
              ><el-icon><Crop /></el-icon>
            </el-button>
            <el-button type="primary" text title="移动" disabled
              ><el-icon><Rank /></el-icon>
            </el-button>
            <el-button type="primary" text title="重命名" disabled
              ><el-icon><Edit /></el-icon>
            </el-button></div
        ></template>
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
import { ref, reactive } from "vue"
import { Folder, Download, Upload, Delete, Crop, Rank, Edit } from "@element-plus/icons-vue"

import { useRoute, useRouter } from "vue-router"
let pagePath = {
  curPage: 1,
  pageSize: 7,
  curPath: "/"
}
// const data = ref([])
let total = ref([1])
const isDisabled = (row) => {
  if (row.fileType === "Dir") {
    return false
  }
  return true
}
const selectionLineChangeHandle = (e) => {}
const data = reactive([
  {
    fileId: 1,
    fileName: "云盘.jpg",
    filePath: "asiodadasd",
    fileSize: "20",
    fileType: "docx",
    lastModifyTime: "2022-12-02 17:20:11",
    level: 1,
    parent: "sadasdsa"
  }
])

function handleCurrentChange(e) {
  pagePath.curPage = e.toString()
  getList()
}

const route = useRoute()
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
  display: flex;
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
