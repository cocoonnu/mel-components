// 所有Table-column属性
// https://element-plus.gitee.io/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7


// 封装的Table-column属性
export interface TableOption {
    // 字段名称
    prop?: string,

    // 表头名称
    label: string,

    // 对应列的宽度
    width?: string | number,

    // 内容对齐方式
    align?: 'left' | 'center' | 'right',

    // 自定义列模板的插槽名
    slot?: string,

    // 是否是操作项
    action?: boolean,

    // 是否可以编辑
    editable?: boolean    

    // 额外配置项
    attrs?: any

}