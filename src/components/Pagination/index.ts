import { App } from 'vue'
import Pagination from './index.vue'


// 让这个组件可以通过 app.use 的形式使用
export default {
    install(app: App) {
        // 给组件取个名字
        app.component('pagination', Pagination)
    }
}