<script setup lang="ts">
const props = defineProps<{
    sideCollapse: boolean,
}>()

</script>

<template>
    <el-aside width="auto">
        <el-menu
            default-active="1"
            class="el-aside-vertical"
            :collapse="sideCollapse"
        >
            <el-menu-item index="1">
                <template #title>Navigator Two</template>
            </el-menu-item>
            <el-menu-item index="2">
                <template #title>Navigator Two</template>
            </el-menu-item>
            <el-menu-item index="3">
                <template #title>Navigator Two</template>
            </el-menu-item>
            <el-menu-item index="4">
                <template #title>Navigator Two</template>
            </el-menu-item>

        </el-menu>                
    </el-aside>
</template>

<style>
/* 侧边栏菜单展开时可固定宽度 */
.el-aside-vertical:not(.el-menu--collapse) {
  width: 200px;
}
</style>