<script setup lang="ts">
import { ref } from 'vue'

let props = defineProps({
    value: {
        type: [String, Number],
        default: ''
    },
    max: {
        type: Number
    },
    isDot: {
        type: Boolean,
        default: false
    },
})


</script>

<template>
    <el-popover :width="300" trigger="click">

        <!-- 弹出框点击按钮 -->
        <template #reference>
            <el-badge :value="value" :max="max" :isDot="isDot" class="notification-item">
                <el-icon-bell />
            </el-badge>
        </template>

        <!-- 弹出框内容（由父组件传入） -->
        <template #default>
            <slot></slot>
        </template>

    </el-popover>
</template>

<style scoped>
.notification-item svg {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
}
</style>