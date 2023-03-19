<script setup lang="ts">
import { PropType, computed, ref, nextTick } from 'vue'
import { TableOption } from './type/types'
import { getCurrentInstance, onMounted, onBeforeUnmount } from 'vue'
const cxt = getCurrentInstance()
const bus = cxt!.appContext.config.globalProperties.$bus


onMounted(() => {

    // 绑定编辑和删除表格行事件
    bus.on('editRow', editRow)
    bus.on('deleteRow', deleteRow)

    // 绑定确认编辑和取消编辑表格行事件
    bus.on('confirmEditRow', confirmEditRow)
    bus.on('cancelEditRow', cancelEditRow)
})

onBeforeUnmount(() => {

    // 解绑事件
    bus.off('editRow', 'confirmEditRow', 'deleteRow', 'cancelEditRow')
})



let props = defineProps({
    
    // 表格选项
    option: {
        type: Array as PropType<TableOption[]>,
        require: true
    },

    // 表格数据
    data: {
        type: Array as PropType<any[]>,
        require: true
    }

})


// 同步表单数据
let emits = defineEmits(['getTableData'])


// 表格数据（和表格已经双向绑定）
let tableData = ref<any>(props.data)

// 过滤操作列和普通列
let tableOptions = computed(() => {
    return props.option?.filter(item => !item.action)
})


let settingOption = computed(() => {
    return props.option?.filter(item => item.action)
})


// 当前编辑的单元格
let editCell = ref<String>('')


// 当前编辑的表格行序号
let editRowIndex = ref<Number>(-1)


// 输入框ref
let editInput = ref(null)


// 点击编辑单元格函数
function clickEdit(scope: any) {
    
    editCell.value = scope.$index + scope.column.id
    nextTick(() => {
        // @ts-ignore
        editInput.value![0].focus()
        
    })
}

// 退出编辑单元格函数
function exitEdit() {
    editCell.value = ''

    // 同步表单数据
    emits('getTableData', tableData.value)
}


// 存储编辑前每行的数据
let initRowData: any = []


// 编辑表格行函数
function editRow(scope: any) {

    editRowIndex.value = scope.$index

    // 存储编辑前每行的数据
    for (let item in scope.row) {
        initRowData.push(scope.row[item])
    }
}


// 删除表格行函数
function deleteRow(scope: any) {

    tableData.value.splice(scope.$index, 1)
    // 同步表单数据
    emits('getTableData', tableData.value)
}


// 确认编辑表格行函数
function confirmEditRow() {
    editRowIndex.value = -1
    // 同步表单数据
    emits('getTableData', tableData.value)
}

// 取消编辑表格行函数
function cancelEditRow(scope: any) {
    
    editRowIndex.value = -1

    let index = initRowData.length / scope.cellIndex
    let i = (index - 1) * scope.cellIndex

    // 重新赋值
    for (let item in scope.row) {
        scope.row[item] = initRowData[i]
        i++ 
    }
    
    initRowData = []
}


</script>

<template>

    <el-table :data="tableData" >

        <!-- 普通列 -->
        <template v-for="(item, index) in tableOptions" :key="index">

            <el-table-column 
                :prop="item.prop"
                :label="item.label"
                :align="item.align"
                :width="item.width"
                v-bind="item.attrs"
            >

                <template #default="scope">
                
                    <!-- 未处于编辑状态 -->
                    <template 
                        v-if="
                            (scope.$index + scope.column.id) != editCell &&
                            scope.$index != editRowIndex
                        "
                    >

                        <!-- 自定义列模板（插槽名item.slot） -->
                        <slot :name="item.slot" :scope="scope" v-if="item.slot"></slot>
    
                        <!-- 普通列模板 -->
                        <span v-else >{{ scope.row[item.prop!] }}</span>
    
                        <!-- 单元格可编辑图标 -->
                        <el-icon 
                            v-if="item.editable" 
                            class="edit-icon"
                            @click="clickEdit(scope)"
                        ><Edit /></el-icon>

                    </template>


                    <!-- 处于编辑单元格状态 -->
                    <el-input 
                        v-if="(scope.$index + scope.column.id) == editCell"
                        size="small"
                        ref="editInput"
                        v-model="scope.row[item.prop!]" 
                        @blur="exitEdit"
                    ></el-input>
                    
                    
                    <!-- 处于编辑行状态 -->
                    <el-input 
                        v-if="scope.$index == editRowIndex"
                        size="small"
                        ref="editInput"
                        v-model="scope.row[item.prop!]" 
                    ></el-input>
                    
                </template>            

            </el-table-column>

        </template>


        <!-- 操作列 -->
        <el-table-column 
            v-if="settingOption"
            :label="settingOption[0].label"
            :align="settingOption[0].align"
            :width="settingOption[0].width"
            v-bind="settingOption[0].attrs"
        >

            <!-- 设置自定义插槽（用户填写） -->
            <template #default="scope">
                <slot name="setting" :scope="scope"></slot>
            </template>            

        </el-table-column>

    </el-table>

</template>

<style scoped>
.edit-icon {
    width: 1em;
    height: 1em;
    position: relative;
    top: 2.5px;
    left: 10px;
    cursor: pointer;
}
</style>