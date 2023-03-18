<script setup lang="ts">

function getAreaData(areaData: any) {
    console.log(areaData)
}


function getCity(city: string) {
    console.log(city)
}

</script>

<template>
    <div class="main-container">

        <choose-city @getCity="getCity"></choose-city>
        <br>
        <br>
        <choose-area @getAreaData="getAreaData"></choose-area>

    </div>
</template>

<style scoped>
</style>
