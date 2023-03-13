import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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
    history: createWebHistory()
})

export default router