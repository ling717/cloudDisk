<template>
  <div>
    <div class="btn">
      <uploadVue :path="''"></uploadVue>
      <!-- <el-button type="primary" round plain style="margin-left: 20px" size="large">新建文件夹</el-button> -->
    </div>
    <h5>图片</h5>
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
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="文件名" width="400">
        <template #default="scope">{{ scope.row.fileName }}</template>
      </el-table-column>

      <el-table-column prop="lastModifyTime" label="修改时间" width="300"> </el-table-column>
      <el-table-column label="大小" width="120" show-overflow-tooltip>
        <template #default="scope">{{ scope.row.fileSize }}KB</template></el-table-column
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
            <delBtn :fileId="scope.row.fileId" @del="getList()"></delBtn></div
        ></template>
      </el-table-column>
    </el-table>
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
      <el-empty description="这里空空如野，快去上传文件把" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue"
import uploadVue from "../upload.vue"
import operateFileVue from "../operateFile.vue"
import downBtn from "../downBtn.vue"
import delBtn from "../delBtn.vue"
import renameBtn from "../renameBtn.vue"
import shareBtn from "../shareBtn.vue"
import moveBtn from "../moveBtn.vue"
import copyBtn from "../copyBtn.vue"
import { getImgList } from "@/api/user/getFileList.js"
let page = {
  curPage: 1,
  pageSize: 7
}
let total = ref(-1)
let data = ref([])
let fileDelList = ref([])
let fileDownList = ref([])
const getList = async () => {
  const { data: res } = await getImgList(page)
  console.log(res)
  data.value = res.data.files
  total.value = res.data.total
}
const selectionLineChangeHandle = (e) => {
  fileDelList.value = e.map((item) => item.fileId)
  fileDownList.value = e.map((item) => item.filePath)
}
onMounted(() => {
  getList()
})
function handleCurrentChange(e) {
  page.curPage = e.toString()
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
