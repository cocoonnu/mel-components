<script setup lang="ts">
import { ref, watch } from 'vue'
import * as Icons from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'


const props = defineProps<{
    title: string,
    dialogVisible: boolean,
}>()


let emits = defineEmits(['update:dialogVisible'])


// 当点击图标时
function clickIcon(iconName: string) {
    
    navigator.clipboard.writeText(`<el-icon><${iconName} /></el-icon>`)

    ElMessage({
        message: `复制成功`,
        type: 'success',
        duration: 1000
    })
}


// 内部显示与隐藏
let dialogVisibleIn = ref<boolean>(props.dialogVisible)


watch(() => props.dialogVisible, (newValue) => {
    dialogVisibleIn.value = newValue
})

watch(() => dialogVisibleIn.value, (newValue) => {
    emits('update:dialogVisible', newValue)
})


</script>

<template>
    <div class="choose-icon-container">

        <!-- 弹出框 -->
        <el-dialog :title="title" v-model="dialogVisibleIn">
            <div class="icon-container">
    
                <div class="icon-item" v-for="item in Icons">
    
                    <div class="icon-svg" @click="clickIcon(item.name)">
                        <component :is="item.name"></component>
                    </div>
    
                    <div class="icon-text">{{ item.name }}</div>
    
                </div>
    
            </div>
        </el-dialog>        

    </div>
</template>

<style scoped>
.icon-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    align-content: center;
    margin-top: -15px;
}

.icon-item {
    width: 25%;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;    
    margin: 15px 0;
}

.icon-svg svg {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
}

.icon-text {
    margin-top: 10px;
    font-size: 14px;
}
</style>