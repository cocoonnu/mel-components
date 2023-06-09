import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/container',
        name: 'container',
        component: () => import('@/views/Container.vue'),

        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/Home/index.vue')
            },
            {
                path: 'icon',
                name: 'icon',
                component: () => import('@/views/ChooseIcon/index.vue')
            },
            {
                path: 'area',
                name: 'area',
                component: () => import('@/views/ChooseArea/index.vue')
            },
            {
                path: 'time',
                name: 'time',
                component: () => import('@/views/ChooseTime/index.vue')
            },
            {
                path: 'form',
                name: 'form',
                component: () => import('@/views/ModalForm/index.vue')
            },
            {
                path: 'dialogform',
                name: 'dialogform',
                component: () => import('@/views/DialogForm/index.vue')
            },
            {
                path: 'modaltable',
                name: 'modaltable',
                component: () => import('@/views/ModalTable/index.vue')
            },
            {
                path: 'mocktable',
                name: 'mocktable',
                component: () => import('@/views/MockTable/index.vue')
            },
            {
                path: 'calendar',
                name: 'calendar',
                component: () => import('@/views/FullCalendar/index.vue')
            }
        ]
    },
    {
        path: '/',
        redirect: '/container/home'
    }
]

const router = createRouter({
    routes,
    // history: createWebHistory()
    history: createWebHashHistory()
})

export default router