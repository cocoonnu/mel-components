<script setup lang="ts">
import { ref } from 'vue'

const dialogVisible = ref<boolean>(false)


function handleClick() {
    dialogVisible.value = true
}

</script>

<template>
    <el-button @click="handleClick" type="primary">
        选择图标
    </el-button>


    <choose-icon title="选择图标" ref="icon" v-model:dialogVisible="dialogVisible">
    </choose-icon>
</template>

<style>
</style>