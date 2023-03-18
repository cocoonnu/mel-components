<script setup lang="ts">
import { FormOptions } from '@/components/ModalForm/type/types'


// 表单选项数组: 每一项的类型为FormOptions
let options: FormOptions[] = [

    // 用户名输入框
    {
        type: 'input',
        value: '',
        label: '用户名',
        prop: 'username',
        placeholder: '请输入用户名',

        // 验证规则可以有多条
        rules: [
            {
                required: true,
                message: '用户名不能为空',
                trigger: 'blur'
            },
            {
                min: 2,
                max: 6,
                message: '用户名在2-6位之间',
                trigger: 'blur'
            }
        ],

        // formItem额外配置项
        attrs: {
            clearable: true
        }        
    },

    // 密码输入框
    {
        type: 'input',
        value: '',
        label: '密码',
        prop: 'password',
        placeholder: '请输入密码',

        rules: [
            {
                required: true,
                message: '密码不能为空',
                trigger: 'blur'
            },
            {
                min: 6,
                max: 15,
                message: '密码在6-15位之间',
                trigger: 'blur'
            }
        ],

        attrs: {
            showPassword: true,
            clearable: true
        }
    },

    // 选择器
    {
        type: 'select',
        value: '',
        placeholder: '请选择职位',
        prop: 'role',
        label: '职位',
        rules: [
            {
                required: true,
                message: '职位不能为空',
                trigger: 'change'
            }
        ],
        children: [
            {
                type: 'option',
                label: '经理',
                value: '经理'
            },
            {
                type: 'option',
                label: '主管',
                value: '主管'
            },
            {
                type: 'option',
                label: '员工',
                value: '员工'
            }
        ]
    },

    // 多选框
    {
        type: 'checkbox-group',
        value: [],
        prop: 'hobby',
        label: '爱好',
        rules: [
            {
                required: true,
                message: '爱好不能为空',
                trigger: 'change'
            }
        ],
        children: [
            {
                type: 'checkbox',
                label: '羽毛球',
            },
            {
                type: 'checkbox',
                label: '篮球',
            },
            {
                type: 'checkbox',
                label: '足球',
            },
            {
                type: 'checkbox',
                label: '排球',
            },
        ]
    },

    // 单选框
    {
        type: 'radio-group',
        value: '',
        prop: 'sex',
        label: '性别',
        rules: [
            {
                required: true,
                message: '性别不能为空',
                trigger: 'change'
            }
        ],
        children: [
            {
                type: 'radio',
                label: '男',
            },
            {
                type: 'radio',
                label: '女',
            },
        ]
    },

    // 富文本编辑器
    {
        type: 'editor',
        value: '',
        prop: 'desc',
        label: '描述',
        placeholder: '请输入描述',
        rules: [
            {
                required: true,
                message: '描述不能为空',
                trigger: 'change'
            }
        ],
    },

]


// 获取表单数据
function getForm(formModel: any) {
    console.log(formModel)
}


</script>

<template>
    <div class="form-container">
        <!-- 自定义属性可去组件内部修改 -->
        <modal-form 
            :options="options" 
            @getForm="getForm" 
            :confirmButton="true"
            :cancelButton="true"
        >
        </modal-form>
    </div>
</template>

<style scoped>
.form-container {
    width: 600px;
    margin: 10px 0;
}
</style>