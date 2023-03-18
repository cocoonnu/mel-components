<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue'


const props = defineProps<{
    sideCollapse: boolean,
}>()


const route = useRoute()
let activeIndex = ref(route.path)

</script>

<template>
    <el-aside width="auto" class="aside-container">
        <el-menu
            router
            :default-active="activeIndex"
            class="el-aside-vertical"
            :collapse="sideCollapse"
        >
            <el-menu-item index="/container/home">
                <el-icon><ElementPlus /></el-icon>
                <template #title>首页</template>
            </el-menu-item>

            <el-menu-item index="/container/icon">
                <el-icon><Coin /></el-icon>
                <template #title>图标选择器</template>
            </el-menu-item>

            <el-menu-item index="/container/area">
                <el-icon><LocationInformation /></el-icon>
                <template #title>城市选择器</template>
            </el-menu-item>

            <el-menu-item index="/container/time">
                <el-icon><Stopwatch /></el-icon>
                <template #title>时间选择器</template>
            </el-menu-item>

            <el-menu-item index="/container/form">
                <el-icon><Document /></el-icon>
                <template #title>表单生成器</template>
            </el-menu-item>

            <el-menu-item index="/container/dialogform">
                <el-icon><ChatLineSquare /></el-icon>
                <template #title>弹出框表单</template>
            </el-menu-item>

        </el-menu>                
    </el-aside>
</template>

<style scoped lang="scss">
/* 侧边栏菜单展开时可固定宽度 */
.el-aside-vertical:not(.el-menu--collapse) {
  width: 200px;
}

.aside-container {
    .el-menu .el-icon {
        margin: -2px 5px 0 0;
    }

    .el-menu-item {
        font-size: 16px;
        user-select: none;
    }

    svg {
        width: 16px;
        height: 16px;
    }
}

</style>