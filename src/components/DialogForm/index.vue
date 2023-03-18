<script setup lang="ts">
import { ref, watch } from 'vue'


const props = defineProps<{
    dialogVisible: boolean,
    title: string,
    options: any
}>()

let dialogVisibleIn = ref<boolean>(props.dialogVisible)

let emits = defineEmits(['update:dialogVisible', 'getFormData', 'www'])


watch(() => props.dialogVisible, (newValue) => {
    dialogVisibleIn.value = newValue
})

watch(() => dialogVisibleIn.value, (newValue) => {
    emits('update:dialogVisible', newValue)
})


// 获取表单数据
function getForm(formModel: any) {
    
    emits('getFormData', formModel)
}

</script>

<template>
    <div class="dialog-form-container">

        <el-dialog v-model="dialogVisibleIn" :title="title" draggable center>

            <!-- form表单 -->
            <modal-form 
                :options="options" 
                ref="modalFormRef"
                :confirmButton="true"
                :cancelButton="true"
                @getForm="getForm" 
            >
            </modal-form>

        </el-dialog>

    </div>
</template>

<style scoped></style>