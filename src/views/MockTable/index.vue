<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TableOption } from '@/components/ModalTable/type/types'
import axios from 'axios'


let options: TableOption[] = [
    {
        prop: 'date',
        label: '日期',
        align: 'center',
    },
    {
        prop: 'name',
        label: '姓名',
        align: 'center',
    },
    {
        prop: 'address',
        label: '地址',
        align: 'center',
    },
]


// 表单数据
let tableData = ref<any>([])

// 数据总数
let totalData = ref<number>(0)

// 当前页
let currentPage = ref<number>(0)

// 每页数量
let pageSize = ref<number>(10)


// 获取分页数据
function fetchTableData(currentPage: number, pageSize: number) {

    return axios.post('/api/list', {
        current: currentPage,
        pageSize: pageSize,
    })
}


// 翻页函数
async function pageChange(page: number) {
    // 实际当前页为 分页器页数减一

    currentPage.value = page - 1

    let result = await fetchTableData(currentPage.value, pageSize.value)

    if (result.data.code == '200') {

        totalData.value = result.data.data.total
        pageSize.value = result.data.data.pageSize
        tableData.value = result.data.data.rows
    }
}


onMounted(async function () {

    let result = await fetchTableData(currentPage.value, pageSize.value)

    if (result.data.code == '200') {

        totalData.value = result.data.data.total
        pageSize.value = result.data.data.pageSize
        tableData.value = result.data.data.rows
    }
})


let loading = ref(true)

setTimeout(() => {

    loading.value = false
}, 1000)


</script>

<template>

    <!-- 表格 -->
    <ModalTable :option="options" :data="tableData" stripe v-loading="loading" >
    </ModalTable>

    <!-- 分页器 -->
    <pagination :total="totalData" :pageSize="pageSize" @pageChange="pageChange">
    </pagination>

</template>

<style scoped>
.timer-icon {
    width: 1em;
    height: 1em;
    position: relative;
    top: 2.5px;
    cursor: pointer;
}
</style>