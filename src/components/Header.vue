<template>
  <div class="header">
    <div class="left">
      <span style="font-size:20px">{{ state.name }}</span>
    </div>
    <div class="right">右</div>
  </div>
</template>

<script setup>

import {useRouter} from "vue-router";
import {reactive} from "vue";
import {pathMap} from "@/utils/index.js";
//获取路由实例
const router = useRouter()
const state = reactive({
  name: '首页'
})
//监听路由变化的方法
router.afterEach(to => {
  console.log(to)
  //to能获取到路由相关信息
  const {id} = to.query
  state.name = pathMap[to.name]
})
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
</style>