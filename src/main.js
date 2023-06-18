import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router/index.js";
import {ElButton, ElContainer, ElAside, ElMenu, ElSubMenu, ElMenuItemGroup,ElMenuItem,ElForm,ElFormItem,ElInput,ElCheckbox,ElMessage,ElPopover,ElTag,ElCard} from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router).use(ElButton).use(ElContainer).use(ElAside).use(ElMenu).use(ElSubMenu).use(ElMenuItemGroup).use(ElMenuItem).use(ElForm).use(ElFormItem).use(ElInput).use(ElCheckbox).use(ElMessage).use(ElPopover).use(ElTag).use(ElCard).mount('#app')
