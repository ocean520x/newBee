import axios from '@/utils/axios.js'
export const loginAPI=(data)=>{
    return axios({
        url:'/adminUser/login',
        method:'post',
        data
    })
}