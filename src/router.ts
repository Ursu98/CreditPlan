import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/basic',
            component: () => import('./components/BasicForm.vue')
        },
        {
            path: '/login',
            component: () => import('./components/Login.vue')
        },
        {
            path: '/register',
            component: () => import('./components/Register.vue')
        }
    ]
})
export default router