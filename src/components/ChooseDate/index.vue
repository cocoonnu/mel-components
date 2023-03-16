<script setup lang="ts">
import { ref, watch } from 'vue'

// 开始日期
let startDate = ref<Date | null>(null)
// 结束日期
let endDate = ref<Date | null>(null)
// 控制结束日期的禁用状态
let endDateDisabled = ref<boolean>(true)


let props = defineProps({
    // 开始日期的占位符
    startPlaceholder: {
        type: String,
        default: '请选择开始日期'
    },
    // 结束日期的占位符
    endPlaceholder: {
        type: String,
        default: '请选择结束日期'
    },
    // 是否禁用选择今天之前的日期
    disableToday: {
        type: Boolean,
        default: true
    }
})


let emits = defineEmits(['startChange', 'endChange'])


// 设置禁用日期函数
function disabledDate(time: Date) {
    // console.log(time) // Sat Apr 08 2023 00:00:00 GMT+0800 (中国标准时间)
    // time.getTime() 时间戳
}


</script>

<template>
    <div class="choose-date-container">
        <el-date-picker
            v-model="startDate"
            type="date"
            :placeholder="startPlaceholder"
            :disabled-date="disabledDate"
        />        
    </div>
</template>

<style scoped></style>