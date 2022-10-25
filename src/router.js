import { createRouter, createWebHistory } from 'vue-router'
import Homepage from './components/Homepage'
import projects from "@/components/Projects";

const routes = [
    {
        path: '/',
        component: Homepage,
    },
    {
        path: '/projects',
        component: projects,
    },


]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router;