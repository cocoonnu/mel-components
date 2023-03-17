import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'dayjs/locale/zh-cn'
import './style.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import mUI from './components/index'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router)

app.use(ElementPlus, {
    locale: zhCn,
})

app.use(Antd)

app.use(mUI)

app.mount('#app')