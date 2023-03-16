<script setup lang="ts">

let startOptions = {
    size: 'default',
}


function getTime(time: any) {
    console.log(time)
}
</script>

<template>
    <choose-time @getTime="getTime" :startOptions="startOptions"></choose-time>
    <choose-date></choose-date>
</template>

<style scoped></style>