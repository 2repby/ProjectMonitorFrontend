import { createRouter, createWebHistory } from 'vue-router'
import Homepage from './components/Homepage'
import projects from "@/components/Projects";
import ProjectReport from "@/components/ProjectReport";
import ProjectData from "@/components/ProjectData";
import users from "@/components/Users";
import PersonalCabinet from "@/components/PersonalCabinet";
import SupportForm from "@/components/SupportForm";
import metrics from "@/components/Metrics";

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
        path: '/metrics/:id',
        component: metrics,
    },
    {
        path: '/users',
        component: users,
    },
    {
        path: '/profile',
        component: PersonalCabinet,
    },
    {
        path: '/support',
        component: SupportForm,
    },
    {
        path: '/projectreport/:id',
        component: ProjectReport,
        props: true
    },
    {
        path: '/projectdata/:project_id',
        component: ProjectData,
        props: true
    },


]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router;