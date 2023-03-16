<script setup lang="ts">
function getAreaData(areaData: any) {
    console.log(areaData)
}

</script>

<template>
    <!-- <choose-area @getAreaData="getAreaData"></choose-area> -->
    <notification :max="99" :value="100">
    </notification>
    
</template>

<style scoped>
</style>