<script setup lang="ts">
import { ActionOptions, ListOptions } from './type'
import { PropType, ref } from 'vue'


let props = defineProps({
    // 列表内容
    list: {
        type: Array as PropType<ListOptions[]>,
        required: true
    },

    // 设置内容
    actions: {
        type: Array as PropType<ActionOptions[]>,
        default: []
    }
})

const activeName = ref(props.list[0].title)

function tabClick() {

}


</script>

<template>
    <el-tabs v-model="activeName" @tabClick="tabClick" class="messagelist-tab">
        <el-tab-pane 
            v-for="(item, index) in list" 
            :label="item.title" 
            :name="item.title"
            :key="index"
        >

            <!-- tab栏内容 -->
            {{ item.title }}

        </el-tab-pane>
    </el-tabs>    
</template>

<style scoped>
</style>