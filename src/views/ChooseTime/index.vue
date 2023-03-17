<script setup lang="ts">

let startOptions = {
    size: 'default',
}


function getTime(time: any) {
    console.log(time)
}

function getDate(date: any) {
    console.log(date)
}

</script>

<template>
    <choose-time @getTime="getTime" :startOptions="startOptions"></choose-time>
    <br>
    <choose-date @getDate="getDate"></choose-date>
</template>

<style scoped></style>