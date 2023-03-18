<script setup lang="ts">
import { ref } from 'vue'
import lettersValue from './lib/letters'
import provinceVaue from './lib/province.json'
import { message } from 'ant-design-vue'


let emits = defineEmits(['getCity'])


let provinceData:any = provinceVaue
let lettersData: any = lettersValue


// 所有城市数组
let allCity = ref<any>([])

for (const letters in lettersData) {
    // @ts-ignore
    lettersData[letters].forEach((item: any) => { allCity.value.push(item) })
}


// 所有按字母归纳的省份数组
let allProvince = ref<any>([])

for (const letters in provinceData) {
    // @ts-ignore
    provinceData[letters].forEach((item: any) => { allProvince.value.push(item) })
}


// 卡片显示
let visible = ref(false)

// 选择依据字母还是城市
let accordingTo = ref('letters')


// 搜索框双向绑定城市的值
let cityValue = ref(undefined)


// 点击字母跳转锚点（按照字母）
function clickTabs(letter: string) {
    
    const letterDom = document.getElementById(letter)
    if (letterDom) letterDom.scrollIntoView({ behavior: "smooth", block: "start" })
}


// 点击城市赋值
function clickCity(city: any) {
    
    emits('getCity', city)
    message.success(`已选择${city}`)
    visible.value = false
}


// 搜索框失去焦点时赋值
function selectBlur() {

    if (cityValue.value) {
        emits('getCity', cityValue.value)
        message.success(`已选择${cityValue.value}`)
        visible.value = false        
    }
}


// 打开卡片
function openCard() {
    visible.value = true
    cityValue.value = undefined
}


</script>

<template>
    <a-popover trigger="click" placement="bottomLeft" v-model:visible="visible">

        <template #content>
        <div class="choose-city-container">

            <!-- 选择依据字母还是城市 -->
            <a-radio-group v-model:value="accordingTo" button-style="solid">
                <a-radio-button value="letters">按字母</a-radio-button>
                <a-radio-button value="province">按省份</a-radio-button>
            </a-radio-group>


            <!-- 城市搜索 -->
            <a-select
                v-model:value="cityValue"
                show-search
                placeholder="请输入城市名称"
                @blur="selectBlur"
                style="width: 60%"
            >
                <a-select-option  
                    v-for="(item,index) in allCity"
                    :value="item.name"
                    :key="index"
                >
                    {{ item.name }}
                </a-select-option>
            </a-select>


            <!-- 按字母 -->
            <template v-if="accordingTo == 'letters'">
            <div class="choose-city-mian">

                <!-- 字母标签 -->
                <div class="choose-city-tabs">
                    <div class="city-tab-item" 
                        v-for="(item,index) in Object.keys(lettersData)"
                        :key="index"
                        @click="clickTabs(item)"
                    >
                        {{ item }}
                    </div>
                </div>


                <!-- 城市筛选 -->
                <el-scrollbar height="415px">
                    <div class="choose-city-content"
                        v-for="(item, index) in Object.keys(lettersData)"
                        :key="index"
                    >

                        <!-- 字母标题 -->
                        <div class="city-content-title" :id="item">
                            {{ item }}
                        </div>

                        <!-- 城市名称 -->
                        <div class="city-content-text">
                            <div class="city-content-item" 
                                v-for="city in lettersData[item]"
                                :key="city.id"
                                @click="clickCity(city.name)"
                            >
                                {{ city.name }}
                            </div>
                        </div>

                    </div>                    
                </el-scrollbar>                

            </div>
            </template>


            <!-- 按省份 -->
            <template v-else>
            <div class="choose-city-mian">

                <!-- 字母标签 -->
                <div class="choose-city-tabs">
                    <div class="city-tab-item" 
                        v-for="(item, index) in Object.keys(provinceData)"
                        :key="index"
                        @click="clickTabs(item)"
                    >
                        {{ item }}
                    </div>
                </div>


                <!-- 城市筛选 -->
                <el-scrollbar height="415px">
                    <div class="choose-city-content"
                        v-for="(item, index) in allProvince"
                        :key="index"
                    >

                        <!-- 字母标题 -->
                        <div class="city-content-title-pro" :id="item?.id">
                            {{ item.name }}
                        </div>

                        <!-- 城市名称 -->
                        <div class="city-content-text-pro">
                            <div class="city-content-item-pro" 
                                v-for="city in item.data"
                                @click="clickCity(city)"
                            >
                                {{ city }}
                            </div>
                        </div>

                    </div>                    
                </el-scrollbar>                

            </div>
            </template>

        </div>
        </template>

        <a-button type="primary" @click="openCard">选择城市</a-button>
    </a-popover>
</template>

<style scoped lang="scss">
.choose-city-container {
    width: 500px;
    padding: 10px;

    .ant-select {
        margin-left: 40px;
    }

    .choose-city-mian {
        width: 100%;
        margin-top: 20px;

        .choose-city-tabs {
            width: 100%;
            display: flex;
            justify-content: left;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 10px;

            .city-tab-item {
                width: 30px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                font-size: 14px;
                border: 1px solid #ccc;
                cursor: pointer;
            }
        }

        .choose-city-content {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin: 20px 0;

            .city-content-title {
                width: 7%;
                font-size: 16px;
                cursor: default;
            }

            .city-content-text {
                width: 90%;
                display: flex;
                justify-content: left;
                flex-wrap: wrap;
                gap: 10px;
                margin-right: 10px;
                

                .city-content-item {
                    font-size: 14px;
                    cursor: pointer;
                }    
            }


            .city-content-title-pro {
                width: 10%;
                font-size: 14px;
                cursor: default;
            }

            .city-content-text-pro {
                width: 88%;
                display: flex;
                justify-content: left;
                flex-wrap: wrap;
                gap: 8px;
                margin-right: 3px;
                

                .city-content-item-pro {
                    font-size: 14px;
                    cursor: pointer;
                }    
            }

        }
    }
}
</style>