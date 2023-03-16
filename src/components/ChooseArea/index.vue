<script setup lang="ts">
import { ref, watch } from 'vue'
import allAreas from './lib/pca-code.json'


const emits = defineEmits<{
    (e: 'getAreaData', areaData: any): void
}>()


// 省市区名字
let province = ref('')
let city = ref('')
let area = ref('')


// 省市区数组
let areas = ref(allAreas)
let cityArray = ref<any>([])
let areaArray = ref<any>([])


// 监听属性
watch(province, (newValue) => {
    if (newValue) {
        cityArray.value = areas.value.find(item => item.name === newValue)!.children
    }

    // 清空选项
    city.value = ''
    area.value = ''
})

watch(city, (newValue) => {
    if (newValue) {
        areaArray.value = cityArray.value.find((item: any) => item.name === newValue)!.children
    }

    // 清空选项
    area.value = ''
})

watch(area, (newValue) => {
    if (newValue) {
        let areaData = {
            province: province.value,
            city: city.value,
            area: area.value
        }
        
        emits('getAreaData', areaData)
    }
})


</script>

<template>
    <div class="choose-area-container">

        <!-- 选择省 -->
        <el-select v-model="province" placeholder="请输入省份" clearable>
            <el-option
              v-for="item in areas"
              :key="item.code"
              :value="item.name"
            />    
        </el-select>    
    
        <!-- 选择市 -->
        <el-select v-model="city" placeholder="请输入城市" clearable :disabled="!province">
            <el-option            
                v-for="item in cityArray"
                :key="item.code"
                :value="item.name"
            />
        </el-select>    

        <!-- 选择区 -->
        <el-select v-model="area" placeholder="请输入地区" clearable :disabled="!city">
            <el-option            
                v-for="item in areaArray"
                :key="item.code"
                :value="item.name"
            />
        </el-select>    

    </div>

</template>

<style scoped>
.el-select {
    margin: 0 5px;
}

.choose-area-container {
    min-width: 700px;
}
</style>