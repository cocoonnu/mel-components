import { App } from 'vue'
import ChooseIcon from './index.vue'


// 让这个组件可以通过 app.use 的形式使用
export default {
    install(app: App) {
        // 给组件取个名字
        app.component('choose-icon', ChooseIcon)
    }
}