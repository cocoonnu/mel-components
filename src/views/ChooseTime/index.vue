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
    <div class="main-container">
        <choose-date @getDate="getDate"></choose-date>
        <br>
        <br>
        <choose-time @getTime="getTime" :startOptions="startOptions"></choose-time>
    </div>
</template>

<style scoped>
.main-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-top: 20px;
}
</style>