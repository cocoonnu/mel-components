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


let emits = defineEmits(['getDate'])


// 设置禁用开始日期函数
function startDisabledDate(time: Date) {
    
    // 禁用当前日期之前的日期
    if (props.disableToday) return time.getTime() < Date.now() - 1000 * 60 * 60 * 24
}


// 设置禁用结束日期函数
function endDisabledDate(time: Date) {
    // time 遍历的日期
    // time.getTime() 遍历的日期的时间戳
    // Date.now() 当前日期的时间戳

    // 禁用开始日期之前的日期
    if (startDate.value) {
        return time.getTime() < startDate.value!.getTime() + 1000 * 60 * 60 * 24
    }
}


watch(startDate, (newValue) => {

    if (newValue) {
        endDateDisabled.value = false
    } else {
        endDate.value = null
        endDateDisabled.value = true
    } 
})


watch(endDate, () => {

    if (endDate.value && startDate.value) {

        emits('getDate', {
            startDate: startDate.value,
            endDate: endDate.value
        })
    } else {

        emits('getDate', {
            startDate: null,
            endDate: null
        })
    }
})

</script>

<template>
    <div class="choose-date-container">
        <el-date-picker
            v-model="startDate"
            type="date"
            :placeholder="startPlaceholder"
            :disabled-date="startDisabledDate"
            v-bind="$attrs.startOptions"
        />        
        <el-date-picker
            v-model="endDate"
            type="date"
            :placeholder="endPlaceholder"
            :disabled-date="endDisabledDate"
            :disabled="endDateDisabled"
            v-bind="$attrs.endOptions"
        />        
    </div>
</template>

<style scoped lang="scss">
.choose-date-container {
    width: 450px;
}
</style>