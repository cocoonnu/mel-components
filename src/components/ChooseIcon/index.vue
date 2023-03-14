<script setup lang="ts">
import { ref } from 'vue'
import * as Icons from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'


const props = defineProps<{
    title: string,
}>()


let visible = ref(false)


function handleClick() {
    visible.value = true
}


function clickIcon(iconName: string) {
    navigator.clipboard.writeText(`<el-icon-${toLine(iconName)}/>`)

    ElMessage({
        message: `复制成功`,
        type: 'success',
        duration: 1000
    })
}


// 把驼峰转换成横杠连接
function toLine(value: string) {
    return value.replace(/(A-Z)g/, '-$1').toLocaleLowerCase()
}

</script>

<template>
    <div class="choose-icon-container">
        <el-button @click="handleClick" type="primary">
            <slot></slot>
        </el-button>
    
        <!-- 弹出框 -->
        <el-dialog :title="title" v-model="visible">
            <div class="icon-container">
    
                <div class="icon-item" v-for="item in Icons">
    
                    <div class="icon-svg" @click="clickIcon(item.name)">
                        <component :is="`el-icon-${toLine(item.name)}`"></component>
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
    margin-top: 5px;
    font-size: 14px;
}
</style>