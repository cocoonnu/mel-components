// 将封装的组件注册为全局组件
// 打包的入口文件

import { App } from 'vue'
import ChooseArea from './ChooseArea/index'
import ChooseIcon from './ChooseIcon/index'
import ChooseCity from './ChooseCity/index'
import ChooseDate from './ChooseDate/index'
import ChooseTime from './ChooseTime/index'
import DialogForm from './DialogForm/index'
import ModalTable from './ModalTable/index'
import Pagination from './Pagination/index'
import ModalForm from './ModalForm/index'
import FullCalendar from './FullCalendar/index'

const components = [
    ChooseArea,
    ChooseIcon,
    ChooseCity,
    ChooseDate,
    ChooseTime,
    ModalForm,
    DialogForm,
    ModalTable,
    Pagination,
    FullCalendar
]

// 统一打包 app.use
export default {
    install(app: App) {
        components.map((item: any) => { app.use(item) })
    }
}