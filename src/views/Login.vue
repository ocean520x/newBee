<template>
  <div class="login-body">
    <!--  登陆框div-->
    <div class="login-container">
      <!-- 登陆框头部logo部分-->
      <div class="head">
        <img class="logo" src="https://s.weituibao.com/1582958061265/mlogo.png" alt="">
        <div class="name">
          <div class="title">新蜂商场</div>
          <div class="tips">基于Vue3的后台管理系统</div>
        </div>
      </div>
      <!--登陆表单-->
      <el-form label-position="top" ref="loginForm" :rules="state.rules" :model="state.ruleForm" class="login-form">
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model.trim="state.ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="state.ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="color:#333">登录表示您已同意<a>《服务条款》</a></div>
          <el-button style="width: 100%" type="primary" @click="submitForm">立即登陆</el-button>
          <el-checkbox v-model="state.checked" @change="!state.checked">下次自动登录</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {loginAPI} from '@/api/user.js'
import md5 from 'js-md5'
import {localSet} from "@/utils/index.js";
import {ElMessage} from "element-plus";

const loginForm = ref(null)
const state = reactive({
  ruleForm: {
    username: '',//账号
    password: '',//密码
  },
  checked: true,
  //表单验证判断
  rules: {
    username: [
      {required: true, message: '账户不能为空', trigger: 'blur'}
    ],
    password: [
      {required: true, message: '密码不能为空', trigger: 'blur'}
    ]
  }
})
//表单提交方法
const submitForm = async () => {
  //首先进行表单验证
  await loginForm.value.validate()
  //发请求
  const res = await loginAPI({
    userName: state.ruleForm.username||'',
    passwordMd5: md5(state.ruleForm.password),//密码需要md5加密
  })
  //返回的res就是token 这里我们将其存储到localStorage里面
  localSet('token', res)
  ElMessage.success('登陆成功！')
  //跳转到首页
  window.location.href = '/'
}
//重置方法
const resetForm = () => {
  loginForm.value.resetFields()
}
</script>

<style scoped>
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
}
.login-container {
  width: 420px;
  height: 500px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 21px 41px 0 rgba(0, 0, 0, 0.2);
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 20px 0;
}
.head img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
.head .title {
  font-size: 28px;
  color: #1BAEAE;
  font-weight: bold;
}
.head .tips {
  font-size: 12px;
  color: #999;
}
.login-form {
  width: 70%;
  margin: 0 auto;
}
.login-form >>> .el-form--label-top .el-form-item__label {
  padding: 0;
}
.login-form >>> .el-form-item {
  margin-bottom: 0;
}
</style>