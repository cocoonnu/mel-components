<script setup lang="ts">
// import ChooseIcon from '@/components/ChooseIcon/index.vue'
// import ChooseArea from '@/components/ChooseArea/index.vue'

function getAreaData(areaData: any) {
    console.log(areaData)
}

</script>

<template>
    <!-- <choose-icon title="选择图标">选择图标</choose-icon> -->
    <!-- <choose-area @getAreaData="getAreaData"></choose-area> -->
    <notification :max="99" :value="100">
        <message-list></message-list>
    </notification>
    
</template>

<style scoped>
</style>