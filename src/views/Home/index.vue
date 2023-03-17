<script setup lang="ts">
import { ref } from 'vue'

let value = ref(2)
</script>

<template>
    <notification :max="99" :value="100">
    </notification>

    <a-rate v-model:value="value" />
</template>

<style scoped>
</style>