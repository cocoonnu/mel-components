<script setup lang="ts">
const props = defineProps<{
    sideCollapse: boolean,
}>()

let emits = defineEmits(['update:sideCollapse'])


function toggle() {
    emits('update:sideCollapse', !props.sideCollapse)
}

</script>

<template>
    <el-header>
        <div class="header">
            <span @click="toggle">
                <el-icon-expand v-if="sideCollapse"></el-icon-expand>
                <el-icon-fold v-else></el-icon-fold>
            </span>
        </div>
    </el-header>
</template>

<style scoped>
.el-header {
    padding: 0;
    border-bottom: 1px solid #eee;
}
</style>