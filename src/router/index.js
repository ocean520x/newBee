import {createRouter, createWebHashHistory} from "vue-router";
import Index from "../views/Index.vue";
import AddGood from "@/views/AddGood.vue";
import Login from "@/views/Login.vue";
import Swiper from "@/views/Swiper.vue";

const router=createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/',
            name:'index',
            component:Index
        },
        {
            path:'/add',
            name:'add',
            component:AddGood
        },
        {
            path:'/login',
            name:'login',
            component:Login
        },
        {
            path:'/swiper',
            name:'swiper',
            component:Swiper
        }
    ]
})

export  default  router