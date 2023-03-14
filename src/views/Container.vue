<script setup lang="ts">
import NavHeader from '@/components/NavHeader/index.vue'
import NavSide from '@/components/NavSide/index.vue'
import { ref } from 'vue'

let sideCollapse = ref(false)

</script>

<template>
    <el-container>
        <nav-side :sideCollapse="sideCollapse"></nav-side>

        <el-container class="header-main">
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

.header-main {
    flex-direction: column;
}
</style>