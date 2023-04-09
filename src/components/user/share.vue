<template>
  <div>
    <div class="nav">
      <div class="accept" @click="getOtherList(), (state = true)">
        <el-button type="primary" round plain style="margin-left: 20px" size="large"
          ><el-icon><Share /></el-icon>他人分享</el-button
        >
      </div>
      <div class="my" @click="getMyList(), (state = false)">
        <el-button type="success" round plain style="margin-left: 20px" size="large"
          ><el-icon><User /></el-icon> 我的分享</el-button
        >
      </div>
    </div>
    <el-divider />
    <div>
      <div class="accept-list" v-if="state && total > 0">
        <h4>他人分享</h4>
        <el-table :data="otherData" tooltip-effect="dark" style="width: 100%">
          <el-table-column
            prop="file.fileName"
            label="文件名"
            width="260
        "
          >
          </el-table-column>
          <el-table-column
            prop="file.fileSize"
            label="大小（KB）"
            width="260
        "
          >
          </el-table-column>
          <el-table-column
            prop="file.lastModifyTime"
            label="分享时间"
            width="260
        "
          >
          </el-table-column>
          <el-table-column prop="shareInUser.userName" label="来源用户" width="100">
          </el-table-column>
          <el-table-column width="200">
            <template #default="scope">
              <downBtn :path="scope.row.file.filePath" :fileName="scope.row.file.fileName">
              </downBtn>
            </template>
          </el-table-column>
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
          <el-empty description="这里空空如野" />
        </div>
      </div>
      <div class="my-list" v-if="!state && total > 0">
        <h4>我的分享</h4>
        <el-table :data="myData" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="file.fileName" label="文件名" width="260"> </el-table-column>
          <el-table-column prop="file.fileSize" label="大小（KB）" width="260"> </el-table-column>
          <el-table-column prop="file.lastModifyTime" label="分享时间" width="260">
          </el-table-column>
          <el-table-column prop="shareInUser.userName" label="分享给用户" width="260">
          </el-table-column>
        </el-table>
        <div class="example-pagination-block">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="Number(total)"
            :page-size="Number(page.pageSize)"
            @current-change="handleCurrentChangeMy"
            small
            class="pagination"
          />
        </div>
      </div>
      <div v-if="total <= 0">
        <el-empty description="这里空空如野" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { acceptShareFile, myShareFile } from "@/api/user/share.js"
import { User, Share } from "@element-plus/icons-vue"
import { ref, onMounted } from "vue"
import downBtn from "../downBtn.vue"

let state = ref(true)

let page = {
  curPage: 1,
  pageSize: 7
}
const handleCurrentChangeMy = (e) => {
  page.curPage = e.toString()
  getMyList()
}
const handleCurrentChange = (e) => {
  page.curPage = e.toString()
  getOtherList()
}
onMounted(() => {
  getOtherList()
})
let myData = ref([])
let total = ref(-1)
const getMyList = async () => {
  const { data: res } = await myShareFile(page)
  myData.value = res.data.shares
  total.value = res.data.total
}
const otherData = ref([])
const getOtherList = async () => {
  const { data: res } = await acceptShareFile(page)
  otherData.value = res.data.shares
  total.value = res.data.total
}
</script>

<style scoped>
.nav {
  display: flex;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
