export const localGet = (key) => {
    const value = window.localStorage.getItem(key)
    try {
        return JSON.parse(window.localStorage.getItem(key))
    } catch (err) {
        return value
    }
}

export const localSet = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify((value)))
}

export const localRemove = (key) => {
    window.localStorage.removeItem(key)
}
//声明路由和title对应的键值对
export const pathMap = {
    index: '首页',
    login: '登陆',
    add: '添加商品',
    swiper:'轮播图配置'
}