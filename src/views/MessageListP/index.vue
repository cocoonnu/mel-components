<script setup lang="ts">
import { list, actions } from './dataList'
</script>

<template>
    <notification :max="50" :value="100">
        <message-list :list="list" :actions="actions"></message-list>
    </notification>
</template>

<style scoped></style>