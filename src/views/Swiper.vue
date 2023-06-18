<template>
  <el-card class="swiper-container">
    <template #header>
      <div class="header">
        <el-button type="primary" :icon="Plus" @click="handleAdd">增加</el-button>
        <el-popconfirm title="确认删除吗？" confirm-button-text="确定" cancel-button-text="取消" @confirm="handleDelete">
          <template #reference>
            <el-button type="danger" :icon="Delete">批量删除</el-button>
          </template>
        </el-popconfirm>
      </div>
    </template>
    <el-table v-loading="state.loading" ref="multipleTable" :data="state.tableData" tooltip-effect="dark"
              style="width:100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="轮播图" width="200">
        <template #default="scope">
          <img style="width:150px;height: 150px" :src="scope.row.carouselUrl" alt="轮播图">
        </template>
      </el-table-column>
      <el-table-column label="跳转链接">
        <template #default="scope">
          <a target="_blank" :href="scope.row.redirectUrl">{{ scope.row.redirectUrl }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="carouselRank" label="排序值" width="120"></el-table-column>
      <el-table-column prop="createTime" label="添加时间" width="200"></el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        :total="state.total"
        :page-size="state.pageSize"
        :current-page="state.currentPage"
        @current-change="changePage"
    />
  </el-card>
  <DialogAddSwiper ref='addSwiper' :reload="getCarousels" :type="state.type"/>
</template>

<script setup>
import {ref, reactive, onMounted} from "vue";
import {getCarouselsAPI} from '@/api/swiper.js'
import {Plus, Delete} from '@element-plus/icons-vue'
import DialogAddSwiper from "@/components/DialogAddSwiper.vue";
import {ElMessage} from "element-plus";
import {deleteCarouselAPI} from '@/api/swiper.js'

const addSwiper = ref(null)
const state = reactive({
  loading: false,//控制加载动画
  tableData: [],//数据列表
  currentPage: 1,//当前页数
  pageSize: 10,//每页请求数
  type: '',//操作类型
  multipleSelection: [],//选中项
  total: 0,//总条数
})
//选中之后的change方法 一旦选项有变化 就会出发该方法
const handleSelectionChange = (val) => {
  // console.log(val)
  state.multipleSelection = val
}
onMounted(() => {
  getCarousels()
})

const getCarousels = async () => {
  state.loading = true
  const res = await getCarouselsAPI({pageNumber: state.currentPage, pageSize: state.pageSize})
  // console.log(res)
  state.tableData = res.list
  state.total = res.totalCount
  state.currentPage = res.currPage
  state.loading = false
}
const changePage = (page) => {
  state.currentPage = page
  getCarousels()
}
//添加轮播图
const handleAdd = () => {
  state.type = 'add'
  addSwiper.value.open()
}
//编辑轮播图
const handleEdit = (id) => {
  state.type = 'edit'
  addSwiper.value.open(id)
}
const handleDelete = async () => {
  if (!state.multipleSelection.length) {
    ElMessage.error('请选择项')
    return
  }
  const ids = state.multipleSelection.map(i => i.carouselId)
  await deleteCarouselAPI(ids)
  ElMessage.success('删除成功')
  getCarousels()
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #1baeae;
}
.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
</style>