<script setup lang="ts">
function getAreaData(areaData: any) {
    console.log(areaData)
}

</script>

<template>
    <choose-area @getAreaData="getAreaData"></choose-area>
    <br>
    <choose-city></choose-city>
</template>

<style scoped></style>