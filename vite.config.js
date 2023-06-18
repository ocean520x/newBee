import path from 'path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite' // 不加这个配置，ElMessage出不来

const pathSrc = path.resolve(__dirname, 'src')
// https://vitejs.dev/config/
export default () => defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [
                // Auto register icon components
                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ['ep'],
                }),
                // Auto register Element Plus components
                // 自动导入 Element Plus 组件
                ElementPlusResolver(),
            ],

            dts: path.resolve(pathSrc, 'components.d.ts'),
        }),

        Icons({
            autoInstall: true,
        }),
        // 按需引入，主题色的配置，需要加上 importStyle: 'sass'
        Components({
            resolvers: [ElementPlusResolver({
                importStyle: 'sass'
            })],
        }),
        ElementPlus({
            useSource: true,
        }),
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './'),
            '@': path.resolve(__dirname, 'src')
        },
    },
    base: './',
    server: {
        proxy: {
            '/api': {
                target: 'http://backend-api-02.newbee.ltd/manage-api/v1', // 凡是遇到 /api 路径的请求，都映射到 target 属性
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '') // 重写 api 为 空，就是去掉它
            }
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/styles/element/index.scss" as *;`,
            },
        },
    },
})
