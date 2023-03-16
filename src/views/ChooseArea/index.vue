<script setup lang="ts">
function getAreaData(areaData: any) {
    console.log(areaData)
}

</script>

<template>
    <choose-area @getAreaData="getAreaData"></choose-area>
</template>

<style scoped></style>