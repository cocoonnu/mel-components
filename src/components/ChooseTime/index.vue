<script lang="ts" setup>
import { ref, watchEffect } from 'vue'


// 最终时间范围
let startValue = ref('')
let endValue = ref('')


let props = defineProps({
    // 开始时间的占位符
    startPlaceholder: {
        type: String,
        default: '请选择开始时间'
    },
    // 结束时间的占位符
    endPlaceholder: {
        type: String,
        default: '请选择结束时间'
    },
    // 时间的步进
    step: {
        type: String,
        default: "00:30"
    },

    // 开始时间的开始选择
    startTimeStart: {
        type: String,
        default: "08:00"
    },
    // 开始时间的结束选择
    startTimeEnd: {
        type: String,
        default: "24:00"
    },
    // 结束时间的开始选择
    endTimeStart: {
        type: String,
        default: "08:00"
    },
    // 结束时间的结束选择
    endTimeEnd: {
        type: String,
        default: "24:00"
    },
})


let emits = defineEmits(['getTime'])


watchEffect(() => {

    if (startValue.value && endValue.value) {

        emits('getTime', {
            startTime: startValue.value,
            endTime: endValue.value
        })
    } else {

        emits('getTime', {
            startTime: null,
            endTime: null
        })
    }
})

</script>

<template>
    <div class="time-range bigger-input">
        <el-time-select 
            v-bind="$attrs.startOptions"
            v-model="startValue"
            :placeholder="startPlaceholder" 
            :max-time="endValue" 
            :start="startTimeStart"
            :end="startTimeEnd" 
            :step="step" 
        />
        
        <el-time-select 
            v-bind="$attrs.endOptions"
            v-model="endValue" 
            :placeholder="endPlaceholder" 
            :min-time="startValue"
            :start="endTimeStart"
            :end="endTimeEnd" 
            :step="step"
        />
    </div>
</template>

<style lang="scss" scoped>
.time-range {
    width: 500px;
    margin-bottom: 20px;
    
    .el-select {
        margin-right: 10px;
    }
}
</style>