import axios from '@/utils/axios.js'

//获取轮播图列表的接口
export const getCarouselsAPI=(params)=>{
    return axios({
        url:'/carousels',
        params
    })
}