import { RuleItem } from './rule'
import { CSSProperties } from 'vue'


// 表单每一项的配置选项
export interface FormOptions {

    // 支持多选、单选、输入框、评分、选择器、滑块、开关、上传等组件
    type: 'checkbox' | 'checkbox-group' | 'checkbox-button' | 'input' | 'input-number' 
    | 'radio' | 'radio-group' | 'radio-button' | 'rate' |'select' | 'option' 
    | 'slider' | 'switch' | 'upload' | 'editor' | 'time-select',

    // 表单项的初始值
    value?: any,

    // 表单项label
    label?: string,

    // 表单的model双向绑定变量
    prop?: string,

    // 表单项的prop验证规则（一个props对应一个rules数组）
    rules?: RuleItem[],

    // 表单项的占位符
    placeholder?: string,

    // 表单项的子项属性
    children?: FormOptions[] 

    // 表单元素特有的属性
    attrs?: {
        clearable?: boolean,
        showPassword?: boolean,
        disabled?: boolean,
        style?: CSSProperties
    },
}
