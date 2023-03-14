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
                <el-icon-menu></el-icon-menu>
                <template #title>首页</template>
            </el-menu-item>

            <el-menu-item index="2">
                <el-icon-menu></el-icon-menu>
                <template #title>图标选择器</template>
            </el-menu-item>

        </el-menu>                
    </el-aside>
</template>

<style scoped>
/* 侧边栏菜单展开时可固定宽度 */
.el-aside-vertical:not(.el-menu--collapse) {
  width: 200px;
}

svg {
    width: 1rem;
    height: 1rem;
    margin-right: 10px;
}
</style>