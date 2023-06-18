<template>
  <el-card class="swiper-container">
    <el-table :load="state.loading" :data="state.tableData" tooltip-effect="dark" style="width:100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="轮播图" width="200">
        <template #default="scope">
          <img style="width:150px;height: 150px" :src="scope.row.carouselUrl" alt="轮播图">
        </template>
      </el-table-column>
      <el-table-column label="跳转链接">
        <template #default="scope">
          <a target="_blank" :href="scope.row.redirectUrl">{{scope.row.redirectUrl}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="carouselRank" label="排序值" width="120"></el-table-column>
      <el-table-column prop="createTime" label="添加时间" width="200"></el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import {reactive,onMounted} from "vue";
import {getCarouselsAPI} from '@/api/swiper.js'
const state=reactive({
  loading:false,//控制加载动画
  tableData:[],//数据列表
  currentPage:1,//当前页数
  pageSize:10,//每页请求数
})
onMounted(()=>{
  getCarousels()
})

const getCarousels=async()=>{
  state.loading=true
  const res=await getCarouselsAPI({pageNumber:state.currentPage,pageSize:state.pageSize})
  // console.log(res)
  state.tableData=res.list
  state.loading=false
}
</script>

<style lang="scss" scoped>

</style>