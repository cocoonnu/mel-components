<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormOptions } from '@/components/ModalForm/type/types'


let options: FormOptions[] = [

    // 用户名输入框
    {
        type: 'input',
        value: '',
        label: '标题',
        prop: 'title',
        placeholder: '请输入标题',

        rules: [
            {
                required: true,
                message: '标题不能为空',
                trigger: 'blur'
            },
        ],
    },

    // 密码输入框
    {
        type: 'input',
        value: '',
        label: '描述',
        prop: 'words',
        placeholder: '请输入描述',

        attrs: {
            clearable: true
        }
    },

    // 时间选择器
    {
        type: 'time-select',
        value: '',
        label: '开始时间',
        prop: 'startTime',
    },

    // 时间选择器
    {
        type: 'time-select',
        value: '',
        label: '结束时间',
        prop: 'endTime',
    },
]


const formVisible = ref<boolean>(false)

const inforVisible = ref(false)

const formLabelWidth = '140px'

let clickDateValue = ref<string>('')

const gridData = [
    {
        date: '2016-05-02',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District',
    },
    {
        date: '2016-05-04',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District',
    },
    {
        date: '2016-05-01',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District',
    },
    {
        date: '2016-05-03',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District',
    },
]


function clickDate(data: any) {
    console.log(data)
    clickDateValue.value = data.day
    formVisible.value = true
}


function clickSchedule(data: any) {
    inforVisible.value = true
}

// 获取表单数据
function getFormData(formModel: any) {

    console.log(formModel)
}

</script>

<template>
<div class="calender" v-bind="$attrs">

    <el-calendar>

        <template #date-cell="{ data }">
            <div @click="clickDate(data)" class="calendar-item">

                <div class="calendar-item-date">
                    {{ data.day.split('-').slice(1).join('-') }}
                </div>

                <el-badge 
                    :value="12" class="calendar-item-btn"
                    v-if="data.day.split('-').slice(1).join('-') == '03-07'"
                >
                    <el-button @click.stop="clickSchedule(data)">
                        日程安排
                    </el-button>
                </el-badge>                

            </div>
        </template>

    </el-calendar>    

    <!-- 日程安排信息框 -->
    <el-dialog v-model="inforVisible" :title="`${clickDateValue} 日程安排`">
        <el-table :data="gridData">
            <el-table-column property="date" label="Date" width="150" />
            <el-table-column property="name" label="Name" width="200" />
            <el-table-column property="address" label="Address" />
        </el-table>
    </el-dialog>


    <!-- 日程安排表单框 -->
    <dialog-form 
        v-model:dialogVisible="formVisible"
        :title="`${clickDateValue} 新建日程`"
        @getFormData="getFormData"
        :options="options"
        label-width="80px" 
        center
    >
    </dialog-form>

</div>    
</template>

<style>
.calendar-item {
    width: 100%;
    height: 100%;
    user-select: none;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.calendar-item-btn {
    margin-top: 10px;
}

.calender .dialog-form-container .el-dialog {
    width: 600px;
    height: 500px;
}

.calender .el-dialog__body {
    margin-top: 30px;
}
</style>