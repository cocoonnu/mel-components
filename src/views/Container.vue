<script setup lang="ts">
import navHeader from '@/components/navHeader/index.vue'
import navSide from '@/components/navSide/index.vue'
import { ref } from 'vue'

let sideCollapse = ref(false)

</script>

<template>
    <el-container>
        <nav-side :sideCollapse="sideCollapse"></nav-side>

        <el-container>
            <nav-header v-model:sideCollapse="sideCollapse"></nav-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>

    </el-container>
</template>

<style>
html, body, #app, .el-container, .el-menu {
    height: 100vh;
}
</style>