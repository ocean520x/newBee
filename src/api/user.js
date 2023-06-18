import axios from '@/utils/axios.js'
//登陆的接口
export const loginAPI = (data) => {
    return axios({
        url: '/adminUser/login',
        method: 'post',
        data
    })
}

//获取用户信息的接口
export const getUserInfoAPI = () => {
    return axios({
        url: '/adminUser/profile',
        method: 'get'
    })
}

//退出登录的接口
export const logoutAPI=()=>{
    return axios({
        url:'/logout',
        method:'delete'
    })
}