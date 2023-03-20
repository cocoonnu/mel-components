<script setup lang="ts">
import { ref, computed } from 'vue'
import { TableOption } from '@/components/ModalTable/type/types'
import { getCurrentInstance, onMounted, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
const cxt = getCurrentInstance()
const bus = cxt!.appContext.config.globalProperties.$bus


let options: TableOption[] = [
    {
        prop: 'date',
        label: '日期',
        align: 'center',
        slot: 'date',
        editable: true
    },
    {
        prop: 'name',
        label: '姓名',
        align: 'center',
        slot: 'name'
    },
    {
        prop: 'address',
        label: '地址',
        align: 'center',
        editable: true
    },

    // 操作项
    {
        action: true,
        label: '设置',
        align: 'center',
    },
]
 

// 初始化表单的数据
let tableData = ref<any>(
    [
        {
            date: '2016-05-03',
            name: 'Tom1',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'Tom2',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-04',
            name: 'Tom3',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-01',
            name: 'Tom4',
            address: 'No. 189, Grove St, Los Angeles',
        },
    ]    
)


function showTableData() {

    ElMessage({
        message: `请在控制台查看`,
        type: 'success',
        duration: 1000
    })

    console.log(tableData.value)
}


// 设置加载
let loading = ref(true)
setTimeout(() => {

    loading.value = false
}, 1000)


// - 如果有操作项则需要填写 -

// 是否进入编辑行状态
let editRowIndex = ref<Number>(-1)


// 点击编辑按钮
function editRow(scope: any) {

    // 执行编辑表格行函数
    bus.emit('editRow', scope)

    // 改变操作项按钮
    editRowIndex.value = scope.$index
}

// 点击删除按钮
function deleteRow(scope: any) {
    bus.emit('deleteRow', scope)
}


// 确认按钮
function confirmEditRow() {
    bus.emit('confirmEditRow')
    editRowIndex.value = -1
}

// 取消按钮
function cancelEditRow(scope: any) {
    bus.emit('cancelEditRow', scope)
    editRowIndex.value = -1
}

// - 如果有操作项则需要填写 -

</script>

<template>
    <ModalTable 
        :option="options" 
        v-model:data="tableData" 
        stripe v-loading="loading"
    >
    
        <!-- 填写操作项 -->
        <template #setting="{ scope }">

            <!-- 未进入编辑行状态的按钮 -->
            <template v-if="scope.$index != editRowIndex">
                <el-button
                    size="small" 
                    @click.stop="editRow(scope)"
                >编辑</el-button>
    
                <el-button
                    size="small"
                    type="danger"
                    @click="deleteRow(scope)"
                >删除</el-button>            
            </template>


            <!-- 进入编辑行状态的按钮 -->
            <template v-if="scope.$index == editRowIndex">
                <el-button
                    size="small" 
                    @click="confirmEditRow()"
                >确认</el-button>

                <el-button
                    size="small"
                    type="danger"
                    @click="cancelEditRow(scope)"
                >取消</el-button>            
            </template>

        </template>


        <!-- 填写 日期 自定义列模板 -->
        <template #date="{ scope }">
            <el-icon class="timer-icon"><timer /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
        

        <!-- 填写 姓名 自定义列模板 -->
        <template #name="{ scope }">
            <el-popover effect="light" trigger="hover" placement="top" width="auto">
                <template #default>
                    <div>name: {{ scope.row.name }}</div>
                    <div>address: {{ scope.row.address }}</div>
                </template>

                <template #reference>
                    <el-tag class="name-tag">{{ scope.row.name }}</el-tag>
                </template>
            </el-popover>
        </template>        

    </ModalTable>

    <el-button @click="showTableData" type="primary" class="show-btn">
        输出表单数据
    </el-button>
</template>

<style scoped>
.timer-icon {
    width: 1em;
    height: 1em;
    position: relative;
    top: 2.5px;
    cursor: pointer;
}

.show-btn {    
    margin-top: 50px;
}

.name-tag {
    cursor: default;
}
</style>