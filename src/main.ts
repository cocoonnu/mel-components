import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import './style.css'

const app = createApp(App)

for (let i in Icons) {
    // 注册全部图标组件
    app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
}

app.use(router).use(ElementPlus)
app.mount('#app')

// 把驼峰转换成横杠连接
function toLine(value: string) {
    return value.replace(/(A-Z)g/, '-$1').toLocaleLowerCase()
}