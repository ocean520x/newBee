<template>
  <div class="layout">
    <el-container v-if="state.showMenu" class="container">
      <el-aside class="aside">
        <!--系统名称+logo-->
        <div class="head">
          <div>
            <img src="//s.weituibao.com/1582958061265/mlogo.png" alt="logo">
            <span>vue3 admin</span>
          </div>
        </div>
        <!-- 一条为了美观的线条-->
        <div class="line"></div>
        <el-menu background-color="#222832" text-color="#fff" :router="true" :default-openeds="state.defaultOpen" :default-active="state.currentPath">
          <!-- 一级栏目-->
          <el-sub-menu index="1">
            <template #title>
              <span>Dashboard</span>
            </template>
            <!-- 二级栏目-->
            <el-menu-item-group>
              <el-menu-item index="/">
                <el-icon>
                  <Odometer />
                </el-icon>
                首页
              </el-menu-item>
              <el-menu-item index="/add">
                <el-icon>
                  <Plus />
                </el-icon>
                添加商品
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <span>首页配置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/swiper"><el-icon><Picture /></el-icon>轮播图配置</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <!-- 右边内容布局-->
      <el-container class="content">
        <Header/>
        <div class="main">
          <router-view/>
        </div>
        <Footer/>
      </el-container>
    </el-container>
    <el-container v-else class="container">
      <router-view/>
    </el-container>
  </div>

</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import {Odometer,Plus} from '@element-plus/icons-vue'
import {useRouter} from "vue-router";
import {reactive} from "vue";
import {localGet, pathMap} from "@/utils/index.js";

//不需要菜单的路径数组
const noMenu=['/login']
const router=useRouter()
const state=reactive({
  showMenu:true,//是否显示菜单,
  defaultOpen:['1','2'],
  currentPath:'/'
})
//监听路由的变化
router.beforeEach((to,from,next)=>{
  if(to.path==='/login'){
    next()
  }else {
    if(!localGet('token')){
      next('/login')
    }else {
      next()
    }
  }
  state.showMenu=!noMenu.includes(to.path)&&localGet('token')
  state.currentPath=to.path
  document.title=pathMap[to.name]
})
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  background-color: #ffffff;
}

.container {
  height: 100vh;
}

.aside {
  width: 200px !important;
  background-color: #222832;
}

.head {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}

.head > div {
  display: flex;
  align-items: center;
}

.head img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.head span {
  font-size: 20px;
  color: #ffffff;
}

.line {
  border-top: 1px solid hsla(0, 0%, 100%, .05);
  border-bottom: 1px solid rgba(0, 0, 0, .2);
}

.content {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
}

.main {
  height: calc(100vh - 100px);
  overflow: auto;
  padding: 10px;
}
</style>
<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>