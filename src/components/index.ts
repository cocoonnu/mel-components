// 将封装的组件注册为全局组件
// 打包的入口文件

import { App } from 'vue'
import ChooseArea from './ChooseArea/index.vue'
import ChooseIcon from './ChooseIcon/index.vue'

const components = [
    ChooseArea,
    ChooseIcon
]

// 统一打包 app.use
export default {
    install(app: App) {
        components.map((item: any) => { app.use(item) })
    }
}