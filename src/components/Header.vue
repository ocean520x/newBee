<template>
  <div class="header">
    <div class="left">
      <span style="font-size:20px">{{ state.name }}</span>
    </div>
    <div class="right">
      <el-popover placement="bottom" :width="320" trigger="click" popper-class="popper-user-box">
        <template #reference>
          <div class="author">
<!--            <i class="icon el-icon-s-custom"></i>-->
            <el-icon class="icon avatar">
             <Avatar/>
            </el-icon>
            {{ state.userInfo && state.userInfo.nickName || '' }}
<!--            <i class="el-icon-caret-bottom"></i>-->
            <el-icon class="icon">
              <CaretBottom/>
            </el-icon>
          </div>
        </template>
        <div class="nickname">
          <p>登陆名：{{ state.userInfo && state.userInfo.loginUserName || '' }}</p>
          <p>昵称：{{ state.userInfo && state.userInfo.nickName || '' }}</p>
          <el-tag size="small" effect="dark" class="logout" @click="logout">退出</el-tag>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script setup>

import {useRouter} from "vue-router";
import {onMounted, reactive} from "vue";
import {localRemove, pathMap} from "@/utils/index.js";
import {getUserInfoAPI,logoutAPI} from "@/api/user.js";
//获取路由实例
const router = useRouter()
const state = reactive({
  name: '首页',
  userInfo:null,//用户信息变量
})
//页面初始化的时候执行的方法
onMounted(()=>{
  const pathname=window.location.hash.split('/')[1]||''
  if(!['login'].includes(pathname)){
    getUserInfo()
  }
})
//获取用户信息的函数
const getUserInfo=async()=>{
  const res=await getUserInfoAPI()
  // console.log(res)
  state.userInfo=res
}
//退出登录的函数
const logout=async()=>{
  //发请求 退出之后 将本地的token也要清理掉
  await logoutAPI()
  localRemove('token')
  //跳转到登陆页面
  router.push('/login')
}
//监听路由变化的方法
router.afterEach(to => {
  // console.log(to)
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
.right > div > .icon {
  font-size: 18px;
  margin-right: 6px;
}
.author {
  margin-left: 10px;
  cursor:pointer;
  display: flex;
  align-items: center;
}
</style>
<style>
.popper-user-box {
  background: url('https://s.yezgea02.com/lingling-h5/static/account-banner-bg.png') 50% 50% no-repeat!important;
  background-size: cover!important;
  border-radius: 0!important;
}

.popper-user-box .nickname {
  position: relative;
  color: #ffffff;
}
.popper-user-box .nickname .logout {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
</style>