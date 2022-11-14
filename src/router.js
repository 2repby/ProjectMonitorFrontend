import { createRouter, createWebHistory } from 'vue-router'
import Homepage from './components/Homepage'
import projects from "@/components/Projects";
import ProjectReport from "@/components/ProjectReport";
import ProjectData from "@/components/ProjectData";
import users from "@/components/Users";

const routes = [
    {
        path: '/',
        component: Homepage,
    },
    {
        path: '/projects',
        component: projects,
    },
    {
        path: '/users',
        component: users,
    },
    {
        path: '/projectreport/:id',
        component: ProjectReport,
        props: true
    },
    {
        path: '/projectdata/:id',
        component: ProjectData,
        props: true
    },


]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router;