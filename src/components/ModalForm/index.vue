<script setup lang="ts">
import { PropType, ref, onMounted, watch, nextTick, onBeforeUnmount } from 'vue'
import { FormOptions } from './type/types'
import { cloneDeep } from 'lodash'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import E from 'wangeditor'


// 接收传入的表单配置选项
let props = defineProps({

    // options: 一个子项类型为FormOptions的数组
    options: {
        type: Array as PropType<FormOptions[]>,
        required: true
    },

    confirmButton: {
        type: Boolean,
        defalut: true,
    },

    cancelButton: {
        type: Boolean,
        defalut: true,
    }
})

let emits = defineEmits(['getForm'])


// 设置表单的model、rules
let formModel = ref<any>(null)
let formRules = ref<any>(null)

// 表单ref
let formRef = ref<FormInstance | undefined>()

// 富文本编辑器ref
let editorRef = ref<any>(null)
let editor: any


// 更新表单的model、rules
function updateForm() {

    if (props.options && props.options.length) {
        let m: any = {}
        let r: any = {}

        props.options.forEach((item: FormOptions) => {

            // item 为每个表单子项
            m[item.prop!] = item.value ? item.value : ''
            r[item.prop!] = item.rules ? item.rules : []

            // 初始化富文本编辑器
            if (item.type == 'editor') {
                nextTick(function() {
                    
                    editor = new E('#editor')

                    // 富文本编辑器配置选项
                    editor.config.height = 200
                    
                    // 配置菜单栏，设置不需要的菜单
                    editor.config.excludeMenus = [
                        'video'
                    ]                    
                    
                    editor.config.placeholder = item.placeholder!

                    editor.config.focus = false

                    editor.create()

                    // 设置初始值
                    editor.txt.text(item.value)

                    // 设置回调函数
                    editor.config.onchange = function (newHtml: string) {
                        formModel.value[item.prop!] = newHtml
                    }            
                    
                    editorRef.value = editor
                })
            }
        })

        formModel.value = cloneDeep(m)
        formRules.value = cloneDeep(r)
    }
}


onMounted(() => {

    // 初始化表单
    updateForm()
})


// 销毁富文本编辑器
onBeforeUnmount(function() {

    if (editor) {
        editor.destroy()
        editor = null        
    }
}) 


// 监听传入表单数据的变化
watch(() => props.options, () => { updateForm() })


// 提交重置函数
function confirmForm(formRef: FormInstance | undefined) {
    if (!formRef) return false

    formRef.validate(function(valid) {
        if (!valid) {
            ElMessage.error('请完成表单填写')
            return false
        }

        emits('getForm', formModel.value)
        ElMessage({
            message: `提交成功`,
            type: 'success',
            duration: 1000
        })
    })
}

function cancelForm(formRef: FormInstance | undefined) {
    if (!formRef) return false

    formRef.resetFields()

    if (editorRef.value) editorRef.value.txt.clear()

    ElMessage({
        message: `重置成功`,
        type: 'success',
        duration: 1000
    })

}


</script>

<template>
    <el-form 
        ref="formRef"
        v-bind="$attrs" 
        :model="formModel"
        :rules="formRules"
        :validate-on-rule-change="false" 
        class="modal-form-container"
        v-if="formModel != null"
    >

        <el-form-item 
            v-for="item in options"
            :prop="item.prop"
            :label="item.label"
            v-bind="item.attrs"
        >

            <!-- 普通表单项 -->
            <component 
                :is="`el-${item.type}`"
                v-model="formModel[item.prop!]"
                :placeholder="item.placeholder"
                v-if="item.type != 'editor'"
            >

            <!-- 如果存在子组件 -->
            <template v-if="item.children && item.children.length">
                <component 
                    v-for="itemChildren in item.children"
                    :is="`el-${itemChildren.type}`"
                    :type="itemChildren.type"
                    :label="itemChildren?.label"
                    :value="itemChildren?.value"
                ></component>
            </template>

            </component>


            <!-- 富文本编辑项 -->
            <div v-if="item.type == 'editor'" id="editor"></div>

        </el-form-item>


        <!-- 提交重置按钮 -->
        <el-form-item>
            <el-button 
                type="primary" 
                @click="confirmForm(formRef)"
                v-if="confirmButton == true"
            >
                提交
            </el-button>
            <el-button 
                @click="cancelForm(formRef)"
                v-if="cancelButton == true"
            >
                重置
            </el-button>
        </el-form-item>

    </el-form>
</template>

<style scoped></style>