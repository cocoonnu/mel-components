import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './style.css'

// 引入封装的组件库
import mUI from './components/index'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router).use(ElementPlus)
app.mount('#app')

// 把驼峰转换成横杠连接
function toLine(value: string) {
    return value.replace(/(A-Z)g/, '-$1').toLocaleLowerCase()
}