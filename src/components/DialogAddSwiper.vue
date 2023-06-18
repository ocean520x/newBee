<template>
  <el-dialog :title="type===add?'添加轮播图':'修改轮播图'" v-model="state.visible" width="400px">
    <el-form ref="formRef" class="good-form" label-width="100px" :model="state.ruleForm" :rules="state.rules">
      <el-form-item label="图片" prop="url">
        <el-upload class="avatar-uploader" :action="state.uploadImgServer" accept="jpg,jpeg,png"
                   :headers="{token:state.token}" :show-file-list="false" :before-upload="handleBeforeUpload"
                   :on-success="handleUrlSuccess">
          <img class="avatar" style="width:200px;height: 100px;border: 1px solid #e9e9e9" v-if="state.ruleForm.url"
               :src="state.ruleForm.url" alt="">
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="跳转链接" prop="link">
        <el-input type="text" v-model="state.ruleForm.link"></el-input>
      </el-form-item>
      <el-form-item label="排序值" prop="sort">
        <el-input type="number" v-model="state.ruleForm.sort"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.visible=false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {reactive, ref} from "vue";
import {localGet} from "@/utils/index.js";
import {uploadImgServer, getCarouselDetailAPI, addCarouselAPI} from '@/api/swiper.js'
import {ElMessage} from "element-plus";
//父组件中接收过来的参数和函数
const props = defineProps({
  type: String,//add为新增，edit为编辑
  reload: Function//table 刷新的方法
})

//获取表格dom元素
const formRef = ref(null)
const state = reactive({
  uploadImgServer,
  token: localGet('token') || '',//用于调用上传图片接口时，放在请求头上的token
  visible: false,
  ruleForm: {
    url: '',
    link: '',
    sort: ''
  },
  rules: {
    url: [
      {required: 'true', message: '图片不能为空', trigger: ['change']}
    ],
    sort: [
      {required: 'true', message: '排序不能为空', trigger: ['change']}
    ]
  },
  id: ''
})
//开启弹窗 此方法将在父组件中 通过ref 直接调用
const open = (id) => {
  state.visible = true
  if (id) {
    state.id = id
    getDetail()
  } else {
    state.ruleForm = {
      url: '',
      link: '',
      sort: ''
    }
  }
}
//获取详情的函数
const getDetail = async (id) => {
  const res = await getCarouselDetailAPI(id)
  state.ruleForm = {
    url: res.carouselUrl,
    link: res.redirectUrl,
    sort: res.carouselRank
  }
}
//关闭弹窗
const close = () => {
  state.visible = false
}
//获取轮播图详情的函数
const handleBeforeUpload = (file) => {
  // console.log(file)
  const validType=file.name.split('.')[1]||''
  if(!['jpg','png','jpeg'].includes(validType)) {
    ElMessage.error('请上传jpg、jpeg、png格式的图片')
    return false
  }
}
const handleUrlSuccess = (val) => {
  // console.log(val)
  state.ruleForm.url=val.data||''
}

const submitForm = async() => {
  await formRef.value.validate()
  //判断一下有没有id 有id 编辑 没id 新增
  await addCarouselAPI({
    carouselUrl:state.ruleForm.url,
    redirectUrl:state.ruleForm.link,
    carouselRank:state.ruleForm.sort
  })
  ElMessage.success('添加成功')
  close()
  props.reload()

}
defineExpose({open,close})
</script>

<style lang="scss" scoped>
.avatar-uploader {
  width: 100px;
  height: 100px;
  color: #ddd;
  font-size: 30px;
}
.avatar-uploader >>> .el-upload {
  width: 100%;
  text-align: center;
}
.avatar-uploader-icon {
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid #e9e9e9;
  padding: 32px 17px;
}
</style>