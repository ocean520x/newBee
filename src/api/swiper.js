import axios from '@/utils/axios.js'

//获取轮播图列表的接口
export const getCarouselsAPI=(params)=>{
    return axios({
        url:'/carousels',
        params
    })
}

//根据id获取轮播图详情数据的接口
export const getCarouselDetailAPI=(id)=>{
    return axios({
        url:`/carousels/${id}`,
        method:'get'
    })
}
//新增轮播图的接口
export const addCarouselAPI=(data)=>{
    return axios({
        url:'/carousels',
        method:'post',
        data
    })
}
//删除轮播图的接口
export const deleteCarouselAPI=(ids)=>{
    return axios({
        url:'/carousels',
        method:'delete',
        data:{ids}
    })
}
//暴露一下上传单张图片的请求地址
export const uploadImgServer='http://backend-api-02.newbee.ltd/manage-api/v1/upload/file'